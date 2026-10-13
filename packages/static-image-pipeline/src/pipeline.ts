/**
 * Main pipeline entry point
 * Orchestrates image processing pipeline: metadata extraction, blur generation, clustering, manifest building
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { buildManifest, type Manifest, type ManifestOptions } from "./manifest/buildManifest.js";
import { ensureDirectory, writeFile } from "./utils/fs.js";
import { globFiles } from "./utils/glob.js";
import { hashFileShort } from "./utils/hashing.js";
import { writeLibraryManifestModule } from "./manifest/writeManifestModule.js";

export interface PipelineOptions extends ManifestOptions {
  writeVariants?: boolean;
  outputDir?: string;
}

/**
 * Run the complete image processing pipeline
 */
export async function runPipeline(
  inputDir: string,
  outputManifest: string,
  options?: PipelineOptions,
): Promise<Manifest> {
  console.log("[Pipeline] Starting pipeline");
  console.log("[Pipeline] Input directory:", inputDir);
  console.log("[Pipeline] Output manifest:", outputManifest);
  console.log("[Pipeline] Options:", options);

  try {
    // Find all image files
    const imagePaths = await globFiles("**/*.{jpg,jpeg,png,webp,avif,gif}", inputDir);
    console.log(`[Pipeline] Found ${imagePaths.length} images`);

    if (imagePaths.length === 0) {
      console.warn("[Pipeline] No images found in input directory");
    }

    // Build manifest from images
    const manifest = await buildManifest(imagePaths, inputDir, options);
    console.log("[Pipeline] Manifest built successfully");

    // Generate responsive variants if requested
    if (options?.writeVariants && options?.outputDir) {
      await generateVariants(imagePaths, inputDir, options);
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputManifest);
    await ensureDirectory(outputDir);

    // Write manifest to file
    await writeFile(outputManifest, JSON.stringify(manifest, null, 2));
    console.log(`[Pipeline] Manifest written to: ${outputManifest}`);

    // Write JS module into the library package
    await writeLibraryManifestModule(manifest);

    return manifest;
  } catch (error) {
    console.error("[Pipeline] Error:", error);
    throw error;
  }
}

/**
 * Moves stale processed images to a temporary directory
 * Ensures we have cached processed images we can use instead of regenerating
 * This directory is deleted after processing
 */
export async function moveStaleImagesTemp(outputDir: string, tempDir: string): Promise<void> {
  try {
    if (!(await fileExists(outputDir))) {
      return; // Nothing to move
    }

    console.log("[Pipeline] Moving previous variants to temp cache...");

    await ensureDirectory(tempDir);

    const entries = await fs.readdir(outputDir, { withFileTypes: true });

    for (const entry of entries) {
      const src = path.join(outputDir, entry.name);

      if (entry.isDirectory()) {
        // Move hash directory
        const dest = path.join(tempDir, entry.name);
        await fs.rename(src, dest);
        console.log(`[Pipeline] Cached previous variants: ${entry.name}`);
      } else {
        // Delete stray files
        await fs.rm(src, { force: true });
        console.log(`[Pipeline] Removed stray file: ${entry.name}`);
      }
    }
  } catch (error) {
    console.warn("[Pipeline] Warning during moveStaleImagesTemp:", error);
  }
}

/**
 * Clean up stale processed images before regenerating
 * Ensures no orphaned files from deleted or moved originals
 */
export async function cleanupStaleImages(tempDir: string): Promise<void> {
  try {
    if (!(await fileExists(tempDir))) {
      return; // Nothing to clean up
    }

    console.log("[Pipeline] Cleaning up previous variants...");
    const entries = await readDir(tempDir);

    for (const entry of entries) {
      const fullPath = path.join(tempDir, entry);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        // Remove hash directories (old variant folders)
        await fs.rm(fullPath, { recursive: true, force: true });
        console.log(`[Pipeline] Removed stale directory: ${entry}`);
      }
    }
  } catch (error) {
    console.warn("[Pipeline] Warning during cleanup:", error);
    // Don't fail if cleanup has issues, just warn
  }
}

interface DirEntry {
  name: string;
}

async function readDir(dirPath: string): Promise<string[]> {
  return (await fs.readdir(dirPath, { withFileTypes: true })).map((entry: DirEntry) => entry.name);
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate responsive image variants
 */
export async function generateVariants(
  imagePaths: string[],
  inputDir: string,
  options: PipelineOptions,
): Promise<void> {
  const widths = options.widths ?? [160, 320, 640, 960, 1280];
  const formats = options.formats ?? ["avif", "webp", "jpeg"];
  const outputDir = options.outputDir!;
  // TODO: Pull tempDir from options (hardcoded for now)
  const tempDir = ".static-images-temp-cache";

  console.log("[Pipeline] Generating responsive variants");

  // Move stale images to a temporary dir
  await moveStaleImagesTemp(outputDir, tempDir);

  for (const imagePath of imagePaths) {
    const fileName = path.basename(imagePath);
    const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
    const hash = await hashFileShort(imagePath);
    const variantDir = path.join(outputDir, hash);

    // Create directory for this image's variants
    await ensureDirectory(variantDir);

    // Get image metadata to determine original size
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const originalWidth = metadata.width || 1000;

    // Copy original file
    const outputPath = path.join(variantDir, fileName);
    await fs.copyFile(imagePath, outputPath);
    console.log(`[Pipeline] Copied original: ${fileName}`);

    // Generate variants for each width and format
    for (const width of widths) {
      if (width >= originalWidth) {
        continue; // Skip variants larger than original
      }

      for (const format of formats) {
        const variantFileName = `${fileNameWithoutExt}-${width}w.${format}`;
        const variantPath = path.join(variantDir, variantFileName);

        const cachedVariantPath = path.join(tempDir, hash, variantFileName);

        // Reuse previous copy of the same variant if available
        if (await fileExists(cachedVariantPath)) {
          console.log(`[Pipeline] Reusing cached variant: ${variantFileName}`);
          await fs.copyFile(cachedVariantPath, variantPath);
          continue; // Skip regeneration
        }

        try {
          const pipeline = sharp(imagePath).resize(width, undefined, {
            withoutEnlargement: true,
            fit: "cover",
          });

          if (format === "webp") {
            await pipeline.webp({ quality: 80 }).toFile(variantPath);
          } else if (format === "avif") {
            await pipeline.avif({ quality: 65 }).toFile(variantPath);
          } else {
            // Default to jpeg
            await pipeline.jpeg({ quality: 85, progressive: true }).toFile(variantPath);
          }

          console.log(`[Pipeline] Generated variant: ${variantFileName}`);
        } catch (error) {
          console.error(`[Pipeline] Error generating ${variantFileName}:`, error);
        }
      }
    }
  }

  // Cleanup stale temp cached directory
  await cleanupStaleImages(tempDir);

  console.log("[Pipeline] Variant generation complete");
}

export { generateBlur, generateBlurDataURL } from "./blur/generateBlur.js";
export { clusterBlurs } from "./clustering/clusterBlurs.js";
export { buildManifest } from "./manifest/buildManifest.js";
export { extractMetadata } from "./metadata/extractMetadata.js";

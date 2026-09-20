/**
 * Manifest building utilities
 * Aggregates image metadata into a consumable manifest
 */

import path from 'path';
import { hashFileShort } from '../utils/hashing.js';
import { extractMetadata } from '../metadata/extractMetadata.js';
import { generateBlurDataURL } from '../blur/generateBlur.js';

export interface ImageVariant {
  width: number;
  src: string;
  format: string;
  filename: string;
}

export interface ImageEntry {
  id: string;
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  blur?: string;
  blurDataURL?: string;
  dominantColor?: string;
  cluster?: number;
  variants?: ImageVariant[];
}

export interface Manifest {
  version: string;
  generated: string;
  images: ImageEntry[];
  clusters?: Record<number, string[]>;
}

export interface ManifestOptions {
  widths?: number[];
  formats?: string[];
  baseOutputDir?: string;
}

/**
 * Build manifest with real image metadata and variants
 */
export async function buildManifest(
  imagePaths: string[],
  inputDir?: string,
  options?: ManifestOptions
): Promise<Manifest> {
  console.log(`[buildManifest] Building manifest for ${imagePaths.length} images`);
  
  const widths = options?.widths ?? [160, 320, 640, 960, 1280];
  const formats = options?.formats ?? ['avif', 'webp', 'jpeg'];
  
  const images: ImageEntry[] = [];

  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    const fileName = path.basename(imagePath);
    const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    const relativePath = inputDir ? path.relative(inputDir, imagePath).replace(/\\/g, '/') : imagePath.replace(/\\/g, '/');
    
    try {
      // Extract real metadata
      const metadata = await extractMetadata(imagePath);
      const hash = await hashFileShort(imagePath);
      const id = `img-${hash}`;
      
      // Generate blur placeholder
      const blurDataURL = await generateBlurDataURL(imagePath);
      
      // Generate responsive variants
      const variants: ImageVariant[] = [];
      for (const width of widths) {
        // Only generate variants for widths smaller than original
        if (width < metadata.width) {
          for (const format of formats) {
            const variantFileName = `${fileNameWithoutExt}-${width}w.${format}`;
            const variantSrc = `/.processed-static-images/${hash}/${variantFileName}`;
            variants.push({
              width,
              format,
              src: variantSrc,
              filename: variantFileName,
            });
          }
        }
      }

      const entry: ImageEntry = {
        id,
        src: `/.processed-static-images/${hash}/${fileName}`,
        width: metadata.width,
        height: metadata.height,
        aspectRatio: metadata.aspectRatio,
        blurDataURL,
        variants,
      };

      images.push(entry);
      console.log(`[buildManifest] Processed ${fileName} (${metadata.width}x${metadata.height})`);
    } catch (error) {
      console.error(`[buildManifest] Error processing ${imagePath}:`, error);
      // Continue processing other images
    }
  }

  const manifest: Manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    images,
    clusters: {},
  };

  console.log(`[buildManifest] Created manifest with ${images.length} images`);
  return manifest;
}

/**
 * Main pipeline entry point
 * Orchestrates image processing pipeline: metadata extraction, blur generation, clustering, manifest building
 */

import { globFiles } from './utils/glob.js';
import { buildManifest, type Manifest } from './manifest/buildManifest.js';
import { writeFile, ensureDirectory } from './utils/fs.js';
import path from 'path';

export async function runPipeline(
  inputDir: string,
  outputManifest: string,
  options?: Record<string, unknown>
): Promise<Manifest> {
  console.log('[Pipeline] Starting pipeline');
  console.log('[Pipeline] Input directory:', inputDir);
  console.log('[Pipeline] Output manifest:', outputManifest);
  console.log('[Pipeline] Options:', options);

  try {
    // Find all image files
    const imagePaths = await globFiles('**/*.{jpg,jpeg,png,webp,avif,gif}', inputDir);
    console.log(`[Pipeline] Found ${imagePaths.length} images`);

    // Build manifest from images
    const manifest = await buildManifest(imagePaths, inputDir);
    console.log('[Pipeline] Manifest built successfully');

    // Ensure output directory exists
    const outputDir = path.dirname(outputManifest);
    await ensureDirectory(outputDir);

    // Write manifest to file
    await writeFile(outputManifest, JSON.stringify(manifest, null, 2));
    console.log(`[Pipeline] Manifest written to: ${outputManifest}`);

    return manifest;
  } catch (error) {
    console.error('[Pipeline] Error:', error);
    throw error;
  }
}

export { extractMetadata } from './metadata/extractMetadata.js';
export { generateBlur } from './blur/generateBlur.js';
export { clusterBlurs } from './clustering/clusterBlurs.js';
export { buildManifest } from './manifest/buildManifest.js';

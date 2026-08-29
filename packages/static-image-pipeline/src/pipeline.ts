/**
 * Main pipeline entry point
 * Orchestrates image processing pipeline: metadata extraction, blur generation, clustering, manifest building
 */

export async function runPipeline(
  inputDir: string,
  outputDir: string,
  options?: Record<string, unknown>
): Promise<void> {
  // TODO: Implement pipeline orchestration
  console.log('Pipeline execution placeholder');
}

export { extractMetadata } from './metadata/extractMetadata.js';
export { generateBlur } from './blur/generateBlur.js';
export { clusterBlurs } from './clustering/clusterBlurs.js';
export { buildManifest } from './manifest/buildManifest.js';

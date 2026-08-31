#!/usr/bin/env node
/**
 * Build manifest by running the static image pipeline
 * Processes test images and generates manifest.json
 */

import { runPipeline } from '@vividwebau/static-image-pipeline';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testNextDir = path.join(__dirname, '..');
const testImagesDir = path.join(testNextDir, 'public/test-images');
const manifestPath = path.join(testNextDir, 'public/static-images.json');
const outputDir = path.join(testNextDir, 'public/images');

async function buildManifest() {
  console.log('[build-manifest] Starting manifest generation...');
  console.log(`[build-manifest] Input: ${testImagesDir}`);
  console.log(`[build-manifest] Output: ${manifestPath}`);

  try {
    const manifest = await runPipeline(testImagesDir, manifestPath, {
      widths: [320, 640, 960, 1280],
      formats: ['webp', 'jpeg'],
      writeVariants: true,
      outputDir: outputDir,
    });

    console.log('[build-manifest] Manifest generated successfully');
    console.log(`[build-manifest] Processed ${manifest.images.length} images`);
  } catch (error) {
    console.error('[build-manifest] Error generating manifest:', error);
    process.exit(1);
  }
}

buildManifest();

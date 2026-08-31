#!/usr/bin/env node
/**
 * Generate sample test images for pipeline testing
 * Creates colored PNG files with text overlays
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testImagesDir = path.join(__dirname, '../static-images');

const sampleImages = [
  {
    name: 'landscape.jpg',
    width: 1920,
    height: 1080,
    color: '#FF6B6B',
    text: 'Landscape Image 1920x1080',
  },
  {
    name: 'portrait.jpg',
    width: 1080,
    height: 1920,
    color: '#4ECDC4',
    text: 'Portrait Image 1080x1920',
  },
  {
    name: 'square.jpg',
    width: 1200,
    height: 1200,
    color: '#45B7D1',
    text: 'Square Image 1200x1200',
  },
  {
    name: 'wide.jpg',
    width: 1600,
    height: 600,
    color: '#FFA07A',
    text: 'Wide Image 1600x600',
  },
  {
    name: 'tall.jpg',
    width: 800,
    height: 1400,
    color: '#98D8C8',
    text: 'Tall Image 800x1400',
  },
];

async function generateImages() {
  console.log('[generate-sample-images] Starting image generation...');

  try {
    // Ensure test-images directory exists
    await fs.mkdir(testImagesDir, { recursive: true });
    console.log(`[generate-sample-images] Created/verified directory: ${testImagesDir}`);

    // Generate each sample image
    for (const image of sampleImages) {
      const outputPath = path.join(testImagesDir, image.name);

      // Create SVG with background color and text
      const svg = `
        <svg width="${image.width}" height="${image.height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${image.color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${image.color}dd;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="${image.width}" height="${image.height}" fill="url(#grad)"/>
          <circle cx="${image.width * 0.25}" cy="${image.height * 0.25}" r="80" fill="rgba(255,255,255,0.1)" />
          <circle cx="${image.width * 0.75}" cy="${image.height * 0.75}" r="120" fill="rgba(255,255,255,0.05)" />
          <text x="50%" y="50%" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold" font-family="Arial, sans-serif">
            ${image.text}
          </text>
          <text x="50%" y="60%" font-size="24" fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif">
            ${image.width}x${image.height}
          </text>
        </svg>
      `;

      // Convert SVG to JPEG
      await sharp(Buffer.from(svg))
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath);

      console.log(`[generate-sample-images] Generated: ${image.name} (${image.width}x${image.height})`);
    }

    console.log(`[generate-sample-images] Successfully generated ${sampleImages.length} sample images`);
  } catch (error) {
    console.error('[generate-sample-images] Error:', error);
    process.exit(1);
  }
}

generateImages();

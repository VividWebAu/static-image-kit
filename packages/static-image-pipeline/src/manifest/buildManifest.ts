/**
 * Manifest building utilities
 * Aggregates image metadata into a consumable manifest
 */

import path from 'path';
import { hashFile } from '../utils/hashing.js';

export interface ImageVariant {
  width: number;
  src: string;
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

export async function buildManifest(
  imagePaths: string[],
  inputDir?: string
): Promise<Manifest> {
  console.log(`[buildManifest] Building manifest for ${imagePaths.length} images`);
  
  const images: ImageEntry[] = [];

  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    const fileName = path.basename(imagePath);
    const relativePath = inputDir ? path.relative(inputDir, imagePath) : imagePath;
    
    // Generate placeholder image hash for unique ID
    const hash = await hashFile(imagePath);
    const id = `img-${hash.substring(0, 8)}`;

    const entry: ImageEntry = {
      id,
      src: `/test-images/${relativePath.replace(/\\/g, '/')}`,
      width: 800,
      height: 600,
      aspectRatio: 800 / 600,
      blurDataURL: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=',
      dominantColor: '#f5f5f5',
      variants: [
        { width: 640, src: `/test-images/640w/${relativePath.replace(/\\/g, '/')}` },
        { width: 1024, src: `/test-images/1024w/${relativePath.replace(/\\/g, '/')}` },
        { width: 1920, src: `/test-images/1920w/${relativePath.replace(/\\/g, '/')}` },
      ],
    };

    images.push(entry);
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

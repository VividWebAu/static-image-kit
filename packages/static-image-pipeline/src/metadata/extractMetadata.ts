/**
 * Metadata extraction utilities
 * Extracts dimensions, aspect ratio, color info from images
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';

export interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  dominantColor?: string;
  fileSize: number;
  format: string;
}

export async function extractMetadata(
  imagePath: string
): Promise<ImageMetadata> {
  console.log(`[extractMetadata] Processing: ${imagePath}`);
  
  try {
    // Get file stats for file size
    const stats = await fs.stat(imagePath);
    const fileSize = stats.size;
    
    // Use Sharp to extract metadata
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error(`Invalid image metadata for ${imagePath}`);
    }
    
    // Get the format (normalize format names)
    let format = metadata.format || 'unknown';
    if (format === 'jpeg') format = 'jpg';
    
    const width = metadata.width;
    const height = metadata.height;
    const aspectRatio = width / height;
    
    return {
      width,
      height,
      aspectRatio,
      fileSize,
      format,
    };
  } catch (error) {
    console.error(`[extractMetadata] Error processing ${imagePath}:`, error);
    throw error;
  }
}

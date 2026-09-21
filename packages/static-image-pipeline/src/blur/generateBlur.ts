/**
 * Blur generation utilities
 * Creates low-quality placeholder blurs for progressive image loading
 */

import sharp from "sharp";

export interface BlurConfig {
  quality?: number;
  width?: number;
  height?: number;
}

/**
 * Generate a small, highly compressed blur placeholder image
 * Returns as JPEG buffer for minimal size
 */
export async function generateBlur(imagePath: string, config?: BlurConfig): Promise<Buffer> {
  const width = config?.width ?? 10;
  const height = config?.height ?? 10;
  const quality = config?.quality ?? 60;

  console.log(`[generateBlur] Processing: ${imagePath}`, { width, height, quality });

  try {
    const buffer = await sharp(imagePath)
      .resize(width, height, {
        fit: "cover",
        position: "centre",
      })
      .blur(1.5)
      .jpeg({ quality, progressive: true })
      .toBuffer();

    return buffer;
  } catch (error) {
    console.error(`[generateBlur] Error processing ${imagePath}:`, error);
    throw error;
  }
}

/**
 * Generate blur as a base64 data URL
 */
export async function generateBlurDataURL(imagePath: string, config?: BlurConfig): Promise<string> {
  const buffer = await generateBlur(imagePath, config);
  const base64 = buffer.toString("base64");
  return `data:image/jpeg;base64,${base64}`;
}

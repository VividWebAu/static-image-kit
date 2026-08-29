/**
 * Utility functions for image handling
 */

export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

export function generateSrcSet(
  src: string,
  sizes?: number[]
): string {
  console.log(`[generateSrcSet] Generating for: ${src}`, sizes);
  // TODO: Implement srcset generation with responsive sizes
  return src;
}

export function formatDominantColor(color: string): string {
  console.log(`[formatDominantColor] Formatting: ${color}`);
  // TODO: Implement color formatting for CSS use
  return color;
}

export function generatePaddingBottom(aspectRatio: number): string {
  /**
   * Generates CSS padding-bottom value to prevent layout shift
   * Formula: (height / width) * 100%
   */
  return `${(1 / aspectRatio) * 100}%`;
}

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
  // TODO: Implement srcset generation
  return src;
}

export function formatDominantColor(color: string): string {
  // TODO: Implement color formatting for CSS
  return color;
}

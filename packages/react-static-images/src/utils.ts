/**
 * Utility functions for image handling
 */

export interface ImageVariant {
  width: number;
  src: string;
}

export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

export function generateSrcSet(variants: ImageVariant[] = []): string {
  if (variants.length === 0) {
    return '';
  }

  return variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ');
}

export function formatDominantColor(color: string): string {
  console.log(`[formatDominantColor] Formatting: ${color}`);
  // Ensure it's a valid hex color
  if (color.startsWith('#')) {
    return color;
  }
  // Prefix with # if missing
  return `#${color}`;
}

export function generatePaddingBottom(aspectRatio: number): string {
  /**
   * Generates CSS padding-bottom value to prevent layout shift
   * Formula: (height / width) * 100%
   * Since aspectRatio = width / height, we use: (1 / aspectRatio) * 100%
   */
  const percentage = (1 / aspectRatio) * 100;
  return `${percentage}%`;
}

export function generatePictureSizes(variants: ImageVariant[]): string {
  /**
   * Generate sizes attribute for <picture> element
   * Example: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
   */
  if (variants.length === 0) {
    return '100vw';
  }

  // Group variants by width and generate appropriate breakpoints
  const sorted = [...variants].sort((a, b) => a.width - b.width);
  const sizes: string[] = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const width = sorted[i].width;
    sizes.push(`(max-width: ${width}px) ${width}px`);
  }

  // Last variant is the default
  sizes.push(`${sorted[sorted.length - 1].width}px`);

  return sizes.join(', ');
}

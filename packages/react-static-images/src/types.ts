/**
 * Type definitions for react-static-images
 */

export interface ImageVariant {
  width: number;
  format: string;
  src: string;
  filename: string;
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

export interface ManifestData {
  version: string;
  generated: string;
  images: ImageEntry[];
  clusters?: Record<number, string[]>;
}

export interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  dominantColor?: string;
  blur?: string;
  cluster?: number;
  blurDataURL?: string;
  variants?: ImageVariant[];
}

export interface ImageStaticConfig {
  enableBlurUp?: boolean;
  enableClustering?: boolean;
  responsiveSizes?: number[];
}

export interface BlurPlaceholder {
  /**
   * Base64-encoded blur image data or SVG data URL
   */
  data: string;
  width: number;
  height: number;
}

export interface ResponsiveImage {
  src: string;
  srcSet: string;
  sizes?: string;
}

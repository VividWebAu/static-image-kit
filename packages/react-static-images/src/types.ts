/**
 * Type definitions for react-static-images
 */

export interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  dominantColor?: string;
  blur?: string;
  cluster?: number;
}

export interface ImageStaticConfig {
  enableBlurUp?: boolean;
  enableClustering?: boolean;
  responsiveSizes?: number[];
}

export interface BlurPlaceholder {
  /**
   * Base64-encoded blur image data
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


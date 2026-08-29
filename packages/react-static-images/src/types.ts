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

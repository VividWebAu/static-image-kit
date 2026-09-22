/**
 * Export all public APIs
 */

export type { ImageStaticProps } from "./ImageStatic.js";
export { ImageStatic } from "./ImageStatic.js";
export type { ImageEntry, ManifestData } from "./manifest.js";
export {
  getImageById,
  getImageBySource,
  getImageCluster,
  loadManifest,
} from "./manifest.js";
export type {
  BlurPlaceholder,
  ImageMetadata,
  ImageStaticConfig,
  ImageVariant,
  ResponsiveImage,
} from "./types.js";
export {
  calculateAspectRatio,
  formatDominantColor,
  generatePaddingBottom,
  generatePictureSizes,
  generateSrcSet,
} from "./utils.js";

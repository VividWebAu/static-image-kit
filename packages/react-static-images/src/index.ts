/**
 * Export all public APIs
 */

export { ImageStatic } from "./ImageStatic.js";
export type { ImageStaticProps } from "./ImageStatic.js";

export {
  loadManifest,
  getImageBySource,
  getImageById,
  getImageCluster,
} from "./manifest.js";
export type { ManifestData, ImageEntry } from "./manifest.js";

export type {
  ImageMetadata,
  ImageStaticConfig,
  BlurPlaceholder,
  ResponsiveImage,
  ImageVariant,
} from "./types.js";

export {
  calculateAspectRatio,
  generateSrcSet,
  formatDominantColor,
  generatePaddingBottom,
  generatePictureSizes,
} from "./utils.js";

export {
  setStaticImageManifest,
  getStaticImageManifest,
} from "./manifest-registry.js";

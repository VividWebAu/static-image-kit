/**
 * Export all public APIs
 */

export { ImageStatic } from './ImageStatic.js';
export type { ImageStaticProps } from './ImageStatic.js';

export { loadManifest, getImageBySource } from './manifest.js';
export type { ManifestData } from './manifest.js';

export type { ImageMetadata, ImageStaticConfig } from './types.js';

export {
  calculateAspectRatio,
  generateSrcSet,
  formatDominantColor,
} from './utils.js';

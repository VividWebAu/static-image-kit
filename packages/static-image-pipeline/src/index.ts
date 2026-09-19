/**
 * Export all public APIs from pipeline package
 */

export {
  DEFAULT_STATIC_IMAGE_CONFIG,
  resolvePipelineConfig,
  initializeStaticImageProject,
  applyDefaultPackageScript,
} from './config.js';
export type { StaticImagePipelineConfig } from './config.js';

export { runPipeline, generateVariants } from './pipeline.js';
export type { PipelineOptions } from './pipeline.js';

export { extractMetadata } from './metadata/extractMetadata.js';
export type { ImageMetadata } from './metadata/extractMetadata.js';

export { generateBlur, generateBlurDataURL } from './blur/generateBlur.js';
export type { BlurConfig } from './blur/generateBlur.js';

export { clusterBlurs, extractFeatures, kmeans } from './clustering/index.js';
export type { ClusterResult } from './clustering/clusterBlurs.js';
export type { FeatureVector } from './clustering/extractFeatures.js';

export { buildManifest } from './manifest/buildManifest.js';
export type { Manifest, ImageEntry, ImageVariant, ManifestOptions } from './manifest/buildManifest.js';

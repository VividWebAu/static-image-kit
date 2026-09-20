/**
 * Manifest loading and management
 */

import type { ManifestData, ImageEntry } from './types.js';

export type { ManifestData, ImageEntry };

/**
 * Load and cache manifest data
 * In a real implementation, this would fetch from a URL or import from a file
 */
let cachedManifest: ManifestData | null = null;

export async function loadManifest(
  manifestPath: string | ManifestData
): Promise<ManifestData> {
  console.log('[loadManifest] Loading manifest');

  // If already an object, return it
  if (typeof manifestPath === 'object') {
    cachedManifest = manifestPath;
    return manifestPath;
  }

  // If cached, return cached version
  if (cachedManifest) {
    return cachedManifest;
  }

  try {
    // Attempt to import/load the manifest
    // In a real Next.js app, this would use require() or import()
    console.log(`[loadManifest] Loading from: ${manifestPath}`);

    // For now, return a placeholder
    const manifest: ManifestData = {
      version: '1.0.0',
      generated: new Date().toISOString(),
      images: [],
      clusters: {},
    };

    cachedManifest = manifest;
    return manifest;
  } catch (error) {
    console.error('[loadManifest] Error loading manifest:', error);
    throw error;
  }
}

export function getImageBySource(
  manifest: ManifestData,
  src: string
): ImageEntry | undefined {
  console.log(`[getImageBySource] Finding image: ${src}`);
  const found = manifest.images.find((img) => img.src === src);
  return found;
}

export function getImageByReference(
  manifest: ManifestData,
  imageReference: string
): ImageEntry | undefined {
  const normalized = imageReference.replace(/\\/g, '/').split('?')[0].split('#')[0];
  const basename = normalized.split('/').pop() || normalized;

  return manifest.images.find((img) => {
    const entrySrc = img.src.replace(/\\/g, '/').split('?')[0].split('#')[0];
    return (
      entrySrc === normalized ||
      img.src === normalized ||
      entrySrc.endsWith(`/${basename}`) ||
      normalized.endsWith(`/${basename}`) ||
      basename === img.id
    );
  });
}

export function getImageById(
  manifest: ManifestData,
  id: string
): ImageEntry | undefined {
  console.log(`[getImageById] Finding image: ${id}`);
  const found = manifest.images.find((img) => img.id === id);
  return found;
}

export function getImageCluster(
  manifest: ManifestData,
  imageId: string
): string[] | undefined {
  console.log(`[getImageCluster] Finding cluster for: ${imageId}`);

  if (!manifest.clusters) {
    return undefined;
  }

  // Find which cluster contains this image
  for (const [clusterId, members] of Object.entries(manifest.clusters)) {
    if (members.includes(imageId)) {
      return members;
    }
  }

  return undefined;
}

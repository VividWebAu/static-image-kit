/**
 * Manifest loading and management
 */

export interface ManifestData {
  version: string;
  generated: string;
  images: Array<{
    id: string;
    src: string;
    width: number;
    height: number;
    aspectRatio: number;
    blur?: string;
    dominantColor?: string;
    cluster?: number;
  }>;
  clusters?: Record<number, string[]>;
}

export async function loadManifest(manifestPath: string): Promise<ManifestData> {
  // TODO: Implement manifest loading from JSON
  throw new Error('Not implemented');
}

export function getImageBySource(
  manifest: ManifestData,
  src: string
): ManifestData['images'][0] | undefined {
  // TODO: Implement image lookup by source
  return undefined;
}

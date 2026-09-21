import type { ManifestData } from "./types.js";

let globalManifest: ManifestData | null = null;

export function setStaticImageManifest(manifest: ManifestData) {
  globalManifest = manifest;
}

export function getStaticImageManifest(): ManifestData | null {
  return globalManifest;
}

/**
 * Manifest schema definitions
 * TypeScript types for manifest validation
 */

import type { Manifest, ImageEntry } from './buildManifest.js';

export type { Manifest, ImageEntry };

export function validateManifest(data: unknown): data is Manifest {
  // TODO: Implement manifest validation
  return false;
}

export function validateImageEntry(data: unknown): data is ImageEntry {
  // TODO: Implement image entry validation
  return false;
}

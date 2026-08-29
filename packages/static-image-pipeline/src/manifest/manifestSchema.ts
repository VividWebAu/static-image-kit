/**
 * Manifest schema definitions
 * TypeScript types and Zod validation for manifest
 */

import { z } from 'zod';
import type { Manifest, ImageEntry } from './buildManifest.js';

export type { Manifest, ImageEntry };

// Zod schemas for validation
export const ImageEntrySchema = z.object({
  id: z.string(),
  src: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
  aspectRatio: z.number().positive(),
  blur: z.string().optional(),
  dominantColor: z.string().optional(),
  cluster: z.number().optional(),
});

export const ManifestSchema = z.object({
  version: z.string(),
  generated: z.string(),
  images: z.array(ImageEntrySchema),
  clusters: z.record(z.array(z.string())).optional(),
});

export function validateManifest(data: unknown): data is Manifest {
  try {
    ManifestSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

export function validateImageEntry(data: unknown): data is ImageEntry {
  try {
    ImageEntrySchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

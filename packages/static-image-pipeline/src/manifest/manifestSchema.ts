/**
 * Manifest schema definitions
 * TypeScript types and Zod validation for manifest
 */

import { z } from 'zod';
import type { Manifest, ImageEntry, ImageVariant } from './buildManifest.js';

export type { Manifest, ImageEntry, ImageVariant };

// Zod schemas for validation
export const ImageVariantSchema = z.object({
  width: z.number().positive(),
  src: z.string(),
});

export const ImageEntrySchema = z.object({
  id: z.string(),
  src: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
  aspectRatio: z.number().positive(),
  blur: z.string().optional(),
  blurDataURL: z.string().optional(),
  dominantColor: z.string().optional(),
  cluster: z.number().optional(),
  variants: z.array(ImageVariantSchema).optional(),
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
  } catch (error) {
    console.error('[validateManifest] Validation failed:', error);
    return false;
  }
}

export function validateImageEntry(data: unknown): data is ImageEntry {
  try {
    ImageEntrySchema.parse(data);
    return true;
  } catch (error) {
    console.error('[validateImageEntry] Validation failed:', error);
    return false;
  }
}

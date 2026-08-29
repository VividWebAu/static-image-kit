'use client';

/**
 * React Server Component for static images
 * Provides optimized image rendering with blur-up, clustering, and responsive loading
 */

import type { ImageEntry } from '@static-image-pipeline/manifest/buildManifest.js';

export interface ImageStaticProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export async function ImageStatic({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className,
}: ImageStaticProps) {
  // TODO: Implement RSC with blur-up, clustering integration
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
}

export default ImageStatic;

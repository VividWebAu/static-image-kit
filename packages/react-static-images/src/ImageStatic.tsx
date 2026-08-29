'use client';

/**
 * React Server Component for static images
 * Provides optimized image rendering with blur-up, clustering, and responsive loading
 */

import type { CSSProperties } from 'react';

export interface ImageStaticProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
}

export function ImageStatic({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className,
  style,
}: ImageStaticProps) {
  // TODO: Implement blur-up preview with dominant color
  // TODO: Implement clustering integration for content-aware loading
  // TODO: Implement responsive srcset generation

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

export default ImageStatic;

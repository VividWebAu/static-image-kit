/**
 * Pure React Server Component for static images
 * Provides optimized image rendering with blur-up, clustering, and responsive loading
 *
 * This is a framework-agnostic RSC component with ZERO client-side JavaScript.
 * All image processing happens at build time via the static-image-pipeline.
 * The component renders pure HTML with semantic <picture> and <img> elements.
 */

import type { CSSProperties } from 'react';
import { generateSrcSet } from './utils.js';

export interface ImageStaticProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  blurDataURL?: string;
  dominantColor?: string;
  variants?: Array<{ width: number; src: string }>;
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
  blurDataURL,
  dominantColor,
  variants = [],
}: ImageStaticProps) {
  // Generate srcset from variants
  const srcSet = generateSrcSet(variants);

  // Build styles for blur prevention and dominant color
  const containerStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: dominantColor || '#f5f5f5',
    ...style,
  };

  // Aspect ratio container to prevent layout shift
  const aspectRatio = width && height ? width / height : 1.33;

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
        ...containerStyle,
      }}
    >
      <picture
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {variants.length > 0 && (
          <>
            {/* TODO: FIX RESPONSIVE SIZING!!! */}
            <source media="(min-width: 1920px)" srcSet={srcSet} />
            <source media="(min-width: 1024px)" srcSet={srcSet} />
            <source media="(min-width: 640px)" srcSet={srcSet} />
            {/* <source media="(min-width: 0px)" srcSet={srcSet} /> */}
          </>
        )}
        <img
          src={src}
          // srcSet={srcSet}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </picture>
    </div>
  );
}

export default ImageStatic;

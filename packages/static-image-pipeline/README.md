# @vividweb/static-image-pipeline

A build-time image processing pipeline that generates all static assets required for
framework‑agnostic, server‑component‑friendly responsive images.

This package produces:
- responsive width variants (e.g., 400w, 800w, 1200w, 1600w)
- AVIF/WebP/JPEG fallbacks
- blur-up placeholders
- hashed filenames for long-term caching
- a manifest describing all generated assets

The output is fully deterministic and contains no runtime transforms. All work is done
at build time, making it ideal for SSR/RSC frameworks and static export workflows.

## Features

- Build-time generation of all image variants
- Automatic AVIF/WebP/JPEG fallback chains
- Blur-up placeholder generation
- Deterministic hashed filenames
- JSON manifest describing every generated asset
- Zero client JavaScript required
- Zero runtime image optimization

## Usage

This package is intended to be run as part of your build pipeline. The generated manifest
is consumed by `@vividweb/react-static-images` to render `<picture>` markup with responsive
rules and fallbacks.

## Status

This package currently contains placeholder implementation. Full pipeline logic will be
added in future releases.

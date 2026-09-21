# static-image-kit

A monorepo for a build-time static image pipeline and a framework-agnostic React server component.

The system generates responsive image variants at build time and exposes a pure server-component `<ImageStatic />` that works well in Next.js and other React SSR/RSC environments.

No client JavaScript.
No hydration.
No runtime transforms.
Just fast, predictable, static image delivery.

## Consumer workflow

The intended package flow for an app consumer is now the validated flow:

```bash
pnpm add @vividwebau/static-image-pipeline @vividwebau/react-static-images
pnpm static-image-pipeline init
```

Then:

1. add source images under `static-images/`
2. optionally adjust the generated `.static-image-kit.config.mjs`
3. run `pnpm static-image-pipeline run`
4. import and render `<ImageStatic />` in the app

This is the standard path for a Next.js app and does not require a custom app-specific manifest script for the normal setup.

## Packages

### @vividwebau/static-image-pipeline
A Node-based build pipeline that produces:
- responsive width variants
- WebP/JPEG output variants
- blur placeholders
- hashed filenames
- a manifest describing all generated assets

The pipeline runs at build time and produces deterministic, cache-friendly static assets.

### @vividwebau/react-static-images
A pure server component for React that consumes the pipeline manifest and renders:
- `<picture>` markup with fallbacks
- responsive `srcset` + `sizes`
- native lazy loading
- CSS blur-up placeholders
- static asset output compatible with SSR and RSC

## How it works

1. The pipeline runs during the build and generates variants plus a manifest.
2. The React component consumes that manifest and renders the correct static image source.
3. The browser receives static, cacheable output without runtime image processing.

## Status

The repo now contains a working package-level flow and a validated sample integration in the Next.js demo app.

## Website

https://vividweb.com.au

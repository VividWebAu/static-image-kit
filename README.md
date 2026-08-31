# static-image-kit

A monorepo for VividWeb’s static image pipeline and framework‑agnostic React components.  
The system generates all responsive image variants at build time and exposes a pure server‑component `<ImageStatic />` that works across all React SSR/RSC frameworks, including Next.js, Remix, Astro, Hydrogen, Gatsby, and more.

No client JavaScript.  
No hydration.  
No runtime transforms.  
Just fast, predictable, static image delivery.

## Packages

### @vividwebau/static-image-pipeline
A Node-based build pipeline that produces:
- responsive width variants  
- AVIF/WebP/JPEG fallbacks  
- blur placeholders  
- hashed filenames  
- a manifest describing all generated assets  

This pipeline runs at build time and outputs deterministic, cache‑friendly static assets.

### @vividwebau/react-static-images
A pure server component for React that consumes the pipeline’s manifest and renders:
- `<picture>` markup with fallbacks  
- responsive `srcset` + `sizes`  
- native lazy loading (`loading="lazy"`)  
- CSS-only blur-up placeholders  
- container-query-friendly sizing  
- optional preload hints  

Works in:
- Next.js (App Router)  
- Remix  
- Astro  
- Hydrogen  
- Gatsby (SSR)  
- Any React SSR/RSC environment  

No client JS.  
No hydration.  
No framework-specific imports.

## Why this ecosystem exists

Modern frameworks increasingly rely on:
- server components  
- static asset pipelines  
- predictable build outputs  
- zero-runtime image handling  

`static-image-kit` provides a framework‑agnostic, build-time alternative to runtime image optimization.  
It is ideal for:
- performance-sensitive sites  
- static export workflows  
- multi-framework compatibility  
- predictable caching  
- zero client JS environments  
- design systems that need consistent image behavior  

## How it works

1. Pipeline runs at build time  
   Generates all variants + manifest.

2. React component consumes manifest  
   Renders `<picture>` with responsive rules.

3. Browser chooses correct variant  
   Based on viewport, DPR, container queries.

No runtime transforms.  
No client-side observers.  
No hydration cost.

## Status

All packages currently contain placeholder implementations.  
Full pipeline + component logic will be added in future releases.

## Website

https://vividweb.com.au

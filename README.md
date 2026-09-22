# static-image-kit

A monorepo containing:

- a build-time static image pipeline (`@vividwebau/static-image-pipeline`)
- a framework‑agnostic React Server Component (`@vividwebau/react-static-images`)

The system generates responsive image variants at build time and exposes a pure server‑component <ImageStatic /> that works cleanly in Next.js and other React SSR/RSC environments.

No client JavaScript.
No hydration.
No runtime transforms.
Just fast, predictable, static image delivery.

---

## Consumer workflow

Install both packages:

```bash
pnpm add -D @vividwebau/static-image-pipeline
pnpm add @vividwebau/react-static-images
```

Initialize the pipeline:

```bash
pnpm static-image-pipeline init
```

This creates:

- static-images/ (your source folder)
- .static-image-kit.config.mjs (your pipeline config)

### Workflow

1. Add source images under static-images/
2. Optionally adjust .static-image-kit.config.mjs
3. Run the pipeline:

```bash
  pnpm static-image-pipeline run
```

This generates:

- optimized AVIF/WebP/JPEG variants
- blur placeholders
- hashed filenames
- a manifest at: public/.processed-static-images/manifest.static-images.json

4. Use <ImageStatic /> anywhere in your app:

```bash
import { ImageStatic } from "@vividwebau/react-static-images";

export default function Hero() {
  return (
    <ImageStatic
      src="hero.jpg"
      alt="Hero image"
      sizes="100vw"
    />
  );
}
```

This is the standard flow for a Next.js app and does not require any custom manifest logic.

---

## Packages

### @vividwebau/static-image-pipeline

A Node-based build pipeline that produces:

- responsive width variants
- AVIF/WebP/JPEG output
- blur-up placeholders
- hashed filenames
- a manifest describing all generated assets

Runs at build time and outputs deterministic, cache‑friendly static assets.

### @vividwebau/react-static-images

A pure server component that consumes the pipeline manifest and renders:

- <picture> markup with fallbacks
- responsive srcset + sizes
- native lazy loading
- CSS-only blur-up placeholders
- static asset output compatible with SSR and RSC

---

## How it works

1. The pipeline runs during the build and generates all variants + a manifest.
2. The React component consumes the manifest and renders the correct static image source.
3. The browser receives static, cacheable output with zero runtime image processing.

---

## Notes

- SVGs should remain SVGs (logos, icons, line art).
- Raster images (photos, hero images, backgrounds) should go through the pipeline.
- The manifest path is stable and deterministic.
- The pipeline is a dev tool; the React package is a runtime dependency.

---

## Deployment workflow

The static image pipeline is a **build-time tool**, so it must run during your deployment process.

### Important rules

- The pipeline must run **before** your framework build (e.g., before `next build`).
- The generated images and manifest **should not be committed** to Git.
- The pipeline should run **in CI**.
- Vercel does **not** run the pipeline automatically — you must add it to your build command.

### Recommended CI sequence

pnpm install
pnpm static-image-pipeline run
pnpm next build

This ensures:

- all responsive variants are generated
- blur placeholders are generated
- hashed filenames are stable
- the manifest matches the deployed assets
- the React component receives correct static paths

### Vercel example

In `vercel.json`:

```
{
  "buildCommand": "pnpm static-image-pipeline run && pnpm next build"
}
```

### GitHub Actions example

steps:

- uses: actions/checkout@v4
- uses: pnpm/action-setup@v2
- run: pnpm install
- run: pnpm static-image-pipeline run
- run: pnpm next build

This is the correct deployment workflow for any Next.js or React SSR/RSC application using static-image-kit.

--

## Status

The repo contains a working package-level flow and a validated sample integration in the Next.js demo app.

---

## Website

https://vividweb.com.au

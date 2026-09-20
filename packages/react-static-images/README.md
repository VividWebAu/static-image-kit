# @vividwebau/react-static-images

A pure server-component React image component that consumes the static image pipeline’s
manifest and renders fully responsive, framework‑agnostic `<picture>` markup.

This component works across all React SSR/RSC frameworks:
- Next.js (App Router)
- Remix
- Astro
- Hydrogen
- Gatsby (SSR)
- Any React SSR environment

No client JavaScript.  
No hydration.  
No framework-specific imports.

## Features

- Pure server component (RSC-safe)
- `<picture>` markup with AVIF/WebP/JPEG fallbacks
- Responsive `srcset` + `sizes`
- Native lazy loading (`loading="lazy"`)
- CSS-only blur-up placeholders
- Container-query-friendly sizing
- Optional preload hints
- Zero runtime transforms

## Why server components?

Because all image variants are generated at build time, the component can remain fully
static and deterministic. Browsers handle responsive selection, fallbacks, and viewport
changes automatically.

This results in:
- zero client JS
- zero hydration cost
- zero runtime image optimization
- maximum compatibility across frameworks

## Usage

Use a stable image reference from your app’s original source set. This is the public consumer API and
is the contract app authors should rely on.

Example:

```tsx
import { ImageStatic } from "@vividwebau/react-static-images";

export default function Hero() {
  return (
    <ImageStatic
      image="hero.jpg"
      alt="Hero image"
      sizes="100vw"
      priority
    />
  );
}
```

For new code, the public API should stay as simple as `image` + `alt`.


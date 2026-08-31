# Static Image Pipeline - Architecture & Specification

This document describes the architecture, design principles, and specification for the static image pipeline and React component ecosystem.

## Table of Contents

1. [High-Level Goals](#high-level-goals)
2. [Architecture](#architecture)
3. [Source of Truth](#source-of-truth)
4. [Monorepo Structure](#monorepo-structure)
5. [Pipeline MVP](#pipeline-mvp)
6. [React Component](#react-component)
7. [Gitignore Strategy](#gitignore-strategy)
8. [Roadmap](#roadmap)

## High-Level Goals

- ✅ **Zero runtime image optimization** - All transforms at build time
- ✅ **Pure static assets** - Served directly from CDN
- ✅ **No Next.js image component** - Framework-agnostic design
- ✅ **Blur-up UX** - Zero client JavaScript
- ✅ **Pure RSC** - No client components
- ✅ **Manifest-driven** - All data in generated JSON
- ✅ **Framework-agnostic** - Works anywhere RSC works
- ✅ **Deterministic builds** - Same input → same output

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Developer: Add original images to source directory │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│   Static Image Pipeline (Build Time)                │
│  ┌───────────────────────────────────────────────┐ │
│  │ 1. Scan source directory for images          │ │
│  │ 2. Extract metadata (Sharp)                  │ │
│  │ 3. Generate blur placeholders (base64)       │ │
│  │ 4. Generate responsive variants              │ │
│  │ 5. Clean up stale processed images           │ │
│  │ 6. Build manifest describing all assets      │ │
│  │ 7. Write manifest + variants to disk         │ │
│  └───────────────────────────────────────────────┘ │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
   ┌─────────────┐   ┌──────────────────┐
   │  Manifest   │   │  Processed Images│
   │  (JSON)     │   │  (variants)      │
   └─────────────┘   └──────────────────┘
        │                     │
        │                     ▼
        │            ┌──────────────────┐
        │            │   CDN or Local   │
        │            │   Static Server  │
        │            └──────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────┐
│  React Component (Runtime)                          │
│  ┌───────────────────────────────────────────────┐ │
│  │ Pure RSC consumes manifest                   │ │
│  │ Renders semantic <picture> + <img>           │ │
│  │ Inline blur placeholder (zero requests)      │ │
│  │ Zero client JavaScript                       │ │
│  └───────────────────────────────────────────────┘ │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  HTML to Browser    │
        │  (pure static)      │
        └─────────────────────┘
```

## Source of Truth

**Original images are the SINGLE source of truth.**

### Why?

1. **Prevents stale variants** - Old variants won't linger if you delete an original
2. **Prevents Git churn** - No re-committing generated files
3. **Ensures determinism** - Every build starts fresh
4. **Simplifies cleanup** - Just delete old variant directories
5. **Clear documentation** - "Originals are the only committed image files"

### Directory Structure

```
project-root/
├── static-images/              ← COMMIT these (source of truth)
│   ├── hero.jpg
│   ├── gallery-1.png
│   └── gallery-2.png
│
├── dist/.processed-static-images/                  ← NEVER commit (generated, deleted each build)
    ├── manifest.static-images.json
    ├── abc123def/                ← content-addressed hash
    │   ├── hero.jpg              ← original (copied)
    │   ├── hero-320w.webp        ← generated variant
    │   ├── hero-320w.jpeg
    │   ├── hero-640w.webp
    │   └── hero-640w.jpeg
    └── def456ghi/
        └── ...
```

### Cleanup Strategy

When the pipeline runs:

1. **Scan** input directory for originals
2. **Clean** - Delete all hash directories in output (previous variants)
3. **Generate** - Create new variants from current originals
4. **Result** - No orphaned files, deterministic state

## Monorepo Structure

Two packages + one test app:

### 1. @vividwebau/static-image-pipeline (packages/static-image-pipeline)

**Responsibility**: Build-time image processing

- CLI for scanning, processing, manifest generation
- Sharp for metadata extraction and resizing
- fast-glob for file discovery
- Zod for manifest validation
- Framework-agnostic, Node.js-based

**Outputs**:
- Manifest JSON
- Resized image variants (if `--write-variants`)

### 2. @vividwebau/react-static-images (packages/react-static-images)

**Responsibility**: Runtime rendering (React Server Component only)

- Pure RSC component (no `'use client'`)
- Consumes manifest from pipeline
- Renders semantic `<picture>` + `<img>` HTML
- Inline blur placeholders
- Responsive srcset + sizes
- Framework-agnostic (works with any RSC framework)

**Inputs**:
- Manifest object from pipeline
- Image data from app consumer

**Outputs**:
- Pure HTML (no client JS)

### 3. apps/test-next (Next.js app for local testing)

**Responsibility**: Visual testing and documentation

- Loads manifest from `public/static-images.json`
- Renders demo pages (blur-up, responsive, clustering, etc.)
- Shows component behavior with real images
- Integration test for pipeline + component

**Build process**:
- Generate sample images
- Run pipeline to process them
- Load manifest in demo pages
- Verify component rendering

## Pipeline MVP

### Core Pipeline Steps

```typescript
async function runPipeline(
  inputDir: string,
  outputManifest: string,
  options?: PipelineOptions
): Promise<Manifest>
```

1. **Scan for images** - Use fast-glob to find all images
2. **Extract metadata** - Use Sharp to get width, height, format, orientation
3. **Generate blur** - Resize to 10×10, compress heavily, return base64
4. **Build variants** - For each width/format combo, generate resized image
5. **Clean stale** - Delete previous variant directories
6. **Build manifest** - Aggregate all metadata + variants into JSON
7. **Write files** - Save manifest and optionally write variants to disk

### CLI Options

```bash
npx @vividwebau/static-image-pipeline run \
  --input ./static-images \
  --output ./dist/.processed-static-images/manifest.static-images.json \
  --widths 320,640,960,1280 \
  --formats webp,jpeg \
  --write-variants \
  --output-dir ./dist/.processed-static-images
```

### Manifest Structure

```json
{
  "version": "1.0.0",
  "generated": "2026-08-31T12:00:00Z",
  "images": [
    {
      "id": "img-abc12345",
      "src": "/.processed-static-images/abc12345/hero.jpg",
      "width": 1920,
      "height": 1080,
      "aspectRatio": 1.7778,
      "blurDataURL": "data:image/jpeg;base64,/9j/...",
      "variants": [
        {
          "width": 320,
          "format": "webp",
          "src": "/.processed-static-images/abc12345/hero-320w.webp",
          "filename": "hero-320w.webp"
        }
      ]
    }
  ],
  "clusters": {}
}
```

### What Gets Generated

For a 1920×1080 image named `hero.jpg`:

**Original** (copied to output):
- `hero.jpg` (1920×1080)

**Variants** (only if smaller than original):
- `hero-320w.webp` (320px width)
- `hero-320w.jpeg` (320px width)
- `hero-640w.webp` (640px width)
- `hero-640w.jpeg` (640px width)
- `hero-960w.webp` (960px width)
- `hero-960w.jpeg` (960px width)
- `hero-1280w.webp` (1280px width)
- `hero-1280w.jpeg` (1280px width)

**Metadata** (in manifest):
- Actual dimensions
- Aspect ratio
- Base64 blur placeholder
- Variant references

## React Component

### Pure RSC Principle

```typescript
// ✅ Correct - Pure RSC
export function ImageStatic({ src, variants }: Props) {
  return <picture><img src={src} /></picture>;
}

// ❌ Wrong - Has 'use client'
'use client';
export function ImageStatic({ src }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  // ...
}
```

### Props

```typescript
interface ImageStaticProps {
  src: string;                          // Original image src
  alt: string;                          // Alt text (required)
  width?: number;                       // Intrinsic width (prevents layout shift)
  height?: number;                      // Intrinsic height
  blurDataURL?: string;                 // Base64 placeholder
  dominantColor?: string;               // Background color while loading
  variants?: Array<{                    // Responsive variants
    width: number;
    format: string;
    src: string;
  }>;
  sizes?: string;                       // HTML sizes attribute
  className?: string;                   // CSS class for <img>
  style?: CSSProperties;                // Inline styles for container
  priority?: boolean;                   // Use loading="eager"
}
```

### Rendered HTML

```html
<div style="aspect-ratio: 1.78; background: url(data:image/jpeg;base64,...)">
  <picture style="position: absolute; inset: 0">
    <source media="(min-width: 1920px)" srcset="/.processed-static-images/abc/hero-1280w.webp 1280w" />
    <source media="(min-width: 1024px)" srcset="/.processed-static-images/abc/hero-960w.webp 960w" />
    <source media="(min-width: 640px)" srcset="/.processed-static-images/abc/hero-640w.webp 640w" />
    <img src="/.processed-static-images/abc/hero.jpg" alt="..." loading="lazy" decoding="async" />
  </picture>
</div>
```

### Zero JavaScript

All browser behavior is native:
- ✅ Format selection (`<picture>` + `<source>`)
- ✅ Responsive sizing (`srcset` + `sizes`)
- ✅ Lazy loading (native `loading="lazy"`)
- ✅ Blur-to-image fade (CSS opacity transition via background image)

## Gitignore Strategy

### Root .gitignore

```gitignore
# Static Image Pipeline - Generated Assets
# Processed images (regenerated at build time)
apps/test-next/public/.processed-static-images/
```

### Per-app .gitignore

In `apps/test-next/.gitignore`:

```gitignore
# Processed variants
public/.processed-static-images/
```

### Rationale

1. **Originals committed** - `public/static-images/` exists in Git
2. **Variants ignored** - `public/.processed-static-images/` regenerated each build
3. **Manifest optional** - Up to consumer (test app commits it for demo)
4. **Clean builds** - Git clone → pnpm install → pnpm build works perfectly

## Roadmap

### MVP (DONE)
- ✅ Basic metadata extraction (Sharp)
- ✅ Blur placeholder generation
- ✅ Responsive variant generation
- ✅ Manifest building
- ✅ CLI implementation
- ✅ React RSC component
- ✅ Stale image cleanup

### Post-MVP: Clustering
- Reduce manifest size by 80%+ for large collections
- Generate 8-16 shared blur placeholders
- Extract features (hue, saturation, brightness, contrast)
- Run k-means clustering on feature vectors
- Assign images to nearest centroid
- Replace `blurDataURL` with `blurId`
- Manifest structure becomes:
  ```json
  {
    "blurs": [{ "id": "blur-0", "dataUrl": "..." }],
    "images": [{ "src": "...", "blurId": "blur-0" }]
  }
  ```

### Post-MVP: Synthetic Tests
- Controlled test images (black numbers on white, etc.)
- Deterministic cluster assignments
- Validate feature extraction + clustering quality

### Post-MVP: Advanced Features
- Dominant color extraction
- Brightness analysis
- Custom watermarks
- Automatic format detection
- AVIF support (currently optional)

## Key Design Decisions

1. **Build-time only** - No runtime transforms, maximum performance
2. **Pure RSC** - No client JavaScript, maximum simplicity
3. **Manifest-driven** - All data in JSON, easy to cache/version
4. **Source of truth** - Originals only, generated outputs ignored
5. **Automatic cleanup** - Stale images deleted automatically
6. **Framework-agnostic** - Works with any RSC framework
7. **Type-safe** - Full TypeScript throughout

## Testing Strategy

### Unit Tests
- Metadata extraction (real Sharp calls)
- Blur generation
- Variant generation
- Manifest building
- Clustering (post-MVP)

### Integration Tests
- Full pipeline end-to-end
- Manifest validation
- Variant file generation

### Visual Tests
- Demo pages in test-next
- Manual verification of:
  - Blur-up rendering
  - Responsive image loading
  - Aspect ratio preservation
  - Format fallbacks

## Performance Notes

### Build Time
- Metadata extraction: ~10ms per image (Sharp)
- Blur generation: ~20ms per image
- Variant generation: ~50ms per variant
- Total: ~100-150ms per image with full variants

### Runtime (Client)
- ✅ Zero JavaScript for image optimization
- ✅ Native browser image loading
- ✅ Native format/size selection

### File Size
- **Blur placeholder**: ~100-300 bytes (base64 inlined)
- **Manifest**: ~1KB per 50 images
- **Variants**: 20-50% of original per variant

### CDN
- Original + variants cached by content hash
- Long-term caching (etag-based)
- No origin requests for image processing

## License

MIT

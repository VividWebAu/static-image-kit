# @vividwebau/static-image-pipeline

A **build-time-only** image processing pipeline that generates all static assets required for responsive images with zero runtime overhead.

## Philosophy: Source of Truth

**Original images are the single source of truth. Everything else is generated at build time.**

- ✅ Place original images in your source directory  
- ✅ Pipeline regenerates all processed variants at build time
- ✅ Processed images are **never committed** to Git
- ✅ When you modify or delete an original, stale variants are automatically cleaned up

## What It Generates

For each original image, the pipeline produces:

1. **Metadata**: width, height, aspect ratio, format, EXIF orientation
2. **Blur Placeholder**: tiny (10×10px) base64 data URL for instant display
3. **Responsive Variants**: multiple widths (320, 640, 960, 1280w) in multiple formats (webp, jpeg, avif)
4. **Manifest**: JSON file describing all images and their variants
5. **Hashed Filenames**: stable, unique names for long-term CDN caching

## Directory Structure

```
your-project/
├── static-images/              ← COMMIT these (source of truth)
│   ├── hero.jpg
│   ├── gallery-1.png
│   └── gallery-2.png
│
├── dist/.processed-static-images/                  ← NEVER commit (generated)
    ├── manifest.static-images.json
    ├── abc123def/                ← hash-based directory
    │   ├── hero.jpg              ← original (copied)
    │   ├── hero-320w.webp
    │   ├── hero-320w.jpeg
    │   ├── hero-640w.webp
    │   └── hero-640w.jpeg
    └── def456ghi/
        └── ...
```

## CLI Usage

### Basic manifest generation

```bash
npx @vividwebau/static-image-pipeline run \
  --input ./images-original \
  --output ./dist/manifest.json
```

### With responsive variants

```bash
npx @vividwebau/static-image-pipeline run \
  --input ./images-original \
  --output ./dist/manifest.json \
  --write-variants \
  --output-dir ./dist/images \
  --widths 320,640,960,1280 \
  --formats webp,jpeg
```

### Custom configuration

```bash
npx @vividwebau/static-image-pipeline run \
  --input ./images \
  --output ./dist/manifest.json \
  --widths 300,600,900,1200,1500 \
  --formats avif,webp,jpeg \
  --write-variants \
  --output-dir ./dist/images
```

## Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `--input` | ✅ | - | Input directory with original images |
| `--output` | ✅ | - | Output path for manifest.json |
| `--widths` | - | 320,640,960,1280 | Comma-separated responsive widths (px) |
| `--formats` | - | webp,jpeg | Comma-separated output formats |
| `--write-variants` | - | false | Write resized images to disk |
| `--output-dir` | - | - | Directory for processed images (required if `--write-variants`) |

## Manifest Format

```json
{
  "version": "1.0.0",
  "generated": "2026-08-31T12:00:00.000Z",
  "images": [
    {
      "id": "img-abc12345",
      "src": "/.processed-static-images/abc12345/hero.jpg",
      "width": 1920,
      "height": 1080,
      "aspectRatio": 1.7778,
      "blurDataURL": "data:image/jpeg;base64,/9j/2wBDAA0JCg...",
      "variants": [
        {
          "width": 320,
          "format": "webp",
          "src": "/.processed-static-images/abc12345/hero-320w.webp",
          "filename": "hero-320w.webp"
        },
        {
          "width": 320,
          "format": "jpeg",
          "src": "/.processed-static-images/abc12345/hero-320w.jpeg",
          "filename": "hero-320w.jpeg"
        }
      ]
    }
  ],
  "clusters": {}
}
```

## Gitignore Requirements

In your `.gitignore`, exclude generated assets:

```gitignore
# Static Image Pipeline - Generated Assets
dist/.processed-static-images/           # Processed variants (regenerated at build time)

# COMMIT original images:
# images-original/
```

## Programmatic Usage

```javascript
import { runPipeline } from '@vividwebau/static-image-pipeline';

const manifest = await runPipeline(
  './images-original',
  './dist/manifest.json',
  {
    widths: [320, 640, 960, 1280],
    formats: ['webp', 'jpeg'],
    writeVariants: true,
    outputDir: './dist/images',
  }
);

console.log(`Processed ${manifest.images.length} images`);
```

## Build Integration

### In package.json

```json
{
  "scripts": {
    "prepare:images": "node scripts/build-images.js",
    "build": "npm run prepare:images && next build"
  }
}
```

### In scripts/build-images.js

```javascript
import { runPipeline } from '@vividwebau/static-image-pipeline';

await runPipeline(
  './images-original',
  './dist/manifest.json',
  {
    widths: [320, 640, 960, 1280],
    formats: ['webp', 'jpeg'],
    writeVariants: true,
    outputDir: './dist/images',
  }
);
```

## Key Features

### 🧹 Automatic Cleanup
When pipeline runs, it removes all previous variants before generating new ones. No orphaned files.

### 📊 Metadata Extraction
Automatically extracts: width, height, aspect ratio, format, EXIF orientation.

### 🔄 Responsive Variants
Generates multiple widths for different devices (320w, 640w, 960w, 1280w).

### 🖼️ Format Fallbacks
Creates WebP, JPEG, and AVIF for maximum browser compatibility.

### 📹 Blur Placeholders
Tiny (10×10px), heavily compressed base64 blur for instant visual feedback.

### #️⃣ Hashed Filenames
Content-addressed filenames for cache busting and long-term CDN storage.

### 🚫 Zero Runtime Overhead
All transforms are build-time only. No server-side image processing.

## Post-MVP: Clustering

Future versions will support intelligent blur clustering to reduce manifest size by 80%+ for large image collections. See `CLUSTERING.md` for details.

## Framework Integration

This package is framework-agnostic. The manifest can be consumed by:
- React Server Components (via `@vividwebau/react-static-images`)
- Vue 3 Server Components
- Svelte Server Components
- Any JSON-consuming template engine

## Features

- ✅ Build-time generation of all image variants
- ✅ Automatic AVIF/WebP/JPEG fallback chains
- ✅ Blur-up placeholder generation
- ✅ Deterministic hashed filenames
- ✅ JSON manifest describing every asset
- ✅ Zero client JavaScript required
- ✅ Zero runtime image optimization
- ✅ Automatic cleanup of stale images
- ✅ Framework-agnostic design

## TypeScript Support

Full TypeScript types included for manifest and pipeline options.

```typescript
import { runPipeline, type Manifest, type PipelineOptions } from '@vividwebau/static-image-pipeline';

const options: PipelineOptions = {
  widths: [320, 640, 960],
  formats: ['webp', 'jpeg'],
  writeVariants: true,
  outputDir: './dist/images',
};

const manifest: Manifest = await runPipeline('./images', './dist/manifest.json', options);
```

## License

MIT

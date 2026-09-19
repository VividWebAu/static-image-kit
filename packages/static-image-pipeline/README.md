# @vividwebau/static-image-pipeline

A build-time static image pipeline for generating responsive image assets and a manifest for React server components.

## Validated consumer flow

This is the working app flow for a consumer project, and it is the flow the package is designed to support:

```bash
pnpm add @vividwebau/static-image-pipeline @vividwebau/react-static-images
pnpm static-image-pipeline init
```

This creates the default project scaffold:

- `static-images/`
- `.static-image-kit.config.mjs`
- a `prepare:images` script in `package.json`
- a `.gitignore` entry for `public/.processed-static-images/`

Then the app author adds source images under `static-images/`, optionally edits the generated config, and runs:

```bash
static-image-pipeline run
```

The default config looks like this:

```js
export default {
  input: './static-images',
  output: './public/.processed-static-images/manifest.static-images.json',
  outputDir: './public/.processed-static-images',
  widths: [320, 640, 960, 1280],
  formats: ['webp', 'jpeg'],
  writeVariants: true,
};
```

This is the intended consumer pattern for a Next.js app. No app-specific custom manifest script is required for the standard workflow.

## CLI commands

```bash
static-image-pipeline init
static-image-pipeline run
static-image-pipeline run --input ./static-images --output ./public/.processed-static-images/manifest.static-images.json --write-variants --output-dir ./public/.processed-static-images
```

## Programmatic usage

```js
import { runPipeline } from '@vividwebau/static-image-pipeline';

await runPipeline('./static-images', './public/.processed-static-images/manifest.static-images.json', {
  widths: [320, 640, 960, 1280],
  formats: ['webp', 'jpeg'],
  writeVariants: true,
  outputDir: './public/.processed-static-images',
});
```

## React usage

After the pipeline has written the manifest, a consumer can render generated images in-app with the React component:

```tsx
import { ImageStatic } from '@vividwebau/react-static-images';

export default function Page() {
  return <ImageStatic src="/images/hero.jpg" alt="Hero" />;
}
```

## Generated output

The package writes a manifest like:

```json
{
  "version": "1.0.0",
  "generated": "2026-09-19T00:00:00.000Z",
  "images": [
    {
      "id": "img-abc123",
      "src": "/.processed-static-images/abc123/hero.jpg",
      "width": 1920,
      "height": 1080,
      "aspectRatio": 1.7778,
      "blurDataURL": "data:image/jpeg;base64,...",
      "variants": [
        { "width": 320, "format": "webp", "src": "/.processed-static-images/abc123/hero-320w.webp" }
      ]
    }
  ],
  "clusters": {}
}
```

## Notes

This setup is designed for minimal infrastructure and Vercel-friendly static delivery: the image transformations happen during build, and the generated assets are static and cacheable.

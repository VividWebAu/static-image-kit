# Static Image Kit - Monorepo Setup

## 📦 Project Structure

This is a pnpm + Turborepo monorepo for building and testing a static image optimization pipeline.

### Root Configuration

- **package.json** - Workspace configuration with shared dev dependencies
- **pnpm-workspace.yaml** - Defines apps/* and packages/* workspaces
- **tsconfig.json** - Root TypeScript config with path aliases
- **turbo.json** - Turborepo pipeline configuration

### Packages

#### 1. `packages/static-image-pipeline`
The core image processing pipeline library.

**Key Modules:**
- `pipeline.ts` - Main orchestrator function
- `cli.ts` - Command-line interface
- `metadata/extractMetadata.ts` - Extract image dimensions, colors, file info
- `blur/generateBlur.ts` - Generate low-quality blur placeholders
- `clustering/` - K-means clustering and feature extraction
- `manifest/buildManifest.ts` - Generate static manifest JSON
- `utils/` - Filesystem, hashing, glob utilities

**Dependencies:**
- `sharp` - Image processing
- `fast-glob` - File globbing
- `zod` - Schema validation

#### 2. `packages/react-static-images`
React Server Component for consuming pipeline output.

**Key Modules:**
- `ImageStatic.tsx` - RSC component for optimized image rendering
- `manifest.ts` - Manifest loading and querying
- `types.ts` - TypeScript definitions
- `utils.ts` - Utility helpers

**Dependencies:**
- React 19.x (peer dependency)
- React DOM 19.x (peer dependency)

### Apps

#### `apps/test-next`
Next.js 15 test application with RSC support.

**Routes:**
- `/` - Home page with demo links
- `/demos/blur-up` - Blur-up technique demo
- `/demos/clustering` - Color clustering demo
- `/demos/responsive` - Responsive images demo
- `/demos/aspect-ratio` - Aspect ratio preservation demo
- `/demos/synthetic` - Synthetic test images demo

**Features:**
- Uses React Server Components (RSC)
- Imports `ImageStatic` component from `react-static-images`
- Contains static manifest at `public/.processed-static-images/manifest.static-images.json`

## 🚀 Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

Run all dev servers in parallel:
```bash
pnpm dev
```

This starts:
- TypeScript watchers for both packages
- Next.js dev server at http://localhost:3000

### Build

Build all packages:
```bash
pnpm build
```

This compiles:
- `packages/static-image-pipeline/src` → `dist/`
- `packages/react-static-images/src` → `dist/`
- Next.js app (standalone)

### Testing

Run tests across all packages:
```bash
pnpm test
```

Test files:
- `packages/static-image-pipeline/tests/*.test.ts`
- `packages/react-static-images/tests/*.test.ts`

### Linting

```bash
pnpm lint
```

## 📋 Next Steps

### 1. Implement Static Image Pipeline

- [ ] Implement `extractMetadata()` using Sharp
- [ ] Implement `generateBlur()` - create small blurred previews
- [ ] Implement `extractFeatures()` - color histogram extraction
- [ ] Implement `kmeans()` - k-means clustering algorithm
- [ ] Implement `buildManifest()` - aggregate metadata into JSON
- [ ] Add CLI argument parsing and error handling

### 2. Implement React Component

- [ ] Add blur preview rendering with dominant color background
- [ ] Implement responsive srcset generation
- [ ] Add aspect ratio padding-bottom for CLS prevention
- [ ] Add loading state animations
- [ ] Integrate with Next.js Image optimization

### 3. Create Test Images

- [ ] Generate synthetic test images in `tests/synthetic/`
- [ ] Add real test images to `apps/test-next/static-images/`

### 4. Test Integration

- [ ] Create test runner for pipeline
- [ ] Add unit tests for clustering algorithm
- [ ] Add integration tests for full pipeline
- [ ] Add React Testing Library tests for component

### 5. Documentation

- [ ] Write API documentation
- [ ] Create usage examples
- [ ] Document CLI commands
- [ ] Create migration guides

## 🛠️ Configuration Details

### TypeScript Paths

Path aliases configured in root `tsconfig.json`:
- `@pipeline/*` → `packages/static-image-pipeline/src/*`
- `@react-static-images/*` → `packages/react-static-images/src/*`

### Build Outputs

- `packages/static-image-pipeline/dist/` - Pipeline library (CommonJS + types)
- `packages/react-static-images/dist/` - React component library (ESM + types)
- `apps/test-next/.next/` - Next.js build output

### Turbo Pipeline

- **build**: Compiles TypeScript, depends on `^build` from dependencies
- **dev**: Watches TypeScript/Next.js, runs in parallel
- **lint**: ESLint checks, no dependencies
- **test**: Runs test suites, depends on `^build`

## 📝 File Conventions

- Source files: `.ts` (TypeScript)
- Component files: `.tsx` (React + TypeScript)
- Test files: `*.test.ts`
- Configuration files: `.json`, `.mjs`, `.yaml`

## 🔗 Workspace References

Import packages from the monorepo:

```typescript
// In any workspace package
import { runPipeline } from '@pipeline';
import { ImageStatic } from '@react-static-images';
```

## 📚 Resources

- [Turborepo Docs](https://turbo.build/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [Next.js 15 Docs](https://nextjs.org/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)

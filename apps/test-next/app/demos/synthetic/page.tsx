import Link from 'next/link';
import { ImageStatic } from 'react-static-images';

export default function SyntheticDemo() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/">← Back to Home</Link>
      <h1>Synthetic Images Demo</h1>
      <p>Testing with programmatically generated images.</p>
      <p>
        This demo uses synthetic test images to validate the pipeline without
        needing real image assets.
      </p>
      <section>
        <h2>Synthetic Image Generation:</h2>
        <ul>
          <li>Solid color blocks (test dominant colors)</li>
          <li>Gradient patterns (test feature extraction)</li>
          <li>Procedural variations (test clustering)</li>
          <li>Multiple aspect ratios (test responsive sizing)</li>
        </ul>
      </section>
      <section>
        <h2>Test Data:</h2>
        <p>
          Synthetic images are stored in{' '}
          <code>packages/static-image-pipeline/tests/synthetic/</code>
        </p>
        <p>
          Run the pipeline with{' '}
          <code>--input tests/synthetic --output dist/manifest.json</code>
        </p>
      </section>
    </main>
  );
}

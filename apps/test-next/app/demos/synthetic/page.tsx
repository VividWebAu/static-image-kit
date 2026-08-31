import Link from 'next/link';
import { ImageStatic } from '@vividwebau/react-static-images';
import path from 'path';
import { readFileSync } from 'fs';

// Load manifest from public folder
const manifestPath = path.join(process.cwd(), 'public/.processed-static-images/manifest.static-images.json');
const manifestData = JSON.parse(readFileSync(manifestPath, 'utf-8'));

export default function SyntheticDemo() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/" style={{ textDecoration: 'underline' }}>
        ← Back to Home
      </Link>
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
        <h2>Test Data Gallery:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {manifestData.images.map((image: any) => (
            <div key={image.id}>
              <h4 style={{ marginBottom: '0.5rem' }}>{image.id}</h4>
              <ImageStatic
                src={image.src}
                alt={image.id}
                width={200}
                height={150}
                blurDataURL={image.blurDataURL}
                dominantColor={image.dominantColor}
              />
              <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>
                {image.width}x{image.height}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Pipeline Usage:</h2>
        <p>
          Synthetic images are stored in{' '}
          <code>packages/static-image-pipeline/tests/synthetic/</code>
        </p>
        <p>
          Run the pipeline with:{' '}
          <code>
            static-image-pipeline run --input tests/synthetic --output
            dist/.processed-static-images/manifest.static-images.json
          </code>
        </p>
      </section>
    </main>
  );
}

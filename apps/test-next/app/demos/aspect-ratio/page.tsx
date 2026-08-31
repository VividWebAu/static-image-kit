import Link from 'next/link';
import { ImageStatic, generatePaddingBottom } from '@vividwebau/react-static-images';
import path from 'path';
import { readFileSync } from 'fs';

// Load manifest from public folder
const manifestPath = path.join(process.cwd(), 'public/.processed-static-images/manifest.static-images.json');
const manifestData = JSON.parse(readFileSync(manifestPath, 'utf-8'));

export default function AspectRatioDemo() {
  const image = manifestData.images[1];

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/" style={{ textDecoration: 'underline' }}>
        ← Back to Home
      </Link>
      <h1>Aspect Ratio Demo</h1>
      <p>Aspect ratio preservation to prevent layout shift.</p>
      <p>
        By preserving aspect ratio during loading, we prevent Cumulative Layout
        Shift (CLS) and improve user experience.
      </p>
      <section>
        <h2>How it works:</h2>
        <ol>
          <li>Pipeline extracts aspect ratio from metadata</li>
          <li>CSS prevents layout shift: padding-bottom technique</li>
          <li>Image container maintains correct dimensions from start</li>
          <li>Reduces CLS score for better Core Web Vitals</li>
        </ol>
      </section>
      <section>
        <h2>Layout Shift Prevention:</h2>
        {image && (
          <div>
            <p>
              This image has an aspect ratio of {image.aspectRatio.toFixed(2)}:1
              ({image.width}x{image.height}). The component automatically prevents
              layout shift using CSS padding-bottom of{' '}
              <code>{generatePaddingBottom(image.aspectRatio)}</code>
            </p>
            <div style={{ marginTop: '1rem', maxWidth: '600px' }}>
              <ImageStatic
                src={image.src}
                alt={image.id}
                width={image.width}
                height={image.height}
                blurDataURL={image.blurDataURL}
                dominantColor={image.dominantColor}
              />
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Try resizing your window - the image container will maintain its
              aspect ratio without layout shift.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

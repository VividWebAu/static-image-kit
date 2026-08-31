import Link from 'next/link';
import { ImageStatic } from '@vividwebau/react-static-images';
import path from 'path';
import { readFileSync } from 'fs';

// Load manifest from public folder
const manifestPath = path.join(process.cwd(), 'public/static-images.json');
const manifestData = JSON.parse(readFileSync(manifestPath, 'utf-8'));

export default function Home() {
  // Get first two images from manifest for demo
  const firstImage = manifestData.images[0];
  const secondImage = manifestData.images[1];

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Static Image Pipeline - Test App</h1>
      <p>
        Test and visualize different image optimization techniques. Select a demo
        below:
      </p>

      <nav>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>
            <Link href="/demos/blur-up">→ Blur-up (Progressive Loading)</Link>
          </li>
          <li>
            <Link href="/demos/clustering">→ Clustering (Content-Aware)</Link>
          </li>
          <li>
            <Link href="/demos/responsive">→ Responsive Images (srcset)</Link>
          </li>
          <li>
            <Link href="/demos/aspect-ratio">
              → Aspect Ratio (Layout Shift Prevention)
            </Link>
          </li>
          <li>
            <Link href="/demos/synthetic">→ Synthetic Images (Test Data)</Link>
          </li>
        </ul>
      </nav>

      <section style={{ marginTop: '3rem' }}>
        <h2>Demo Images</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
          {firstImage && (
            <div>
              <h3>{firstImage.id}</h3>
              <ImageStatic
                src={firstImage.src}
                alt={firstImage.id}
                width={firstImage.width}
                height={firstImage.height}
                blurDataURL={firstImage.blurDataURL}
                dominantColor={firstImage.dominantColor}
                variants={firstImage.variants}
              />
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
                {firstImage.width}x{firstImage.height} ({firstImage.aspectRatio.toFixed(2)} aspect ratio)
              </p>
            </div>
          )}
          {secondImage && (
            <div>
              <h3>{secondImage.id}</h3>
              <ImageStatic
                src={secondImage.src}
                alt={secondImage.id}
                width={secondImage.width}
                height={secondImage.height}
                blurDataURL={secondImage.blurDataURL}
                dominantColor={secondImage.dominantColor}
                variants={secondImage.variants}
              />
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
                {secondImage.width}x{secondImage.height} ({secondImage.aspectRatio.toFixed(2)} aspect ratio)
              </p>
            </div>
          )}
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>Features</h2>
        <ul>
          <li>Blur-up placeholders for fast perceived performance</li>
          <li>Color clustering for intelligent preloading</li>
          <li>Responsive image sizing with srcset</li>
          <li>Aspect ratio preservation to prevent layout shift</li>
          <li>Server-side manifest generation</li>
          <li>React Server Component integration</li>
        </ul>
      </section>
    </main>
  );
}

import Link from 'next/link';
import { ImageStatic } from 'react-static-images';

export default function Home() {
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

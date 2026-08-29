import Link from 'next/link';
import { ImageStatic } from 'react-static-images';

export default function AspectRatioDemo() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/">← Back to Home</Link>
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
        <p>
          This technique uses CSS padding-bottom to reserve space before the image
          loads.
        </p>
      </section>
    </main>
  );
}

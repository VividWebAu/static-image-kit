import Link from 'next/link';
import { ImageStatic } from 'react-static-images';

export default function BlurUpDemo() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/">← Back to Home</Link>
      <h1>Blur-up Demo</h1>
      <p>Blur-up image loading technique with low-quality placeholders.</p>
      <p>
        The pipeline generates a small, heavily compressed version of each image
        that displays while the full image loads.
      </p>
      <section>
        <h2>How it works:</h2>
        <ol>
          <li>Extract metadata from image (dimensions, format)</li>
          <li>Generate small (10-20px) blurred version</li>
          <li>Display blur as placeholder while original loads</li>
          <li>Swap to full image on load</li>
        </ol>
      </section>
      <section>
        <h2>Demo Images:</h2>
        <p>(Image components will be added once pipeline generates manifest)</p>
      </section>
    </main>
  );
}

import Link from 'next/link';
import { ImageStatic } from 'react-static-images';

export default function ResponsiveDemo() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/">← Back to Home</Link>
      <h1>Responsive Images Demo</h1>
      <p>Responsive image sizing with srcset.</p>
      <p>
        Serves appropriately-sized images to different devices, reducing bandwidth
        and improving page load times.
      </p>
      <section>
        <h2>How it works:</h2>
        <ol>
          <li>Pipeline generates multiple size variants of each image</li>
          <li>Create srcset with breakpoints (640w, 1024w, 1920w, etc.)</li>
          <li>Browser selects best size for device/viewport</li>
          <li>Reduces file size for mobile devices</li>
        </ol>
      </section>
      <section>
        <h2>Responsive Image Examples:</h2>
        <p>(Examples will be added once pipeline generates variants)</p>
      </section>
    </main>
  );
}

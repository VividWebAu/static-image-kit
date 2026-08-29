import Link from 'next/link';
import { ImageStatic } from 'react-static-images';

export default function ClusteringDemo() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/">← Back to Home</Link>
      <h1>Clustering Demo</h1>
      <p>Color clustering for intelligent image preloading.</p>
      <p>
        Similar images are clustered together, enabling better preload strategies
        and content-aware caching.
      </p>
      <section>
        <h2>How it works:</h2>
        <ol>
          <li>Extract features from each image (color histograms)</li>
          <li>Run k-means clustering on feature vectors</li>
          <li>Group images by visual similarity</li>
          <li>Use clusters for smart prefetching and resource hints</li>
        </ol>
      </section>
      <section>
        <h2>Cluster Visualization:</h2>
        <p>(Cluster data will be populated from pipeline manifest)</p>
      </section>
    </main>
  );
}

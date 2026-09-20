import Link from 'next/link';
import { ImageStatic } from '@vividwebau/react-static-images';
import path from 'path';
import { readFileSync } from 'fs';
import manifest from "apps/test-next/public/.processed-static-images/manifest.static-images.json";

// Load manifest from public folder
const manifestPath = path.join(process.cwd(), 'public/.processed-static-images/manifest.static-images.json');
const manifestData = JSON.parse(readFileSync(manifestPath, 'utf-8'));

export default function ClusteringDemo() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/" style={{ textDecoration: 'underline' }}>
        ← Back to Home
      </Link>
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
        {manifestData.clusters && Object.keys(manifestData.clusters).length > 0 ? (
          <div>
            {Object.entries(manifestData.clusters).map(([clusterId, imageIds]: [string, unknown]) => {
              const ids = imageIds as string[];
              return (
                <div key={clusterId} style={{ marginTop: '1rem' }}>
                  <h3>Cluster {clusterId}</h3>
                  <p>Contains {ids.length} images</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {ids
                      .map((id: string) => manifestData.images.find((img: any) => img.id === id))
                      .filter(Boolean)
                      .map((image: any) => (
                        <div key={image!.id}>
                          <ImageStatic
                            image={image!.src}
                            alt={image!.id}
                            manifest={manifest}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No cluster data available</p>
        )}
      </section>
    </main>
  );
}

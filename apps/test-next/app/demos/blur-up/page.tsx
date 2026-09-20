import Link from "next/link";
import { ImageStatic } from "@vividwebau/react-static-images";
import path from "path";
import { readFileSync } from "fs";
import manifest from "apps/test-next/public/.processed-static-images/manifest.static-images.json";

// Load manifest from public folder
const manifestPath = path.join(
  process.cwd(),
  "public/.processed-static-images/manifest.static-images.json",
);
const manifestData = JSON.parse(readFileSync(manifestPath, "utf-8"));

export default function BlurUpDemo() {
  const image = manifestData.images[0];

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <Link href="/" style={{ textDecoration: "underline" }}>
        ← Back to Home
      </Link>
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
        {image && (
          <div style={{ marginTop: "1rem", maxWidth: "600px" }}>
            <ImageStatic
              image={image.src}
              alt={image.id}
              priority
              manifest={manifest}
            />
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                color: "#666",
              }}
            >
              Image uses data URL blur placeholder
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

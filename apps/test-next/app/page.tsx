import { ImageStatic } from "@vividwebau/react-static-images";
import Link from "next/link";

export default function Home() {
  const firstImage = "landscape.jpg";
  const secondImage = "portrait.jpg";

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Static Image Pipeline - Test App</h1>
      <p>Test and visualize different image optimization techniques. Select a demo below:</p>

      <nav>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
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
            <Link href="/demos/aspect-ratio">→ Aspect Ratio (Layout Shift Prevention)</Link>
          </li>
          <li>
            <Link href="/demos/synthetic">→ Synthetic Images (Test Data)</Link>
          </li>
        </ul>
      </nav>

      <section style={{ marginTop: "3rem" }}>
        <h2>Demo Images</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            marginTop: "1rem",
          }}
        >
          {firstImage && (
            <div>
              <h3>Landscape</h3>
              <ImageStatic image={firstImage} alt="Landscape" />
              <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
                1920x1080 (1.78 aspect ratio)
              </p>
            </div>
          )}
          {secondImage && (
            <div>
              <h3>Portrait</h3>
              <ImageStatic image={secondImage} alt="Portrait" />
              <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
                1080x1920 (0.56 aspect ratio)
              </p>
            </div>
          )}
        </div>
      </section>

      <section style={{ marginTop: "3rem" }}>
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

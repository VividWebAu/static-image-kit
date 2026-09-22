import {
  generatePaddingBottom,
  ImageStatic,
} from "@vividwebau/react-static-images";
import Link from "next/link";

export default function AspectRatioDemo() {
  const image = "landscape.jpg";

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <Link href="/" style={{ textDecoration: "underline" }}>
        ← Back to Home
      </Link>
      <h1>Aspect Ratio Demo</h1>
      <p>Aspect ratio preservation to prevent layout shift.</p>
      <p>
        By preserving aspect ratio during loading, we prevent Cumulative Layout Shift (CLS) and
        improve user experience.
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
              This image has an aspect ratio of 1.78:1 (1920x1080). The component automatically prevents layout shift using CSS
              padding-bottom of <code>{generatePaddingBottom(1.78)}</code>
            </p>
            <div style={{ marginTop: "1rem", maxWidth: "600px" }}>
              <ImageStatic image={image} alt="Landscape" />
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
              Try resizing your window - the image container will maintain its aspect ratio without
              layout shift.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

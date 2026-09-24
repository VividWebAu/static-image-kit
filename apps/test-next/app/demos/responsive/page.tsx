import { ImageStatic } from "@vividwebau/react-static-images";
import Link from "next/link";

export default function ResponsiveDemo() {
  const image = "/landscape.jpg";

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <Link href="/" style={{ textDecoration: "underline" }}>
        ← Back to Home
      </Link>
      <h1>Responsive Images Demo</h1>
      <p>Responsive image sizing with srcset.</p>
      <p>
        Serves appropriately-sized images to different devices, reducing bandwidth and improving
        page load times.
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
        {image && (
          <div style={{ marginTop: "1rem" }}>
            <ImageStatic image={image} alt="Landscape" sizes={{ sm: "100px" }} />
            Intrinsic layout (default) sizes: 100px StaticPath: {image}
            <br />
            <ImageStatic image={image} alt="Landscape" sizes={{ sm: "50vw" }} />
            Intrinsic layout (default) sizes: 50vw
            <br />
            <ImageStatic image={image} alt="Landscape" sizes={{ sm: "25%" }} />
            Intrinsic layout (default) 25%
            <br />
            <ImageStatic image={image} alt="Landscape" sizes={{ sm: 0.3 }} />
            Intrinsic layout (default) sizes: 30%
            <br />
            <ImageStatic image={image} alt="Landscape" />
            Responsive layout
            <br />
            <div style={{ position: "relative", width: "300px", height: "400px" }}>
              <ImageStatic image={image} alt="Landscape" />
            </div>
            Fill layout (300x400)
            <br />
            <ImageStatic image={image} alt="Landscape" width={300} height={400} />
            <br />
            Fixed layout (300x400)
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                color: "#666",
              }}
            >
              The pipeline resolves the responsive variants internally so app code stays simple.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

import { ImageStatic } from "@vividwebau/react-static-images";

export default function BlurDemo() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Blur Comparison Demo</h1>
      <p>
        This demo compares the real image (with blur-up) against the raw blur placeholder. Useful
        for checking cluster fidelity, colour accuracy, and fade-in smoothness. To see this in
        action, open browser developer tools and "Network" tab and change the throttling to a slower
        speed (e.g., "Slow 3G"). Also dont forget to check "Disable cache" while testing.
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>Blur-Up vs Pure Blur</h2>
        <p>
          Left: Real image with blur-up transition.
          <br />
          Right: Pure blur placeholder (no real image).
        </p>

        {/* Landscape */}
        <h3 style={{ marginTop: "2rem" }}>Landscape</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Real image */}
          <div style={{ width: "50%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="landscape.jpg" alt="Landscape" layout="cover" />
          </div>

          {/* Pure blur */}
          <div
            style={{
              width: "50%",
              height: "300px",
              border: "1px solid #ccc",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wgARCAAKAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECA//EABUBAQEAAAAAAAAAAAAAAAAAAAMF/9oADAMBAAIQAxAAAAHWUBT/AP/EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEAAQUCH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEABj8CH//EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEAAT8hH//aAAwDAQACAAMAAAAQb//EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oACAEDAQE/EK//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAXEAEBAQEAAAAAAAAAAAAAAAABABAR/9oACAEBAAE/EFLs5//Z)`,
            }}
          />
        </div>

        {/* Portrait */}
        <h3 style={{ marginTop: "2rem" }}>Portrait</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ width: "50%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="portrait.jpg" alt="Portrait" layout="cover" />
          </div>

          <div
            style={{
              width: "50%",
              height: "300px",
              border: "1px solid #ccc",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wgARCAAKAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECBP/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/9oADAMBAAIQAxAAAAHTIknf/8QAFBABAAAAAAAAAAAAAAAAAAAAIP/aAAgBAQABBQIf/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAIP/aAAgBAQAGPwIf/8QAFRABAQAAAAAAAAAAAAAAAAAAARD/2gAIAQEAAT8hYz//2gAMAwEAAgADAAAAEC//xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAgBAwEBPxCP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPxB//8QAGBAAAgMAAAAAAAAAAAAAAAAAAAEQESH/2gAIAQEAAT8QbC5f/9k=)`,
            }}
          />
        </div>

        {/* Square */}
        <h3 style={{ marginTop: "2rem" }}>Square</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ width: "50%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="square.jpg" alt="Square" layout="cover" />
          </div>

          <div
            style={{
              width: "50%",
              height: "300px",
              border: "1px solid #ccc",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wgARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgAD/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/2gAMAwEAAhADEAAAAdTFE/8A/8QAFBABAAAAAAAAAAAAAAAAAAAAIP/aAAgBAQABBQIf/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAIP/aAAgBAQAGPwIf/8QAFRABAQAAAAAAAAAAAAAAAAAAARD/2gAIAQEAAT8hYz//2gAMAwEAAgADAAAAEB//xAAVEQEBAAAAAAAAAAAAAAAAAAABAP/aAAgBAwEBPxAL/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPxB//8QAFxABAAMAAAAAAAAAAAAAAAAAAQAQEf/aAAgBAQABPxBE23//2Q==)`,
            }}
          />
        </div>
      </section>

      <section style={{ marginTop: "3rem" }}>
        <h2>Contain Layout (Blur Suppressed)</h2>
        <p>
          Blur is intentionally disabled for <code>layout="contain"</code> to avoid geometry
          mismatch. This section shows that the real image loads without blur.
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="landscape.jpg" alt="Landscape" layout="contain" />
          </div>
          <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="portrait.jpg" alt="Portrait" layout="contain" />
          </div>
          <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="square.jpg" alt="Square" layout="contain" />
          </div>
        </div>
      </section>

      <section style={{ marginTop: "3rem" }}>
        <h2>Cover Layout (Blur Active)</h2>
        <p>
          Blur works perfectly with <code>layout="cover"</code> because the image fills the
          container.
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="landscape.jpg" alt="Landscape" layout="cover" />
          </div>
          <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="portrait.jpg" alt="Portrait" layout="cover" />
          </div>
          <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="square.jpg" alt="Square" layout="cover" />
          </div>
        </div>
      </section>

      <section style={{ marginTop: "3rem" }}>
        <h2>Fill Layout (Blur Active)</h2>
        <p>
          Blur also works with <code>layout="fill"</code> because the image stretches to fill the
          container.
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="landscape.jpg" alt="Landscape" layout="fill" />
          </div>
          <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="portrait.jpg" alt="Portrait" layout="fill" />
          </div>
          <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
            <ImageStatic image="square.jpg" alt="Square" layout="fill" />
          </div>
        </div>
      </section>
    </main>
  );
}

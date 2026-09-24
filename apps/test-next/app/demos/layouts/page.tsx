import { ImageStatic } from "@vividwebau/react-static-images";

export default function LayoutsDemo() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Layouts Demo</h1>
      <p>This demo showcases different image layouts.</p>

      <section>
        <h2>Image Layout Examples</h2>
        <p>Here are some examples of different image layouts using the ImageStatic component.</p>

        <div style={{ marginTop: "1rem" }}>
          <h3>Layout="contain" (default)</h3>
          <p>
            Contain layout will scale the image to fit within the container while maintaining its
            aspect ratio.
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
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

          <br />
          <p>
            You can adjust the position of the image within its container using the positionX and
            positionY props:
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
              <ImageStatic
                image="landscape.jpg"
                alt="Landscape"
                layout="contain"
                positionX="left"
                positionY="top"
              />
            </div>
            <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
              <ImageStatic
                image="portrait.jpg"
                alt="Portrait"
                layout="contain"
                positionX="left"
                positionY="top"
              />
            </div>
            <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
              <ImageStatic
                image="square.jpg"
                alt="Square"
                layout="contain"
                positionX="right"
                positionY="bottom"
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h3>Layout="cover"</h3>
          <p>
            Layout="cover" will make the image cover the entire container, potentially cropping it
            to maintain its aspect ratio.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
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

          <br />
          <p>
            You can adjust the position of the image within its container using the positionX and
            positionY props:
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
              <ImageStatic
                image="landscape.jpg"
                alt="Landscape"
                layout="cover"
                positionX="left"
                positionY="top"
              />
            </div>
            <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
              <ImageStatic
                image="portrait.jpg"
                alt="Portrait"
                layout="cover"
                positionX="left"
                positionY="top"
              />
            </div>
            <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
              <ImageStatic
                image="square.jpg"
                alt="Square"
                layout="cover"
                positionX="right"
                positionY="bottom"
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h3>Layout="fill"</h3>
          <p>
            Layout="fill" will make the image stretch to fill the entire container, potentially
            distorting its aspect ratio.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
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
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h3>Layout="fixed"</h3>
          <p>
            Layout="fixed" will render the image at a fixed size regardless of the container size.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
              <ImageStatic
                image="landscape.jpg"
                alt="Landscape"
                layout="fixed"
                width="200"
                height="200"
              />
            </div>
            <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
              <ImageStatic
                image="portrait.jpg"
                alt="Portrait"
                layout="fixed"
                width="200"
                height="200"
              />
            </div>
            <div style={{ width: "33%", height: "300px", border: "1px solid #ccc" }}>
              <ImageStatic
                image="square.jpg"
                alt="Square"
                layout="fixed"
                width="200"
                height="200"
              />
            </div>
          </div>

          <p>
            If an image is bigger than its container, it will overflow and will not be clipped
            unless you as the consumer explicitly set overflow: hidden on your own parent container.
            You can also use positionX and positionY to control the visible portion of the image.
          </p>

          <div
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid #ccc",
              overflow: "hidden",
            }}
          >
            <ImageStatic
              image="landscape.jpg"
              alt="Landscape"
              layout="fixed"
              width="200"
              height="200"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

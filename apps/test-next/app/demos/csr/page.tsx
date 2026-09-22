import Link from "next/link";
import { CsrClientComponent } from "./client-component";

export default function CsrPage() {

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <Link href="/" style={{ textDecoration: "underline" }}>
        ← Back to Home
      </Link>
      <h1>CSR Demo</h1>
      <p>Responsive image sizing with srcset.</p>
      <p>
        Serves appropriately-sized images to different devices, reducing bandwidth and improving
        page load times.
      </p>
      <section>
        <CsrClientComponent />
      </section>
    </main>
  );
}

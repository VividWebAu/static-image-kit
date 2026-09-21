import type { Metadata } from "next";
import "./globals.css";
import { setStaticImageManifest } from "@vividwebau/react-static-images";
import manifest from "@/public/.processed-static-images/manifest.static-images.json";

setStaticImageManifest(manifest);

export const metadata: Metadata = {
  title: "Static Image Pipeline - Test App",
  description: "Test app for static image pipeline RSC component and optimizations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

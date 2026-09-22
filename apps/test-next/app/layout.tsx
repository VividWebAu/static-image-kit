import type { Metadata } from "next";
import "./globals.css";

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

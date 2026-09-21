/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["react-static-images"],
    // RSC is enabled by default in App Router
  },
  images: {
    // Define image loader and optimization settings
    unoptimized: false,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

// Cloudflare: the whole site is built as plain files (`next build` -> out/), served free by Cloudflare.
// Cache headers for /public folders live in public/_headers (Next's headers() doesn't apply to plain files).
const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  images: {
    // plain files: no image server, so photos are made small at build time (see scripts/optimize-images.mjs)
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [75, 95],
    // fewer sizes than Next's default list = fewer files to make; phones, laptops and big screens still covered
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;

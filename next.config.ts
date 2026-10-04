import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // 75 is the default every image uses; 95 is for photos and app screenshots that must stay sharp.
    qualities: [75, 95],
  },
};

export default nextConfig;

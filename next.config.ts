import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // 75 is the default every image uses; 95 is for photos and app screenshots that must stay sharp.
    qualities: [75, 95],
  },
  async headers() {
    return [
      {
        // Logos, icons, posters and clips served straight from /public. By default they carry
        // max-age=0, so every visit asks the server about each file again (about forty requests
        // on /developers). They rarely change: a browser may reuse them for a day, and for a
        // week after that while it checks for a newer copy in the background.
        source: "/:folder(skills|logos|brand|reviews|videos)/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

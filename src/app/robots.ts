import type { MetadataRoute } from "next";

const BASE_URL = "https://cyrontech.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

// Cloudflare build makes plain files: this one is made once at build time
export const dynamic = "force-static";

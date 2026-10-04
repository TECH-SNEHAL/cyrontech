import type { MetadataRoute } from "next";

const BASE_URL = "https://cyrontech.in";

// kept in sync with the screenshots in src/components/sections/portfolio.tsx
const PORTFOLIO_IMAGES = [
  "/portfolio/restaurant-booking-website.png",
  "/portfolio/ohm-global-opportunities.jpg",
  "/portfolio/world-academy-future-of-women.png",
  "/portfolio/synthesis-trust-admin.png",
  "/portfolio/synthesis-trust-mobile.jpg",
  "/portfolio/ira-luxury-farmstay.png",
].map((path) => `${BASE_URL}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: PORTFOLIO_IMAGES,
    },
  ];
}

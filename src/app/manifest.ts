import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cyron Tech — Software Development Agency",
    short_name: "Cyron Tech",
    description:
      "Cyron Tech builds websites, mobile apps, CRMs, and automation designed around how your business actually works.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b63d8",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * PWA manifest — served at /manifest.json.
 *
 * Enables "Add to home screen" on mobile and installability on desktop.
 * Icons should be in /public/ — create them with a tool like
 * https://realfavicongenerator.net or pwa-asset-generator.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b0b0c",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["developer", "productivity", "technology"],
  };
}

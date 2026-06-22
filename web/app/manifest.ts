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
        src: "/icon",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["developer", "productivity", "technology"],
  };
}

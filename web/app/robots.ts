import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Dynamic robots.txt — served at /robots.txt.
 *
 * Allows all crawlers to access all public routes.
 * Disallows /api/ and any future /admin/ routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url.replace(/^https?:\/\//, ""),
  };
}

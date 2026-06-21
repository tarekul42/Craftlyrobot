import type { MetadataRoute } from "next";
import { products } from "@/config/products";
import { departments } from "@/config/departments";
import { siteConfig } from "@/config/site";

/**
 * Dynamic sitemap — generated at build time, served at /sitemap.xml.
 *
 * Add new static routes here when you add pages.
 * Dynamic routes (products, departments, blog) are auto-included.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // === Static routes ===
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/what-is-craftly`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/community/departments`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contribute`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contribute/roles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contribute/apply`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    // Legal
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/security`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  // === Dynamic product routes ===
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // === Dynamic department routes ===
  const departmentRoutes: MetadataRoute.Sitemap = departments.map((d) => ({
    url: `${baseUrl}/community/departments/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // TODO: Add blog post routes when MDX content is wired up
  // import { getAllPosts } from "@/lib/mdx";
  // const blogRoutes = getAllPosts().map((post) => ({...}));

  return [...staticRoutes, ...productRoutes, ...departmentRoutes];
}

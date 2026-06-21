/**
 * Site configuration — the single source of truth for site-wide metadata.
 * Imported by app/layout.tsx for SEO metadata and by layout components.
 */

export const siteConfig = {
  name: "Craftly",
  url: "https://craftlyrobot.com",
  description:
    "Craftly is a contributor-driven ecosystem building tools that turn ideas into shipped products. From Bangladesh, with ambition.",
  keywords: [
    "Craftly",
    "Craftly Robot",
    "Android app builder",
    "contributor ecosystem",
    "Bangladesh tech",
    "decentralized intelligence",
  ],
  authors: [{ name: "Craftly" }],
  creator: "Craftly",
  social: {
    facebook: "https://www.facebook.com/groups/peopleofcraftly",
    youtube: "https://www.youtube.com/@WasifbuildingCraftly",
    github: "https://github.com/tarekul42/Craftlyrobot",
  },
  contact: {
    email: "hello@craftlyrobot.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;

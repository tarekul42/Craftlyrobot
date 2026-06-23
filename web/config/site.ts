export const siteConfig = {
  name: "Craftlyrobot",
  shortName: "Craftly",
  url: "https://craftlyrobot.com",
  description:
    "Agent-to-agent negotiation network. Finding blood donors, booking rides, buying groceries, building apps — anything people do for themselves. No waiting.",
  keywords: [
    "Craftlyrobot",
    "agent to agent negotiation",
    "AI agent network",
    "Banglish AI",
    "Bangla AI",
    "decentralized intelligence",
    "Android app builder",
    "Bangladesh tech ecosystem",
    "Craftly Robot",
    "AI for Bangladesh",
    "peer to peer agent marketplace",
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

import type { Product } from "@/types/content";

/**
 * Product catalog — the products Craftly is building.
 * Extracted from craftlyrobot.com and hello.craftlyrobot.com.
 */
export const products: Product[] = [
  {
    slug: "craftly-robot",
    name: "Craftly Robot",
    tagline: "From dream to reality, with one command",
    description:
      "Craftly Robot is a computer software which can build Android apps pretty fast. You connect your Android phone with a USB cable to your desktop or laptop, tell our robot what to build, and done.",
    status: "coming-soon",
    features: [
      "Build Android apps from natural language prompts",
      "Direct USB connection to your Android device",
      "Decentralized Node Architecture for near-frontier performance",
      "One-command workflow from idea to APK",
    ],
    screenshots: [
      "/products/craftly-robot/screenshot-1.png",
    ],
  },
  {
    slug: "hello",
    name: "Hello",
    tagline: "The onboarding robot",
    description:
      "The onboarding robot, learning language nuances from everyday real world conversations with real people.",
    status: "internal",
    features: [
      "Conversational onboarding for new contributors",
      "Learns from real-world language patterns",
      "Trains Craftly Robot's understanding of intent",
    ],
  },
  {
    slug: "workspace",
    name: "Workspace",
    tagline: "Decentralized collaboration",
    description:
      "Already integrated with our decentralized networking layer and getting battle tested day by day with real users.",
    status: "internal",
    features: [
      "Decentralized networking layer",
      "Real-time collaboration",
      "Battle tested with real users daily",
    ],
  },
  {
    slug: "agent-console",
    name: "Agent Console",
    tagline: "Internal DevOps tool",
    description:
      "Our internal agentic tool for DevOps engineering, getting battle tested every day on real world use cases.",
    status: "internal",
    features: [
      "Agentic DevOps workflows",
      "Real-world use case testing",
      "Powers Craftly's internal operations",
    ],
  },
];

/**
 * Get a product by its slug. Returns undefined if not found.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Foundation products — the three products that taught Craftly what it knows.
 * Pulled from the homepage of the original craftlyrobot.com.
 */
export const foundationProducts = products.filter((p) =>
  ["hello", "workspace", "agent-console"].includes(p.slug)
);

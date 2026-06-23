import type { Update } from "@/types/update";

export const updates: Update[] = [
  {
    id: "agent-negotiation-live",
    type: "shipped",
    title: "Agent negotiation animation goes live on homepage",
    summary:
      "The hero now shows a real-time simulation of agent-to-agent negotiation — blood donor scenario with live timer, chat bubbles, and monochrome design.",
    date: "2026-06-24",
    author: "Tarekul",
    tags: ["website", "design", "agentic"],
  },
  {
    id: "nuance-banglish-support",
    type: "shipped",
    title: "Nuance engine now supports Banglish across 8 scenarios",
    summary:
      "Our language engine handles Bangla, English, and Banglish for blood donor, ride share, and app building — all demoed on the homepage.",
    date: "2026-06-23",
    author: "Wasif",
    tags: ["nuance", "nlp", "ai"],
  },
  {
    id: "blood-donor-first-success",
    type: "milestone",
    title: "First successful blood donor match via agent network",
    summary:
      "An O+ blood request in Dhaka was fulfilled through the agent network — donor found, eligibility verified, pickup negotiated, all without human calls.",
    date: "2026-06-22",
    author: "Rafi",
    link: { label: "Case study", href: "/blog/blood-donor-case-study" },
    tags: ["agentic", "blood-donor", "milestone"],
  },
  {
    id: "workspace-uptime-milestone",
    type: "milestone",
    title: "Workspace hit 99.2% uptime",
    summary:
      "After months of incremental reliability work, Workspace crossed the 99% uptime mark for the first time.",
    date: "2026-06-20",
    author: "Wasif",
    link: { label: "Status page", href: "/products/workspace" },
    tags: ["workspace", "infrastructure"],
  },
  {
    id: "craftly-robot-private-beta",
    type: "shipped",
    title: "Craftly Robot enters private beta",
    summary:
      "The first external testers are building Android apps from natural language prompts. Invites going out this week.",
    date: "2026-06-18",
    author: "Tarekul",
    link: { label: "Beta details", href: "/products/craftly-robot" },
    tags: ["craftly-robot", "launch"],
  },
  {
    id: "design-system-v2",
    type: "shipped",
    title: "Design system v2 released — monochrome, mobile-first, accessible",
    summary:
      "Complete visual overhaul: monochrome color palette, mobile-first responsive tokens, WCAG AA compliant contrast, and refined typography scale.",
    date: "2026-06-16",
    author: "Tarekul",
    tags: ["design", "design-system", "accessibility"],
  },
  {
    id: "agent-console-dogfood",
    type: "progress",
    title: "Agent Console now powers our internal CI/CD",
    summary:
      "We migrated our deployment pipeline to Agent Console. It's catching real issues daily and getting faster.",
    date: "2026-06-15",
    tags: ["agent-console", "engineering"],
  },
  {
    id: "new-contributors-june",
    type: "community",
    title: "Three new contributors joined this week",
    summary:
      "Two engineers and a technical writer started onboarding. Welcome to the team!",
    date: "2026-06-12",
    author: "Rafi",
    tags: ["community", "onboarding"],
  },
  {
    id: "agent-network-protocol-alpha",
    type: "progress",
    title: "Agent Network Protocol enters alpha — P2P agent communication",
    summary:
      "The core protocol that lets agents discover, negotiate, and transact with each other is now running in alpha. Blood donor scenario was the first test case.",
    date: "2026-06-11",
    author: "Wasif",
    tags: ["protocol", "agentic", "p2p"],
  },
  {
    id: "architecture-blog-post",
    type: "behind-the-scenes",
    title: "Published: Our decentralized node architecture",
    summary:
      "A deep dive into how Craftly Robot distributes computation across a peer-to-peer node network.",
    date: "2026-06-10",
    author: "Wasif",
    link: { label: "Read the post", href: "/blog/decentralized-node-architecture" },
    tags: ["engineering", "architecture"],
  },
  {
    id: "hello-language-model-v2",
    type: "shipped",
    title: "Hello now understands context across 3 languages",
    summary:
      "The onboarding robot can follow conversations mixing Bengali, English, and Hinglish without confusion.",
    date: "2026-06-05",
    author: "Tarekul",
    tags: ["hello", "ai"],
  },
  {
    id: "five-hundred-applications",
    type: "milestone",
    title: "500 applications submitted through early access",
    summary:
      "The apply form hit 500 submissions. Over 60% of applicants are from Bangladesh, with growing interest from India, Pakistan, and the Middle East.",
    date: "2026-06-03",
    author: "Rafi",
    tags: ["community", "growth", "milestone"],
  },
  {
    id: "documentary-published",
    type: "announcement",
    title: "Craftly Documentary — Building from Bangladesh",
    summary:
      "A short documentary about our journey: building a tech company from Dhaka, with contributors across time zones.",
    date: "2026-06-02",
    author: "Tarekul",
    link: { label: "Watch on YouTube", href: "https://youtube.com/playlist?list=CraftlyDocumentary" },
    tags: ["media", "documentary"],
  },
  {
    id: "workspace-collab-feature",
    type: "progress",
    title: "Real-time collaborative editing prototype ready",
    summary:
      "Our CRDT-based editor prototype works across 4 peers. Still rough — next step is conflict resolution UX.",
    date: "2026-06-01",
    author: "Wasif",
    tags: ["workspace", "engineering"],
  },
  {
    id: "decentralized-node-alpha",
    type: "announcement",
    title: "Decentralized node network enters alpha testing",
    summary:
      "The first 5 nodes are live across Dhaka, Chattogram, and Singapore. Each node runs a full agent runtime and communicates over the agent protocol.",
    date: "2026-05-28",
    author: "Wasif",
    tags: ["infrastructure", "decentralized", "alpha"],
  },
  {
    id: "ui-ux-refinement-pack",
    type: "shipped",
    title: "Priority 12 ships: UI/UX refinement across 8 files",
    summary:
      "Agent negotiation chat bubbles, 8-scenario nuance showcase, wider apply form, documentary section, dynamic update filters, and mobile-responsive hero.",
    date: "2026-05-25",
    author: "Tarekul",
    tags: ["website", "design", "ux"],
  },
];

export function getAllUpdates(): Update[] {
  return [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getUpdateById(id: string): Update | undefined {
  return updates.find((u) => u.id === id);
}

import type { Update } from "@/types/update";

export const updates: Update[] = [
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
    id: "workspace-collab-feature",
    type: "progress",
    title: "Real-time collaborative editing prototype ready",
    summary:
      "Our CRDT-based editor prototype works across 4 peers. Still rough — next step is conflict resolution UX.",
    date: "2026-06-01",
    author: "Wasif",
    tags: ["workspace", "engineering"],
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

import type { Project } from "@/types/content";

/**
 * Active projects at Craftly.
 * Replace with real data as the ecosystem grows.
 */
export const projects: Project[] = [
  {
    slug: "craftly-robot",
    name: "Craftly Robot",
    description:
      "Software that builds Android apps pretty fast from natural language prompts. Our flagship product.",
    status: "active",
    department: "Engineering",
    contributorCount: 8,
    startDate: "2025-06-01",
    tags: ["ai", "android", "agentic"],
    goals: [
      "Ship MVP with basic app-building capability",
      "Integrate Decentralized Node Architecture",
      "Onboard first 100 early access users",
    ],
  },
  {
    slug: "workspace",
    name: "Workspace",
    description:
      "Decentralized collaboration tool integrated with our networking layer. Battle-tested daily with real users.",
    status: "active",
    department: "Engineering",
    contributorCount: 5,
    startDate: "2025-03-01",
    tags: ["decentralized", "collaboration", "networking"],
    goals: [
      "Achieve 99.9% uptime",
      "Scale to 1000 concurrent users",
      "Open API for third-party integrations",
    ],
  },
  {
    slug: "hello",
    name: "Hello",
    description:
      "The onboarding robot, learning language nuances from everyday real-world conversations with real people.",
    status: "active",
    department: "Community",
    contributorCount: 3,
    startDate: "2025-01-01",
    tags: ["onboarding", "nlp", "community"],
    goals: [
      "Process 10,000 real conversations",
      "Improve intent recognition accuracy",
      "Train Craftly Robot's language model",
    ],
  },
  {
    slug: "agent-console",
    name: "Agent Console",
    description:
      "Internal agentic tool for DevOps engineering. Battle-tested every day on real-world use cases.",
    status: "active",
    department: "Engineering",
    contributorCount: 4,
    startDate: "2025-04-01",
    tags: ["devops", "agentic", "internal"],
    goals: [
      "Automate 80% of routine DevOps tasks",
      "Reduce deployment time by 50%",
      "Open source the agent framework",
    ],
  },
  {
    slug: "craftly-website",
    name: "Craftly Website",
    description:
      "The unified public website you're looking at. Built with Next.js 15, Tailwind v4, and shadcn/ui.",
    status: "active",
    department: "Engineering",
    contributorCount: 6,
    startDate: "2026-01-01",
    tags: ["nextjs", "tailwind", "shadcn"],
    goals: [
      "Ship all 26 routes from the implementation plan",
      "Achieve 95+ Lighthouse score on all pages",
      "Wire backend (email, Slack, database)",
    ],
  },
  {
    slug: "community-onboarding",
    name: "Community Onboarding Program",
    description:
      "The structured 30-day onboarding ramp for new contributors. Mentor, first task, weekly milestones.",
    status: "active",
    department: "Community",
    contributorCount: 4,
    startDate: "2025-09-01",
    tags: ["onboarding", "mentorship", "community"],
    goals: [
      "Achieve 70% first-contribution rate within 30 days",
      "Recruit 10 mentors",
      "Reduce time-to-first-contribution to under 14 days",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByDepartment(department: string): Project[] {
  return projects.filter((p) => p.department === department);
}

export function getActiveProjects(): Project[] {
  return projects.filter((p) => p.status === "active");
}

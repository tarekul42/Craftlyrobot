import type { Department } from "@/types/content";

export const departments: Department[] = [
  {
    slug: "engineering",
    name: "Engineering",
    contributorCount: 12,
    focus: "Building Craftly's products and internal tools",
    openings: [
      "Frontend Contributor",
      "Backend Contributor",
      "DevOps Engineer",
    ],
    currentProjects: ["craftly-robot", "workspace", "agent-console"],
  },
  {
    slug: "design",
    name: "Design",
    contributorCount: 4,
    focus: "Designing the Craftly brand, products, and contributor experience",
    openings: ["Product Designer", "Brand Designer"],
    currentProjects: ["craftly-robot", "craftly-website"],
  },
  {
    slug: "ai-ml",
    name: "AI & ML",
    contributorCount: 5,
    focus: "Training language models, building the Nuance engine, and agent negotiation logic",
    openings: ["NLP Specialist", "ML Engineer"],
    currentProjects: ["nuance", "hello", "agent-network-protocol"],
  },
  {
    slug: "community",
    name: "Community",
    contributorCount: 8,
    focus: "Onboarding new contributors and running community channels",
    openings: ["Community Manager", "Onboarding Mentor"],
    currentProjects: ["craftly-robot", "hello", "community-onboarding"],
  },
  {
    slug: "content",
    name: "Content",
    contributorCount: 3,
    focus: "Documentation, technical writing, and social media content",
    openings: ["Technical Writer", "Content Creator"],
    currentProjects: ["craftly-website"],
  },
  {
    slug: "operations",
    name: "Operations",
    contributorCount: 3,
    focus: "Running the day-to-day of Craftly as an organization",
    openings: ["Operations Lead"],
  },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}

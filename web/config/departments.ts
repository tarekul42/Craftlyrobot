import type { Department } from "@/types/content";

/**
 * Department catalog — how Craftly organizes its work.
 * Numbers are placeholder — replace with real counts as the ecosystem grows.
 */
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
    currentProjects: ["craftly-robot", "workspace"],
  },
  {
    slug: "design",
    name: "Design",
    contributorCount: 4,
    focus: "Designing the Craftly brand, products, and contributor experience",
    openings: ["Product Designer", "Brand Designer"],
    currentProjects: ["craftly-robot"],
  },
  {
    slug: "community",
    name: "Community",
    contributorCount: 8,
    focus: "Onboarding new contributors and running community channels",
    openings: ["Community Manager", "Onboarding Mentor"],
  },
  {
    slug: "operations",
    name: "Operations",
    contributorCount: 3,
    focus: "Running the day-to-day of Craftly as an organization",
    openings: ["Operations Lead"],
  },
];

/**
 * Get a department by slug.
 */
export function getDepartmentBySlug(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}

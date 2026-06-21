import type { ContributorRole } from "@/types/content";

/**
 * Open contributor roles at Craftly.
 */
export const roles: ContributorRole[] = [
  {
    slug: "frontend-contributor",
    title: "Frontend Contributor",
    department: "Engineering",
    commitment: "10h",
    description:
      "Build the public-facing Craftly website and internal tools using Next.js, TypeScript, and Tailwind CSS.",
    requirements: [
      "Experience with React and TypeScript",
      "Familiarity with Next.js App Router",
      "Comfortable with Tailwind CSS",
      "Located in a timezone with overlap to Bangladesh (UTC+6)",
    ],
  },
  {
    slug: "backend-contributor",
    title: "Backend Contributor",
    department: "Engineering",
    commitment: "10h",
    description:
      "Build the APIs and infrastructure that power Craftly's products and internal systems.",
    requirements: [
      "Experience with Node.js and TypeScript",
      "Familiarity with PostgreSQL or similar",
      "Understanding of REST and/or GraphQL APIs",
      "Comfortable with serverless architectures",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    commitment: "10h",
    description:
      "Own the deployment, monitoring, and reliability of Craftly's infrastructure.",
    requirements: [
      "Experience with CI/CD pipelines",
      "Familiarity with Vercel or similar platforms",
      "Understanding of Cloudflare or CDN configuration",
      "Comfortable with Docker and infrastructure-as-code",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    commitment: "10h",
    description:
      "Design intuitive, accessible, and beautiful interfaces for Craftly's products and website.",
    requirements: [
      "Portfolio showing product design work",
      "Familiarity with Figma",
      "Understanding of accessibility (WCAG)",
      "Comfortable designing in a design system",
    ],
  },
  {
    slug: "community-manager",
    title: "Community Manager",
    department: "Community",
    commitment: "10h",
    description:
      "Welcome new contributors, run community channels, and keep the ecosystem healthy.",
    requirements: [
      "Experience moderating online communities",
      "Strong written communication",
      "Empathy and patience for onboarding new contributors",
      "Comfortable with Discord, Slack, or similar",
    ],
  },
];

/**
 * Get a role by slug.
 */
export function getRoleBySlug(slug: string): ContributorRole | undefined {
  return roles.find((r) => r.slug === slug);
}

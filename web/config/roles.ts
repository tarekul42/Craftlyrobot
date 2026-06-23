import type { ContributorRole } from "@/types/content";

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
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer",
    department: "AI & ML",
    commitment: "10h",
    description:
      "Train and deploy language models for the Nuance engine and agent negotiation systems.",
    requirements: [
      "Experience with NLP and transformer architectures",
      "Familiarity with PyTorch or TensorFlow",
      "Understanding of model quantization and on-device deployment",
      "Comfortable with Python and TypeScript",
    ],
  },
  {
    slug: "nlp-specialist",
    title: "NLP Specialist",
    department: "AI & ML",
    commitment: "10h",
    description:
      "Build the language understanding pipeline for Bangla, English, and Banglish. Train intent classification and entity extraction models.",
    requirements: [
      "Experience with NLP pipelines and tokenization",
      "Familiarity with multilingual NLP challenges",
      "Understanding of intent classification and slot-filling",
      "Proficiency in Bangla and English",
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
    slug: "brand-designer",
    title: "Brand Designer",
    department: "Design",
    commitment: "5h",
    description:
      "Shape the Craftly brand identity across products, website, social media, and print materials.",
    requirements: [
      "Portfolio showing brand and visual identity work",
      "Strong typography and color theory skills",
      "Experience with brand guidelines and design systems",
      "Comfortable with Figma and Adobe Creative Suite",
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
  {
    slug: "onboarding-mentor",
    title: "Onboarding Mentor",
    department: "Community",
    commitment: "5h",
    description:
      "Guide new contributors through their 30-day onboarding ramp. Review first PRs and provide feedback.",
    requirements: [
      "Experience with the Craftly codebase or similar stack",
      "Patience and clarity in code review",
      "Ability to dedicate 5h/week to mentoring",
      "Previous open-source contribution experience preferred",
    ],
  },
  {
    slug: "technical-writer",
    title: "Technical Writer",
    department: "Content",
    commitment: "5h",
    description:
      "Write clear documentation, API references, and guides for Craftly's products and contributor onboarding.",
    requirements: [
      "Experience writing technical documentation",
      "Familiarity with Markdown and MDX",
      "Ability to explain complex concepts simply",
      "Comfortable working with developers to understand features",
    ],
  },
  {
    slug: "content-creator",
    title: "Content Creator",
    department: "Content",
    commitment: "5h",
    description:
      "Create social media content, blog posts, and video scripts about Craftly's journey and products.",
    requirements: [
      "Experience creating content for tech audiences",
      "Strong writing and storytelling skills",
      "Familiarity with social media platforms (Twitter, LinkedIn, YouTube)",
      "Comfortable with video scripting or basic video editing",
    ],
  },
];

export function getRoleBySlug(slug: string): ContributorRole | undefined {
  return roles.find((r) => r.slug === slug);
}

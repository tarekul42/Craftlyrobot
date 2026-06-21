import type { NavItem, NavItemWithChildren } from "@/types/navigation";

/**
 * Main navigation — the 5 top-level items shown in the header.
 * Based on the IA from the strategic audit.
 */
export const mainNav: NavItemWithChildren[] = [
  {
    title: "What is Craftly",
    href: "/what-is-craftly",
    description: "Understand the ecosystem",
  },
  {
    title: "Products",
    href: "/products",
    description: "What we build",
    children: [
      {
        title: "Craftly Robot",
        href: "/products/craftly-robot",
        description: "Build Android apps with one command",
      },
      {
        title: "Hello",
        href: "/products/hello",
        description: "The onboarding robot",
      },
      {
        title: "Workspace",
        href: "/products/workspace",
        description: "Decentralized collaboration",
      },
      {
        title: "Agent Console",
        href: "/products/agent-console",
        description: "Internal DevOps tool",
      },
    ],
  },
  {
    title: "Community",
    href: "/community",
    description: "Join the ecosystem",
    children: [
      {
        title: "Departments",
        href: "/community/departments",
        description: "How we organize",
      },
      {
        title: "Projects",
        href: "/community/projects",
        description: "What we're building",
      },
    ],
  },
  {
    title: "Contribute",
    href: "/contribute",
    description: "Join the team",
    children: [
      {
        title: "Open Roles",
        href: "/contribute/roles",
        description: "Find your fit",
      },
      {
        title: "Apply",
        href: "/contribute/apply",
        description: "Start your application",
      },
      {
        title: "Onboarding",
        href: "/contribute/onboarding",
        description: "What happens after you join",
      },
    ],
  },
  {
    title: "About",
    href: "/about",
    description: "The organization",
    children: [
      {
        title: "Leadership",
        href: "/about/leadership",
        description: "Who runs Craftly",
      },
      {
        title: "Governance",
        href: "/about/governance",
        description: "How decisions get made",
      },
      {
        title: "Contact",
        href: "/about/contact",
        description: "Get in touch",
      },
    ],
  },
];

/**
 * Footer navigation — 4 columns of links shown in the footer.
 */
export const footerNav: Record<string, NavItem[]> = {
  Products: [
    { title: "Craftly Robot", href: "/products/craftly-robot" },
    { title: "Hello", href: "/products/hello" },
    { title: "Workspace", href: "/products/workspace" },
    { title: "Agent Console", href: "/products/agent-console" },
  ],
  Community: [
    { title: "Departments", href: "/community/departments" },
    { title: "Projects", href: "/community/projects" },
    {
      title: "Facebook",
      href: "https://www.facebook.com/groups/peopleofcraftly",
      external: true,
    },
    {
      title: "YouTube",
      href: "https://www.youtube.com/@WasifbuildingCraftly",
      external: true,
    },
  ],
  Contribute: [
    { title: "Why Contribute", href: "/contribute" },
    { title: "Open Roles", href: "/contribute/roles" },
    { title: "Apply", href: "/contribute/apply" },
    { title: "Onboarding", href: "/contribute/onboarding" },
  ],
  About: [
    { title: "Leadership", href: "/about/leadership" },
    { title: "Governance", href: "/about/governance" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/about/contact" },
  ],
};

/**
 * Legal navigation — shown in the footer bottom bar.
 */
export const legalNav: NavItem[] = [
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
  { title: "Security", href: "/security" },
];

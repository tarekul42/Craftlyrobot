/**
 * Product — a Craftly product (e.g., Craftly Robot, Hello, Workspace).
 */
export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "coming-soon" | "internal";
  features?: string[];
  screenshots?: string[];
}

/**
 * Department — a persistent functional unit within Craftly.
 */
export interface Department {
  slug: string;
  name: string;
  lead?: string;
  contributorCount: number;
  focus: string;
  openings?: string[];
  currentProjects?: string[];
}

/**
 * ContributorRole — a role a contributor can hold.
 */
export interface ContributorRole {
  slug: string;
  title: string;
  department: string;
  commitment: "5h" | "10h" | "20h" | "fulltime";
  description: string;
  requirements: string[];
}

/**
 * FAQItem — a single Q&A for the FAQ section.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * CommunityStats — aggregate stats shown on the homepage.
 */
export interface CommunityStats {
  contributorsJoined: number;
  targetContributors: number;
  departments: number;
  activeProjects: number;
}

/**
 * Testimonial — a contributor or user testimonial.
 */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

/**
 * Project — an active or planned project at Craftly.
 */
export interface Project {
  slug: string;
  name: string;
  description: string;
  status: "active" | "planning" | "completed" | "on-hold";
  department: string;
  lead?: string;
  contributorCount: number;
  startDate: string;
  tags: string[];
  goals?: string[];
}

/**
 * BlogPost — frontmatter + content for an MDX blog post.
 */
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  coverAlt?: string;
  readingTime?: number;
  draft?: boolean;
  featured?: boolean;
  content: string;
}

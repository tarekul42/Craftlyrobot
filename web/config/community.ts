import type { CommunityStats } from "@/types/content";

/**
 * Community stats — shown on the homepage and /community page.
 *
 * Replace these with real numbers from the database when wired up.
 * For now, hardcoded based on Craftly's current scale.
 */
export const communityStats: CommunityStats = {
  contributorsJoined: 42,
  targetContributors: 76000,
  departments: 4,
  activeProjects: 6,
};

/**
 * Testimonials — shown on the /contribute page.
 */
import type { Testimonial } from "@/types/content";

export const testimonials: Testimonial[] = [
  {
    quote:
      "Joining Craftly was the best decision I made this year. I went from learning Next.js to shipping features that real users touch every week.",
    author: "Active contributor",
    role: "Engineering",
  },
  {
    quote:
      "The 30-day onboarding ramp actually works. By day 14 I had merged my first PR. By day 30 I had a mentor and a clear path forward.",
    author: "Recent onboarding grad",
    role: "Design",
  },
  {
    quote:
      "We're not trying to build another startup. We're trying to build Bangladesh's first real tech company. That mission pulls you in.",
    author: "Wasif",
    role: "Founder",
  },
];

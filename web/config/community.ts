import type { CommunityStats } from "@/types/content";

export const communityStats: CommunityStats = {
  contributorsJoined: 42,
  targetContributors: 76000,
  departments: 6,
  activeProjects: 8,
};

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
      "I used to work abroad. I came back to Dhaka because I wanted to build something here — something that proves Bangladesh can produce world-class technology. Craftly is that thing.",
    author: "Tarekul",
    role: "Co-Founder",
  },
  {
    quote:
      "We're not trying to build another startup. We're trying to build Bangladesh's first real tech company. That mission pulls you in.",
    author: "Wasif",
    role: "Founder",
  },
  {
    quote:
      "A blood donor match through an agent network sounds like sci-fi. I was there when it happened — it's real, and it saved someone's life.",
    author: "Community member",
    role: "Blood Donor Program",
  },
  {
    quote:
      "I typed 'amar ekta app lagbe' and it understood me. No translation, no confusion. That moment I knew this was different from anything else.",
    author: "Early access user",
    role: "Beta Tester",
  },
];

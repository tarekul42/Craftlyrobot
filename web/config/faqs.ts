import type { FAQItem } from "@/types/content";

/**
 * FAQ items — shown on the homepage and /contribute page.
 * Handles the most common objections and questions.
 */
export const homepageFaqs: FAQItem[] = [
  {
    question: "What is Craftly?",
    answer:
      "Craftly is a contributor-driven ecosystem building tools that turn ideas into shipped products. We're building from Bangladesh with global ambition.",
  },
  {
    question: "What is Craftly Robot?",
    answer:
      "Craftly Robot is our first product — software that builds Android apps pretty fast. You connect your Android phone via USB, tell our robot what to build, and done.",
  },
  {
    question: "Do I need to be in Bangladesh to contribute?",
    answer:
      "No. Craftly is headquartered in Bangladesh, but contributors are remote-first. We have active contributors across multiple time zones.",
  },
  {
    question: "How much time do I need to commit?",
    answer:
      "Most roles ask for 10 hours per week. Some roles allow as little as 5 hours, and there are full-time options. Check the role listing for specifics.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "We review applications weekly. If your application is a fit, we'll schedule a conversation, then start a structured 30-day onboarding ramp with a mentor and your first task.",
  },
  {
    question: "Is Craftly open source?",
    answer:
      "Some parts of Craftly are open source, others are not. We're working toward more openness as the ecosystem matures. Check the GitHub repo for what's currently public.",
  },
];

/**
 * Contribute-specific FAQs — shown on /contribute.
 */
export const contributeFaqs: FAQItem[] = [
  ...homepageFaqs,
  {
    question: "Do contributors get paid?",
    answer:
      "Craftly is currently contributor-driven and volunteer-based. As we generate revenue, we're building toward paid roles for sustained contributors. Equity conversations happen case-by-case.",
  },
  {
    question: "What skills are you looking for?",
    answer:
      "Frontend, backend, DevOps, design, community, and operations. If you can contribute in any of these areas, we want to hear from you.",
  },
  {
    question: "I'm a student. Can I still contribute?",
    answer:
      "Absolutely. Many of our contributors are students. We have roles at various commitment levels, and our mentorship program is designed to help you grow.",
  },
];

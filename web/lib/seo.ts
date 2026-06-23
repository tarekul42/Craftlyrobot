import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMeta {
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  publishedTime,
  authors,
  tags,
  noIndex,
}: PageMeta): Metadata {
  const fullTitle = `${title} · ${siteConfig.name}`;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: description ?? siteConfig.description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: description ?? siteConfig.description,
      url,
      siteName: siteConfig.name,
      type: publishedTime ? "article" : "website",
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
      ...(tags && { tags }),
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description ?? siteConfig.description,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon`,
    description: siteConfig.description,
    foundingDate: "2024",
    address: { "@type": "PostalAddress", addressCountry: "BD" },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "customer service",
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  Badge,
  SectionHeading,
} from "@/components/ui";
import { products, foundationProducts } from "@/config/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the products built by Craftly's contributor-driven ecosystem — Craftly Robot, Hello, Workspace, and Agent Console.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Craftly Products",
    description:
      "Tools built by Craftly's contributor-driven ecosystem. From Bangladesh, with ambition.",
  },
};

export default function ProductsPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Products"
        title="What we're building"
        description="Craftly is building tools that turn ideas into shipped software. Some are products for users, some are internal tools being battle-tested daily."
        primaryCta={{ label: "Get early access", href: "/contribute/apply" }}
      />

      {/* === All products grid === */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Catalog"
            title="All products"
            description="Status: coming-soon (in development), internal (being battle-tested), live (in production)."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Card key={product.slug} interactive className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge
                      variant={
                        product.status === "live"
                          ? "success"
                          : product.status === "coming-soon"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {product.status === "coming-soon"
                        ? "Coming soon"
                        : product.status === "internal"
                        ? "Internal"
                        : "Live"}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                  <p className="mt-1 text-sm italic text-muted-foreground">
                    {product.tagline}
                  </p>
                  <p className="mt-4 flex-1 text-sm text-foreground/80">
                    {product.description}
                  </p>
                  {product.features && product.features.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* === Foundation callout === */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="The foundation"
            title="Three products taught Craftly what it knows"
            description="Hello, Workspace, and Agent Console are the foundation. They generate the proprietary knowledge that powers Craftly Robot."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {foundationProducts.map((product) => (
              <Card key={product.slug}>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* === CTA === */}
      <CTABand
        title="Want to help build?"
        description="These products need contributors. Engineering, design, community, operations — there's a place for you."
        primaryCta={{ label: "See open roles", href: "/contribute/roles" }}
        secondaryCta={{ label: "Learn about Craftly", href: "/what-is-craftly" }}
      />
    </>
  );
}

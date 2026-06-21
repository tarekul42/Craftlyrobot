import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  HeroDefault,
  HeroCentered,
} from "@/components/sections/hero";
import { CTABand } from "@/components/sections/cta-band";
import {
  Badge,
  Card,
  CardContent,
  SectionHeading,
  Eyebrow,
} from "@/components/ui";
import { products, getProductBySlug, foundationProducts } from "@/config/products";

/**
 * Pre-render all product pages at build time.
 */
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/**
 * Generate per-product metadata.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${product.name} — Craftly`,
      description: product.tagline,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const statusLabel =
    product.status === "live"
      ? "Live"
      : product.status === "coming-soon"
      ? "Coming soon"
      : "Internal tool";

  const isFoundation = foundationProducts.some((p) => p.slug === product.slug);

  return (
    <>
      {/* Hero */}
      <HeroDefault
        eyebrow={isFoundation ? "Foundation product" : "Product"}
        title={product.name}
        subtitle={product.tagline}
        description={product.description}
        primaryCta={
          product.status === "live"
            ? { label: "Try it now", href: "#" }
            : { label: "Get early access", href: "/contribute/apply" }
        }
        secondaryCta={{ label: "See all products", href: "/products" }}
      />

      {/* Status banner */}
      <div className="border-b border-border bg-muted/30 py-3">
        <Container>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Badge
              variant={
                product.status === "live"
                  ? "success"
                  : product.status === "coming-soon"
                  ? "warning"
                  : "secondary"
              }
            >
              {statusLabel}
            </Badge>
            <span>
              {product.status === "live" &&
                "This product is live and in production."}
              {product.status === "coming-soon" &&
                "This product is in active development. Get early access to be notified when it launches."}
              {product.status === "internal" &&
                "This is an internal tool, being battle-tested daily. It powers Craftly's operations."}
            </span>
          </div>
        </Container>
      </div>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Features"
              title={`What ${product.name} does`}
              description="The capabilities that define this product."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {product.features.map((feature, i) => (
                <Card key={i}>
                  <CardContent className="flex items-start gap-3 p-6">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <p className="text-sm">{feature}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Foundation callout */}
      {isFoundation && (
        <Section background="muted">
          <Container size="narrow">
            <Eyebrow className="mb-4">The foundation</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight">
              How {product.name} fits into Craftly
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {product.name} is one of three foundation products that taught
              Craftly what it knows. Together, Hello, Workspace, and Agent
              Console generate the proprietary knowledge that powers Craftly
              Robot.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {foundationProducts.map((fp) => (
                <Link
                  key={fp.slug}
                  href={`/products/${fp.slug}`}
                  className={`rounded-lg border p-4 transition-all hover:shadow-md ${
                    fp.slug === product.slug
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-foreground/20"
                  }`}
                >
                  <h3 className="font-semibold">{fp.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {fp.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <CTABand
        title={`Want to help build ${product.name}?`}
        description="This product needs contributors. Join the team and help shape it."
        primaryCta={{ label: "See open roles", href: "/contribute/roles" }}
        secondaryCta={{ label: "Learn about Craftly", href: "/what-is-craftly" }}
      />
    </>
  );
}

import type { Metadata } from "next";

import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, SectionHeading } from "@/components/ui";
import { ProductCard } from "@/components/cards";
import { products, foundationProducts } from "@/config/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the products built by Craftly's contributor-driven ecosystem — Craftly Robot, Hello, Workspace, and Agent Console.",
  alternates: { canonical: "/products" },
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

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Catalog"
            title="All products"
            description="Status: coming-soon (in development), internal (being battle-tested), live (in production)."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>

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
                  <p className="text-muted-foreground mt-2 text-sm">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title="Want to help build?"
        description="These products need contributors. Engineering, design, community, operations — there's a place for you."
        primaryCta={{ label: "See open roles", href: "/contribute/roles" }}
        secondaryCta={{
          label: "Learn about Craftly",
          href: "/what-is-craftly",
        }}
      />
    </>
  );
}

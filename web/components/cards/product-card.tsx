import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import type { Product } from "@/types/content";

interface ProductCardProps {
  product: Product;
  showFeatures?: boolean;
  maxFeatures?: number;
}

/**
 * ProductCard — displays a product with status badge and optional features.
 * Extracted from /products page to avoid duplication.
 */
export function ProductCard({
  product,
  showFeatures = true,
  maxFeatures = 3,
}: ProductCardProps) {
  const statusLabel =
    product.status === "live"
      ? "Live"
      : product.status === "coming-soon"
        ? "Coming soon"
        : "Internal";

  const statusVariant =
    product.status === "live"
      ? "success"
      : product.status === "coming-soon"
        ? "warning"
        : "secondary";

  return (
    <Card interactive className="h-full">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>
        <h3 className="text-2xl font-semibold">{product.name}</h3>
        <p className="text-muted-foreground mt-1 text-sm italic">
          {product.tagline}
        </p>
        <p className="text-foreground/80 mt-4 flex-1 text-sm">
          {product.description}
        </p>
        {showFeatures && product.features && product.features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {product.features.slice(0, maxFeatures).map((feature, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start gap-2 text-sm"
              >
                <CheckCircle2 className="text-success mt-0.5 h-4 w-4 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <Link
          href={`/products/${product.slug}`}
          className="text-foreground mt-6 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}

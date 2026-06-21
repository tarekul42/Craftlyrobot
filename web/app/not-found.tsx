import Link from "next/link";
import { Button } from "@/components/ui";
import { Container } from "@/components/layout/container";

/**
 * Custom 404 page.
 * Renders when Next.js can't find a route, or when a page calls notFound().
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-logo text-9xl text-muted-foreground/20">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        This page drifted off the map
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/about/contact">Contact us</Link>
        </Button>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <Link href="/community" className="hover:text-foreground">
          Community
        </Link>
        <Link href="/contribute" className="hover:text-foreground">
          Contribute
        </Link>
        <Link href="/about" className="hover:text-foreground">
          About
        </Link>
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>
      </div>
    </Container>
  );
}

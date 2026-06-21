"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
}

interface MobileNavProps {
  items: NavItem[];
  logo?: React.ReactNode;
}

/**
 * MobileNav — slide-in mobile menu.
 * Triggered by hamburger button. Full-height panel from the right.
 */
function MobileNav({ items, logo }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        {logo && <div className="mb-6">{logo}</div>}
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-foreground hover:bg-muted rounded-md px-3 py-2 text-base font-medium transition-colors"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };

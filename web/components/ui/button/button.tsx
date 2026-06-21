import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Button — primary interactive element for actions (not navigation).
 * Use <Link> for navigation, <Button> for actions.
 *
 * @example
 * <Button>Get early free access</Button>
 * <Button variant="secondary">See the foundation</Button>
 * <Button asChild><Link href="/apply">Apply now</Link></Button>
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground border border-primary hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary/80",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(
            buttonVariants({ variant, size }),
            fullWidth && "w-full",
            className
          )}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

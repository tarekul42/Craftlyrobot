"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import { useTheme } from "next-themes";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

/**
 * Toaster — renders the toast container. Add this once in the root layout.
 *
 * @example
 * // app/layout.tsx
 * <body>
 *   {children}
 *   <Toaster />
 * </body>
 */
function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();
  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

/**
 * Toast — helper functions for showing toasts.
 *
 * @example
 * toast.success("Application submitted!");
 * toast.error("Something went wrong.");
 * toast.message("New message");
 */
export const toast = {
  success: sonnerToast.success,
  error: sonnerToast.error,
  message: sonnerToast.message,
  info: sonnerToast.info,
  warning: sonnerToast.warning,
  promise: sonnerToast.promise,
  loading: sonnerToast.loading,
  custom: sonnerToast.custom,
  dismiss: sonnerToast.dismiss,
};

export { Toaster };

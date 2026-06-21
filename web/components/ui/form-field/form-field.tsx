"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * FormField — wrapper that combines Label + Input + error message.
 * Handles aria-invalid, aria-describedby, and error styling.
 *
 * @example
 * <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
 *   <Input id="email" type="email" />
 * </FormField>
 */
function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor} className="flex items-center gap-1">
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </Label>
      {React.cloneElement(
        children as React.ReactElement,
        {
          id: htmlFor,
          "aria-invalid": !!error || undefined,
          "aria-required": required || undefined,
          "aria-describedby": describedBy,
          className: cn(
            ((children as React.ReactElement).props as Record<string, unknown>)
              .className as string | undefined,
            error && "border-destructive focus-visible:ring-destructive",
          ),
        } as Record<string, unknown>,
      )}
      {hint && !error && (
        <p id={hintId} className="text-muted-foreground text-xs">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-destructive text-xs">
          {error}
        </p>
      )}
    </div>
  );
}

export { FormField };

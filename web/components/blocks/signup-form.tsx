"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Button,
  FormField,
  Input,
  Card,
  CardContent,
} from "@/components/ui";
import { Turnstile } from "@/components/ui/turnstile/turnstile";
import { CheckCircle2, AlertCircle } from "lucide-react";

const signupSchema = z.object({
  phoneNumber: z
    .string()
    .min(8, "Please enter your WhatsApp number")
    .max(20, "Number is too long"),
  turnstileToken: z.string().min(1, "Please verify you're human"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  className?: string;
}

export function SignupForm({ className }: SignupFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: { phoneNumber: "", turnstileToken: "" },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(
          error.message ?? `Request failed with status ${res.status}`,
        );
      }

      setSubmitted(true);
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : "Something went wrong",
      );
    }
  };

  if (submitted) {
    return (
      <Card className={cn("border-success/30 bg-success/5", className)}>
        <CardContent className="flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="text-success h-12 w-12" />
          <h3 className="mt-4 text-xl font-bold">You&apos;re on the list</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            We&apos;ll WhatsApp you when Craftly Robot is ready. Keep an eye
            out.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
          aria-busy={form.formState.isSubmitting}
        >
          <FormField
            label="WhatsApp Number"
            htmlFor="phoneNumber"
            required
            error={form.formState.errors.phoneNumber?.message}
            hint="So that we can remind you when we release our product."
          >
            <Input
              {...form.register("phoneNumber")}
              placeholder="+880..."
              type="tel"
              autoComplete="tel"
            />
          </FormField>

          <div>
            <Turnstile
              onVerify={(token) =>
                form.setValue("turnstileToken", token, { shouldValidate: true })
              }
              onError={() => setSubmitError("Bot verification failed. Please try again.")}
              onExpire={() => form.setValue("turnstileToken", "")}
            />
            {form.formState.errors.turnstileToken && (
              <p role="alert" className="text-destructive mt-1 text-xs">
                {form.formState.errors.turnstileToken.message}
              </p>
            )}
          </div>

          {submitError && (
            <div
              role="alert"
              className="border-destructive/30 bg-destructive/5 text-destructive flex items-start gap-2 rounded-md border p-3 text-sm"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={form.formState.isSubmitting}
          >
            Start Crafting with Craftly
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import {
  Button,
  FormField,
  Input,
  Textarea,
  Card,
  CardContent,
} from "@/components/ui";
import { Turnstile } from "@/components/ui/turnstile/turnstile";

interface ContactFormProps {
  className?: string;
}

/**
 * ContactForm — for the /about/contact page.
 * Simpler than the apply form: name, email, subject, message.
 */
export function ContactForm({ className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      turnstileToken: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
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
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  if (submitted) {
    return (
      <Card className={cn("border-success/30 bg-success/5", className)}>
        <CardContent className="flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="text-success h-12 w-12" />
          <h3 className="mt-4 text-xl font-bold">Message sent</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            We&apos;ll get back to you within 2 business days.
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
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Name"
              htmlFor="name"
              required
              error={form.formState.errors.name?.message}
            >
              <Input
                {...form.register("name")}
                placeholder="Your name"
                autoComplete="name"
              />
            </FormField>

            <FormField
              label="Email"
              htmlFor="email"
              required
              error={form.formState.errors.email?.message}
            >
              <Input
                {...form.register("email")}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </FormField>
          </div>

          <FormField
            label="Subject"
            htmlFor="subject"
            required
            error={form.formState.errors.subject?.message}
          >
            <Input
              {...form.register("subject")}
              placeholder="What's this about?"
            />
          </FormField>

          <FormField
            label="Message"
            htmlFor="message"
            required
            error={form.formState.errors.message?.message}
            hint="20 characters minimum."
          >
            <Textarea
              {...form.register("message")}
              rows={6}
              placeholder="Your message..."
            />
          </FormField>

          <div>
            <Turnstile
              onVerify={(token) =>
                form.setValue("turnstileToken", token, { shouldValidate: true })
              }
              onError={() => setSubmitError("Bot verification failed.")}
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
            size="lg"
            fullWidth
            isLoading={form.formState.isSubmitting}
          >
            Send message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

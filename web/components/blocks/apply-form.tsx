"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  applySchema,
  type ApplyFormValues,
  roleOptions,
  departmentOptions,
  commitmentOptions,
  skillOptions,
} from "@/lib/validations/apply";
import {
  Button,
  FormField,
  Input,
  Textarea,
  Label,
  Checkbox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Card,
  CardContent,
} from "@/components/ui";
import { Turnstile } from "@/components/ui/turnstile/turnstile";

interface ApplyFormProps {
  className?: string;
}

/**
 * ApplyForm — the Craftly contributor application form.
 *
 * The most important conversion form on the site.
 * Uses React Hook Form + Zod for validation, Cloudflare Turnstile for bot protection.
 *
 * Submits to /api/apply.
 */
export function ApplyForm({ className }: ApplyFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      fullName: "",
      email: "",
      whatsapp: "",
      role: undefined,
      department: undefined,
      commitment: undefined,
      skills: [],
      portfolio: "",
      whyCraftly: "",
      turnstileToken: "",
    },
  });

  const onSubmit = async (values: ApplyFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(
          error.message ?? `Request failed with status ${res.status}`
        );
      }

      setSubmitted(true);
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    }
  };

  // === Success state ===
  if (submitted) {
    return (
      <Card className={cn("border-success/30 bg-success/5", className)}>
        <CardContent className="flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-success" />
          <h3 className="mt-4 text-xl font-bold">Application received</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            We&apos;ll review your application and reply within 7 days. Check
            your email (including spam folder) for a confirmation.
          </p>
        </CardContent>
      </Card>
    );
  }

  // === Form ===
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
          aria-busy={form.formState.isSubmitting}
        >
          {/* Personal info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Full name"
              htmlFor="fullName"
              required
              error={form.formState.errors.fullName?.message}
            >
              <Input
                {...form.register("fullName")}
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
            label="WhatsApp number"
            htmlFor="whatsapp"
            required
            error={form.formState.errors.whatsapp?.message}
            hint="So we can reach you quickly. Include country code."
          >
            <Input
              {...form.register("whatsapp")}
              placeholder="+880..."
              type="tel"
              autoComplete="tel"
            />
          </FormField>

          {/* Role + department */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Role you want"
              htmlFor="role"
              required
              error={form.formState.errors.role?.message}
            >
              <Select
                value={form.watch("role")}
                onValueChange={(v) =>
                  form.setValue("role", v as ApplyFormValues["role"], {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Department"
              htmlFor="department"
              required
              error={form.formState.errors.department?.message}
            >
              <Select
                value={form.watch("department")}
                onValueChange={(v) =>
                  form.setValue(
                    "department",
                    v as ApplyFormValues["department"],
                    { shouldValidate: true }
                  )
                }
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {/* Commitment */}
          <FormField
            label="Time commitment"
            htmlFor="commitment"
            required
            error={form.formState.errors.commitment?.message}
          >
            <Select
              value={form.watch("commitment")}
              onValueChange={(v) =>
                form.setValue(
                  "commitment",
                  v as ApplyFormValues["commitment"],
                  { shouldValidate: true }
                )
              }
            >
              <SelectTrigger id="commitment">
                <SelectValue placeholder="How much time can you give?" />
              </SelectTrigger>
              <SelectContent>
                {commitmentOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Skills */}
          <div className="space-y-2">
            <Label>
              Skills <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {skillOptions.map((skill) => {
                const checked = form.watch("skills").includes(skill);
                return (
                  <label
                    key={skill}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm transition-colors",
                      checked
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted"
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(val) => {
                        const current = form.getValues("skills");
                        if (val) {
                          form.setValue("skills", [...current, skill], {
                            shouldValidate: true,
                          });
                        } else {
                          form.setValue(
                            "skills",
                            current.filter((s) => s !== skill),
                            { shouldValidate: true }
                          );
                        }
                      }}
                    />
                    <span>{skill}</span>
                  </label>
                );
              })}
            </div>
            {form.formState.errors.skills && (
              <p role="alert" className="text-xs text-destructive">
                {form.formState.errors.skills.message}
              </p>
            )}
          </div>

          {/* Portfolio */}
          <FormField
            label="Portfolio / GitHub (optional)"
            htmlFor="portfolio"
            error={form.formState.errors.portfolio?.message}
            hint="Link to your work — GitHub, personal site, Behance, etc."
          >
            <Input
              {...form.register("portfolio")}
              placeholder="https://github.com/you"
              type="url"
            />
          </FormField>

          {/* Why Craftly */}
          <FormField
            label="Why do you want to join Craftly?"
            htmlFor="whyCraftly"
            required
            error={form.formState.errors.whyCraftly?.message}
            hint="50 characters minimum. Tell us what draws you to the project."
          >
            <Textarea
              {...form.register("whyCraftly")}
              rows={5}
              placeholder="I want to join because..."
            />
          </FormField>

          {/* Turnstile */}
          <div>
            <Label className="mb-2 block">Verification</Label>
            <Turnstile
              onVerify={(token) =>
                form.setValue("turnstileToken", token, { shouldValidate: true })
              }
              onError={() => setSubmitError("Bot verification failed. Please try again.")}
              onExpire={() => form.setValue("turnstileToken", "")}
            />
            {form.formState.errors.turnstileToken && (
              <p role="alert" className="mt-1 text-xs text-destructive">
                {form.formState.errors.turnstileToken.message}
              </p>
            )}
          </div>

          {/* Error message */}
          {submitError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            fullWidth
            isLoading={form.formState.isSubmitting}
          >
            Submit application
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            We review applications weekly. You&apos;ll hear back within 7 days.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
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

const steps = [
  { title: "Personal Info", fields: ["fullName", "email", "whatsapp"] as const },
  { title: "Role", fields: ["role", "department", "commitment"] as const },
  { title: "Skills", fields: ["skills", "portfolio"] as const },
  { title: "Why Craftly", fields: ["whyCraftly", "turnstileToken"] as const },
];

interface ApplyFormProps {
  className?: string;
}

export function ApplyForm({ className }: ApplyFormProps) {
  const [step, setStep] = useState(0);
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
    mode: "onTouched",
  });

  const validateStep = async () => {
    const fields = steps[step]?.fields;
    if (!fields) return false;
    const output = await form.trigger(fields as unknown as (keyof ApplyFormValues)[]);
    return output;
  };

  const handleNext = async () => {
    const valid = await validateStep();
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

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
          <h3 className="mt-4 text-xl font-bold">Application received</h3>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            We&apos;ll review your application and reply within 7 days. Check
            your email (including spam folder) for a confirmation.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
              Step {step + 1} of {steps.length}
            </span>
            <span className="text-muted-foreground text-xs tabular-nums">
              {Math.round(((step + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-foreground h-full rounded-full transition-all duration-300"
              style={{
                width: `${((step + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
          <h3 className="mt-3 text-lg font-semibold">{steps[step]?.title ?? ""}</h3>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          aria-busy={form.formState.isSubmitting}
        >
          {step === 0 && (
            <div className="space-y-4">
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

              <FormField
                label="WhatsApp number"
                htmlFor="whatsapp"
                required
                error={form.formState.errors.whatsapp?.message}
                hint="Include country code (e.g., +880...)"
              >
                <Input
                  {...form.register("whatsapp")}
                  placeholder="+880..."
                  type="tel"
                  autoComplete="tel"
                />
              </FormField>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
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
                      { shouldValidate: true },
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
                      { shouldValidate: true },
                    )
                  }
                >
                  <SelectTrigger id="commitment">
                    <SelectValue placeholder="How much time?" />
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
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
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
                            : "border-border hover:bg-muted",
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
                                { shouldValidate: true },
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
                  <p role="alert" className="text-destructive text-xs">
                    {form.formState.errors.skills.message}
                  </p>
                )}
              </div>

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
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <FormField
                label="Why do you want to join Craftly?"
                htmlFor="whyCraftly"
                required
                error={form.formState.errors.whyCraftly?.message}
                hint="50 characters minimum. Tell us what draws you."
              >
                <Textarea
                  {...form.register("whyCraftly")}
                  rows={5}
                  placeholder="I want to join because..."
                />
              </FormField>

              <div>
                <Label className="mb-2 block">Verification</Label>
                <Turnstile
                  onVerify={(token) =>
                    form.setValue("turnstileToken", token, {
                      shouldValidate: true,
                    })
                  }
                  onError={() =>
                    setSubmitError(
                      "Bot verification failed. Please try again.",
                    )
                  }
                  onExpire={() => form.setValue("turnstileToken", "")}
                />
                {form.formState.errors.turnstileToken && (
                  <p role="alert" className="text-destructive mt-1 text-xs">
                    {form.formState.errors.turnstileToken.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {submitError && (
            <div
              role="alert"
              className="border-destructive/30 bg-destructive/5 text-destructive mt-4 flex items-start gap-2 rounded-md border p-3 text-sm"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div>
              {step > 0 && (
                <Button type="button" variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
            {step < steps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                isLoading={form.formState.isSubmitting}
              >
                Submit application
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

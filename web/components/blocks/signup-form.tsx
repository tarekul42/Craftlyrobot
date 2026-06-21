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
  UploadButton,
  Card,
  CardContent,
} from "@/components/ui";
import { CheckCircle2 } from "lucide-react";

const signupSchema = z.object({
  phoneNumber: z
    .string()
    .min(8, "Please enter your WhatsApp number")
    .max(20, "Number is too long"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  className?: string;
}

/**
 * SignupForm — early access form (WhatsApp number + screenshot proof).
 * Pattern preserved from craftlyrobot.com's #early-access section.
 *
 * Submits to /api/early-access (wire up when backend is ready).
 */
export function SignupForm({ className }: SignupFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { phoneNumber: "" },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setSubmitError(null);
    try {
      // Wire to /api/early-access when backend is ready
      await new Promise((r) => setTimeout(r, 800));
      console.log("Signup:", values);
      setSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong");
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
            <p className="mb-2 text-sm font-medium">Proof screenshot</p>
            <UploadButton
              accept="image/png,image/jpeg,image/webp"
              label="Upload Screenshot"
            />
          </div>

          {submitError && (
            <p role="alert" className="text-destructive text-sm">
              {submitError}
            </p>
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

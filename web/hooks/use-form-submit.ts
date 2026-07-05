"use client";

import { useState, useCallback } from "react";

interface UseFormSubmitOptions {
  url: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  mapError?: (status: number, body: unknown) => string;
}

interface UseFormSubmitReturn {
  submit: (values: unknown) => Promise<void>;
  submitted: boolean;
  submitError: string | null;
  isSubmitting: boolean;
}

export function useFormSubmit({
  url,
  onSuccess,
  onError,
  mapError,
}: UseFormSubmitOptions): UseFormSubmitReturn {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(
    async (values: unknown) => {
      setSubmitError(null);
      setIsSubmitting(true);
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const message = mapError
            ? mapError(res.status, body)
            : (((body as Record<string, unknown>)?.message as string) ??
              `Request failed with status ${res.status}`);
          throw new Error(message);
        }

        setSubmitted(true);
        onSuccess?.();
      } catch (e) {
        const message =
          e instanceof Error
            ? e.message
            : "Something went wrong. Please try again.";
        setSubmitError(message);
        onError?.(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [url, onSuccess, onError, mapError],
  );

  return { submit, submitted, submitError, isSubmitting };
}

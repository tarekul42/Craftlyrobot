"use client";

import { useState } from "react";
import { FileText, MessageCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card/card";
import { Button } from "@/components/ui/button/button";
import { Eyebrow } from "@/components/ui/eyebrow/eyebrow";
import { ApplyForm } from "@/components/blocks/apply-form";
import { ApplyChat } from "@/components/blocks/apply-chat";

type ApplyMode = "choose" | "form" | "chat";

export function ApplyPageClient() {
  const [mode, setMode] = useState<ApplyMode>("choose");

  const heroForm =
    mode === "form" ? (
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMode("choose")}
          className="mb-4"
        >
          ← Back to path selection
        </Button>
        <ApplyForm />
      </div>
    ) : mode === "chat" ? (
      <div className="flex h-full flex-col">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMode("choose")}
          className="mb-4 self-start"
        >
          ← Back to path selection
        </Button>
        <ApplyChat className="min-h-[500px] flex-1" />
      </div>
    ) : (
      <div className="flex flex-col gap-4">
        <Card
          interactive
          className="cursor-pointer"
          onClick={() => setMode("form")}
        >
          <CardContent className="flex items-start gap-4 p-6">
            <div className="bg-muted text-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-md">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Apply via form</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                Fill out a structured application with guided steps. Takes
                about 10 minutes.
              </p>
              <span className="text-foreground mt-2 inline-flex items-center gap-1 text-sm font-medium hover:underline">
                Start form <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card
          interactive
          className="cursor-pointer"
          onClick={() => setMode("chat")}
        >
          <CardContent className="flex items-start gap-4 p-6">
            <div className="bg-muted text-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-md">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Chat with Hello</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                Have a conversation with our onboarding robot. Quick and
                casual.
              </p>
              <span className="text-foreground mt-2 inline-flex items-center gap-1 text-sm font-medium hover:underline">
                Start chat <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <section className="border-border border-b">
      <Container>
        <div className="grid gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-32">
          <div className="flex flex-col justify-center">
            <Eyebrow className="mb-4">Apply</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Apply to Craftly
            </h1>
            <p className="text-foreground/80 mt-6 max-w-prose text-lg leading-relaxed">
              Tell us about yourself. We review every application weekly and
              respond within 7 days.
            </p>
          </div>
          <div className="flex items-center justify-center">
            {heroForm}
          </div>
        </div>
      </Container>
    </section>
  );
}

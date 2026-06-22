"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card/card";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const initialMessages: Message[] = [
  {
    role: "bot",
    text: "Hey! I'm Hello, the onboarding robot. 👋 I'll help you figure out if Craftly is a good fit. What's your name?",
  },
];

const responses = {
  default:
    "Thanks! That helps. What kind of work excites you most — engineering, design, community, or operations?",
  engineering:
    "Awesome! We have frontend, backend, and DevOps roles. Do you have a preference?",
  design:
    "Great! We're looking for product designers who can own end-to-end UX. Do you have experience with Figma?",
  community:
    "Love it! Community is the heart of Craftly. Are you more into events, content, or direct member support?",
  operations:
    "Nice! Ops keeps everything running. Are you interested in project management, coordination, or both?",
  yes: "That's great! How much time can you commit per week — 5h, 10h, 20h, or full-time?",
  no: "No worries at all! You can learn on the job. How much time can you commit per week?",
} as const;

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("engineer") || lower.includes("code") || lower.includes("build")) {
    return responses.engineering;
  }
  if (lower.includes("design") || lower.includes("figma") || lower.includes("ux")) {
    return responses.design;
  }
  if (lower.includes("community") || lower.includes("people") || lower.includes("event")) {
    return responses.community;
  }
  if (lower.includes("ops") || lower.includes("operation") || lower.includes("manage")) {
    return responses.operations;
  }
  if (lower.includes("yes") || lower.includes("yeah") || lower.includes("sure") || lower.includes("experience")) {
    return responses.yes;
  }
  if (lower.includes("no") || lower.includes("not really") || lower.includes("none")) {
    return responses.no;
  }
  if (lower.includes("5") || lower.includes("10") || lower.includes("20") || lower.includes("full")) {
    return "Perfect! That works. Would you like me to send you to the formal application so we can get you started?";
  }
  if (lower.includes("thank") || lower.includes("bye") || lower.includes("done")) {
    return "You're welcome! Head over to the formal application to complete the process. We'll review and get back to you within 7 days!";
  }
  return responses.default;
}

interface ApplyChatProps {
  className?: string;
}

export function ApplyChat({ className }: ApplyChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const reply = getBotResponse(text);
    setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className={cn("flex flex-col", className)}>
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <Bot className="text-muted-foreground h-5 w-5" />
        <div>
          <span className="text-sm font-medium">Hello</span>
          <span className="text-muted-foreground ml-2 text-xs">
            Onboarding robot
          </span>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-0">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-2",
                msg.role === "user" && "flex-row-reverse",
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  msg.role === "bot" ? "bg-muted" : "bg-primary text-primary-foreground",
                )}
              >
                {msg.role === "bot" ? (
                  <Bot className="h-3.5 w-3.5" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                  msg.role === "bot"
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground",
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-2">
              <div className="bg-muted flex h-7 w-7 items-center justify-center rounded-full">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="border-border flex items-center gap-2 border-t p-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your reply..."
            className="min-h-0"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

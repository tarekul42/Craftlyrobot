import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "edge";

export async function GET(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  const limit = await rateLimit(`og:${ip}`, {
    limit: 60,
    windowMs: 60 * 1000,
  });
  if (!limit.success) {
    return new Response("Too many requests", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) },
    });
  }

  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? siteConfig.name).slice(0, 120);
  const subtitle = (searchParams.get("subtitle") ?? "").slice(0, 200);
  const eyebrow = (searchParams.get("eyebrow") ?? "").slice(0, 60);

  try {
    return new ImageResponse(
      <div
        style={{
          background: "linear-gradient(135deg, #0b0b0c 0%, #1a1a1a 100%)",
          color: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 80,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {eyebrow && (
          <div
            style={{
              fontSize: 24,
              color: "#686868",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            fontSize: title.length > 40 ? 56 : 72,
            fontWeight: 700,
            lineHeight: 1.0,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 32,
              color: "#dedbd6",
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            fontSize: 36,
            color: "#686868",
            fontFamily: "ui-serif, Georgia, serif",
          }}
        >
          Craftly
        </div>
      </div>,
      { width: 1200, height: 630 },
    );
  } catch {
    return new Response("Failed to generate image", { status: 500 });
  }
}

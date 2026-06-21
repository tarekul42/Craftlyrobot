import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Dynamic OG image generator — served at /api/og.
 *
 * Usage in metadata:
 *   openGraph: {
 *     images: [{ url: "/api/og?title=About&subtitle=Craftly" }]
 *   }
 *
 * Query params:
 *   title (required) — main headline
 *   subtitle (optional) — smaller text below
 *   eyebrow (optional) — uppercase label above
 */
export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? siteConfig.name;
  const subtitle = searchParams.get("subtitle") ?? "";
  const eyebrow = searchParams.get("eyebrow") ?? "";

  return new ImageResponse(
    (
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
          fontFamily: "sans-serif",
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
            display: "flex",
            flexWrap: "wrap",
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
              display: "flex",
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
            fontFamily: "cursive",
            display: "flex",
          }}
        >
          Craftly
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

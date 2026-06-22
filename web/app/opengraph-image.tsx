import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.description;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        fontFamily: "sans-serif",
      }}
    >
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
        Craftly Robot
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.0,
          maxWidth: 1000,
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          fontSize: 32,
          color: "#dedbd6",
          marginTop: 24,
          maxWidth: 900,
        }}
      >
        {siteConfig.description}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 80,
          fontSize: 36,
          color: "#686868",
          fontFamily: "cursive",
        }}
      >
        {siteConfig.name}
      </div>
    </div>,
    { ...size },
  );
}

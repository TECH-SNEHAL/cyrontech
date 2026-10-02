import { ImageResponse } from "next/og";

export const alt = "Vijay Snehal — Full-stack developer at Cyron Tech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0f",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(circle at 85% 75%, rgba(59,130,246,0.3), transparent 55%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Full-stack developer · Cyron Tech
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 108,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          Vijay Snehal
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 860,
          }}
        >
          Websites, mobile apps, CRMs, and automation built around how a
          business actually works.
        </div>
      </div>
    ),
    size
  );
}

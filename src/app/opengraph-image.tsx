import { ImageResponse } from "next/og";

export const alt =
  "Cyron Tech — Software Development Agency";
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
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
            Cyron Tech
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          Software built around your business, not ours
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 820,
          }}
        >
          Websites, apps, CRMs, and automation.
        </div>
      </div>
    ),
    size
  );
}

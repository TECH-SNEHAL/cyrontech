import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 100,
          color: "#ffffff",
        }}
      >
        C
      </div>
    ),
    size
  );
}

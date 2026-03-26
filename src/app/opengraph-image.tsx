import { ImageResponse } from "next/og";

export const alt = "kanshoku";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 15% 20%, #34d399 0%, #111827 38%, #020617 100%)",
          color: "#ecfeff",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            letterSpacing: "-0.02em",
          }}
        >
          kanshoku
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              maxWidth: 1000,
            }}
          >
            Frontend Notes and Experiments
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              opacity: 0.9,
              letterSpacing: "-0.01em",
            }}
          >
            Building with React, TypeScript, and Next.js
          </div>
        </div>
      </div>
    ),
    size,
  );
}

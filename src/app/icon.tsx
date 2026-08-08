import { ImageResponse } from "next/og";

// Generates a PNG favicon via Next.js's built-in image renderer (Satori) —
// no external image tools required. PNG rather than SVG deliberately: SVG
// favicons render inconsistently across browsers (Safari in particular),
// PNG is the universally safe format. Same two-triangle mark as
// components/signature/Logo.tsx, drawn here with the CSS border-triangle
// trick since Satori's shape/clip-path support is limited.

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "13px solid transparent",
            borderRight: "13px solid transparent",
            borderBottom: "13px solid #8A5A34",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "13px solid transparent",
            borderRight: "13px solid transparent",
            borderTop: "13px solid #378ADD",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

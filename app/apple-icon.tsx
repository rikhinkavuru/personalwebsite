import { ImageResponse } from "next/og";
import { colors } from "@/lib/site";

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
          background: colors.ink,
          color: colors.bg,
          fontSize: 108,
          fontWeight: 500,
          letterSpacing: -4,
          position: "relative",
        }}
      >
        R
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            width: 30,
            height: 8,
            background: colors.accent,
          }}
        />
      </div>
    ),
    size,
  );
}

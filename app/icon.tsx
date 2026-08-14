import { ImageResponse } from "next/og";
import { colors } from "@/lib/site";

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
          alignItems: "center",
          justifyContent: "center",
          background: colors.ink,
          color: colors.bg,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: -1,
          position: "relative",
        }}
      >
        R
        <div
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            width: 6,
            height: 2,
            background: colors.accent,
          }}
        />
      </div>
    ),
    size,
  );
}

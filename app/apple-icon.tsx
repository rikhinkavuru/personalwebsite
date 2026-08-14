import { ImageResponse } from "next/og";
import { colors } from "@/lib/site";
import { logoAspect, logoDataUri } from "@/lib/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const height = 116;

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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUri(colors.bg)}
          width={Math.round(height * logoAspect)}
          height={height}
          alt=""
        />
      </div>
    ),
    size,
  );
}

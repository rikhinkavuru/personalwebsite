import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";
import { logoAspect, logoDataUri } from "@/lib/logo";
import { colors, siteDescription } from "@/lib/site";

export const alt = "Rikhin Kavuru — machine learning for biology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: colors.bg,
          color: colors.ink,
          padding: "80px 96px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUri(colors.ink)}
            width={Math.round(64 * logoAspect)}
            height={64}
            alt=""
          />
          <div style={{ display: "flex", fontSize: 28, color: colors.muted }}>
            {profile.handle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: -4,
            }}
          >
            {profile.fullName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.4,
              color: colors.muted,
              marginTop: 20,
              maxWidth: 900,
            }}
          >
            {siteDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: colors.muted,
            borderTop: `1px solid ${colors.border}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>Fort Wayne, Indiana</div>
        </div>
      </div>
    ),
    size,
  );
}

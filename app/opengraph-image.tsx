import { ImageResponse } from "next/og";
import { colors } from "@/lib/site";
import { profile } from "@/lib/content";
import { logoAspect, logoDataUri } from "@/lib/logo";

export const alt = "Rikhin Kavuru — machine learning and computational biology";
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
          padding: "72px 96px",
          position: "relative",
        }}
      >
        {/* Column rules, same device as the site */}
        <div
          style={{
            position: "absolute",
            left: 48,
            top: 0,
            bottom: 0,
            width: 1,
            background: colors.rule,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 48,
            top: 0,
            bottom: 0,
            width: 1,
            background: colors.rule,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUri(colors.ink)}
            width={Math.round(72 * logoAspect)}
            height={72}
            alt=""
          />
          <div style={{ display: "flex", fontSize: 26, color: colors.muted }}>
            {profile.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, letterSpacing: -3 }}>
            <span>{profile.firstName}</span>
            <span style={{ color: colors.muted, marginLeft: 24 }}>
              {profile.lastName}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: colors.muted,
              marginTop: 24,
            }}
          >
            <span>Interested in</span>
            <span style={{ color: colors.accent, marginLeft: 10 }}>
              {profile.interests[0]}
            </span>
            <span style={{ marginLeft: 10 }}>and</span>
            <span style={{ color: colors.accent, marginLeft: 10 }}>
              {profile.interests[1]}
            </span>
            <span>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: colors.muted,
            borderTop: `1px solid ${colors.rule}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>
            <span>{profile.handle}</span>
            <span style={{ color: colors.accent }}>_</span>
          </div>
          <div style={{ display: "flex" }}>Convexia · Broad Institute</div>
        </div>
      </div>
    ),
    size,
  );
}

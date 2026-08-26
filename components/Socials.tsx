import { profile } from "@/lib/content";
import {
  ArrowIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "./icons";
import NowPlaying from "./NowPlaying";
import {
  GitHubCard,
  HoverCard,
  InstagramCard,
  LinkedInCard,
  XCard,
} from "./SocialCard";

const iconClass =
  "relative inline-flex size-9 items-center justify-center rounded-xl bg-foreground text-primary transition-colors hover:bg-primary hover:text-bg";

/**
 * Primary CTA, icon links, then the now-playing equaliser on the same line.
 *
 * The CTA is "Let's chat!" pointing at `profile.bookingUrl`; its arrow sits
 * at northeast and swings to east on hover. Instagram always renders,
 * becoming a link once its URL is set.
 */
export default function Socials() {

  return (
    <div className="relative flex flex-wrap items-center gap-2">
      <a
        href={profile.bookingUrl}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-sm font-medium text-bg transition-opacity hover:opacity-80"
      >
        Let&rsquo;s chat!
        <ArrowIcon className="size-3.5 -rotate-45 transition-transform duration-300 ease-out group-hover:rotate-0" />
      </a>

      <HoverCard card={<InstagramCard />}>
        <a
          href={profile.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className={iconClass}
        >
          <InstagramIcon />
        </a>
      </HoverCard>

      <HoverCard card={<LinkedInCard />}>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className={iconClass}
        >
          <LinkedInIcon />
        </a>
      </HoverCard>

      {profile.twitter && (
        <HoverCard card={<XCard />}>
          <a
            href={profile.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className={iconClass}
          >
            <XIcon />
          </a>
        </HoverCard>
      )}

      <HoverCard card={<GitHubCard />}>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className={iconClass}
        >
          <GitHubIcon />
        </a>
      </HoverCard>

      <NowPlaying className="ml-1" />
    </div>
  );
}

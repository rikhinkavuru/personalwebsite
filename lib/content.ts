export const profile = {
  firstName: "Rikhin",
  lastName: "Kavuru",
  fullName: "Rikhin Kavuru",
  handle: "@rikhin.kavuru",
  avatar: "/avatar.webp",
  email: "rikhin@virahacks.com",
  github: "https://github.com/rikhinkavuru",
  linkedin: "https://www.linkedin.com/in/rikhin-kavuru-29sb0926/",
  /** Set to your profile URL to show the Instagram icon. */
  instagram: "https://www.instagram.com/rikhin.kavuru/",
  twitter: "https://x.com/rikhinkavuru",
  /** Set to a cal.com or Calendly URL to enable the "Book a call" button. */
  bookingUrl: "https://cal.com/rikhinkavuru/30min",
};

/**
 * Inline company/product marks used in prose and list rows. `src` points at a
 * file in /public/logos. Anything missing falls back to a lettered tile.
 */
export type Mark = {
  src?: string;
  /** Swapped in under dark mode, for marks that would otherwise disappear. */
  srcDark?: string;
  /** Brand colour the label tints to on hover, matching kominko's inline marks. */
  tint?: string;
  /** Background for the fallback lettered tile. */
  fallbackBg?: string;
};

export const marks: Record<string, Mark> = {
  convexia: { src: "/logos/convexia.webp", tint: "#12b866", fallbackBg: "#0a0c0b" },
  broad: { src: "/logos/broad.webp", tint: "#006ab2", fallbackBg: "#006ab2" },
  thinkneuro: { src: "/logos/thinkneuro.webp", tint: "#1c3e5a", fallbackBg: "#cad5eb" },
  purdue: { src: "/logos/purdue.webp", tint: "#9d7f3d", fallbackBg: "#c7b28a" },
  telo: { src: "/logos/telo.webp", tint: "#111111", fallbackBg: "#111111" },
  /** Transparent-background mark, for setting inline on a white page. */
  teloMark: {
    src: "/logos/telo-mark.webp",
    srcDark: "/logos/telo-mark-dark.webp",
    tint: "#111111",
    fallbackBg: "#111111",
  },
  rkfantasy: { src: "/logos/rkfantasy.webp", tint: "#1f5c2e", fallbackBg: "#1f5c2e" },
  linkd: { src: "/logos/linkd.webp", tint: "#d32b25", fallbackBg: "#eaddcb" },
  virahacks: { src: "/logos/virahacks.webp", tint: "#17843f", fallbackBg: "#17843f" },
  calma: { src: "/logos/calma.webp", tint: "#d98b45", fallbackBg: "#192826" },
  auteur: { src: "/logos/auteur.webp", tint: "#0b2a6b", fallbackBg: "#0b2a6b" },
  spocal: { src: "/logos/spocal.webp", tint: "#a8791a", fallbackBg: "#fae28a" },
};

/**
 * Postcards embedded inline in the bio sentence. Clicking one opens the
 * full-bleed modal. `thumb` is the tiny inline crop, `full` the modal image.
 */
export type Postcard = {
  id: string;
  thumb: string;
  full: string;
  /** Screen-reader label and modal aria-label. */
  alt: string;
  /** Caption shown bottom-left of the modal. */
  caption: string;
  /** Camera metadata shown bottom-right. Optional. */
  exif?: string;
  /** Inline tilt, in degrees. */
  rotate: number;
};

export const postcards: Record<string, Postcard> = {
  home: {
    id: "home",
    thumb: "/postcards/fort-wayne-thumb.webp",
    full: "/postcards/fort-wayne.webp",
    alt: "Southern shore of Lake Michigan, Indiana",
    caption: "Southern shore of Lake Michigan, Indiana",
    exif: "Shot on \uf8ff iPhone 16 Pro · 24mm · ƒ/1.8 · ISO 50 · 1/1385s",
    rotate: -4,
  },
  sf: {
    id: "sf",
    thumb: "/postcards/sf-thumb.webp",
    full: "/postcards/sf.webp",
    alt: "San Francisco Bay",
    caption: "Looking out over the Bay, San Francisco",
    exif: "",
    rotate: 3,
  },
};

/**
 * Hardcoded now-playing track. /api/spotify overrides this at runtime once
 * credentials exist; until then the card shows this.
 */
export const nowPlaying = {
  title: "When the Sun Hits",
  artist: "Slowdive",
  album: "Souvlaki",
  art: "/music/when-the-sun-hits.webp",
  url: "https://open.spotify.com/track/0oxYB9GoOIDrdzniNdKC44",
};

/**
 * Data for the hover preview cards on the social icons.
 *
 * GitHub's numbers come from its public API and are real. Instagram and
 * LinkedIn expose no public API, so their stats are left blank on purpose —
 * fill them in and the card grows the extra row, otherwise it renders without
 * one rather than showing invented counts.
 */
export const socialCards = {
  github: {
    handle: "rikhinkavuru",
    name: "17 | cbio research @broadinstitute",
    avatar: "/social/github-avatar.webp",
    followers: 4,
    following: 1,
    repos: 25,
  },
  instagram: {
    handle: "rikhin.kavuru",
    name: "Rikhin Kavuru",
    avatar: "/avatar.webp",
    /** Fill these in to show the posts/followers/following row. */
    posts: null as number | null,
    followers: null as number | null,
    following: null as number | null,
  },
  linkedin: {
    name: "Rikhin Kavuru",
    headline: "Machine Learning Engineer at Convexia",
    location: "Fort Wayne, Indiana",
    avatar: "/social/x-avatar.webp",
    /** Fill in to show "· 500+ connections". */
    connections: null as string | null,
  },
  x: {
    handle: "rikhinkavuru",
    name: "Rikhin Kavuru",
    bio: "ml for biology. building Telo.",
    avatar: "/social/x-avatar.webp",
    /** Fill in to show the followers/following row. */
    followers: null as number | null,
    following: null as number | null,
  },
};

export type Experience = {
  org: string;
  role: string;
  detail: string;
  when: string;
  mark?: keyof typeof marks;
  href?: string;
  current?: boolean;
};

export const experience: Experience[] = [
  {
    org: "Convexia",
    href: "https://www.convexia.bio/",
    role: "Machine Learning Engineer",
    detail: "Models that predict clinical trial success for drug assets.",
    when: "Current",
    mark: "convexia",
    current: true,
  },
  {
    org: "Broad Institute of MIT and Harvard",
    href: "https://www.broadinstitute.org/",
    role: "Machine Learning Research Intern",
    detail: "Machine learning methods for drug design and phylogenetics.",
    when: "Current",
    mark: "broad",
    current: true,
  },
  {
    org: "ThinkNeuro",
    href: "https://www.thinkneuro.org/",
    role: "Research Intern, Summer Research Intensive",
    detail:
      "Bibliometric audit of 100 top-cited studies of drug delivery across the blood-brain barrier. Poster at MIT URTC.",
    when: "2026",
    mark: "thinkneuro",
  },
  {
    org: "Purdue University Fort Wayne",
    href: "https://www.pfw.edu/",
    role: "Computational Biochemistry Researcher",
    detail: "Virtual screening and molecular docking against STAT3.",
    when: "2024-25",
    mark: "purdue",
  },
];

export type Project = {
  slug: string;
  name: string;
  detail: string;
  role: string;
  when: string;
  href?: string;
  mark?: keyof typeof marks;
  /** Screenshots for the justified gallery. Empty renders the row without one. */
  shots?: { src: string; alt: string; width: number; height: number }[];
  /** Sentence or two shown beside the artwork in the lightbox. */
  blurb?: string;
  /** Credits shown under the title, for work with more than one author. */
  team?: { name: string; href?: string }[];
  /** Must match the artwork's own background so the two blend seamlessly. */
  cardBg?: string;
  /** Set when cardBg is dark enough to need light text. */
  cardDark?: boolean;
  current?: boolean;
};

export const projects: Project[] = [
  {
    slug: "virahacks",
    name: "ViraHacks",
    detail: "Healthcare hackathons across 20+ chapters and 1,100+ students.",
    role: "President and CEO",
    when: "Current",
    href: "https://virahacks.com",
    mark: "virahacks",
    current: true,
    shots: [{ src: "/projects/virahacks.webp", alt: "ViraHacks", width: 1800, height: 1113 }],
    blurb:
      "A hackathon network for high schoolers: real venues, mentors, judges, and healthcare problems worth solving, all run by students.",
    cardBg: "#f5f1ee",
  },
  {
    slug: "telo",
    name: "Telo",
    detail: "Decentralized plants making shortage-critical sterile injectables.",
    role: "Co-founder",
    when: "Current",
    mark: "telo",
    current: true,
    shots: [{ src: "/projects/telo.webp", alt: "Telo", width: 1600, height: 900 }],
    team: [
      { name: "Rikhin Kavuru" },
      {
        name: "Barry Abejide",
        href: "https://www.linkedin.com/in/mobareji-abejide-417319336/",
      },
      { name: "Arnay Garhyan", href: "https://www.linkedin.com/in/arnay-g/" },
    ],
    blurb:
      "Autonomous microfactories for drug manufacturing. Biological foundation models trained on pre-clinical data forecast human clinical response, surfacing shelved drugs worth reviving. We manufacture them at decentralized plants on an AI-native pharma OS that already beats state-of-the-art benchmarks, going after the shortages and centralization that keep pharma slow.",
    cardBg: "#17171a",
    cardDark: true,
  },
  {
    slug: "rkfantasy",
    name: "RKFantasy",
    detail: "Fantasy football rankings and start/sit in your league's exact scoring.",
    role: "Developer",
    when: "2026",
    href: "https://rkfantasy.com",
    mark: "rkfantasy",
    current: true,
    shots: [{ src: "/projects/rkfantasy.webp", alt: "RKFantasy", width: 1536, height: 1350 }],
    blurb:
      "Connect a Sleeper or ESPN league and get rankings, start/sit calls, waiver bids and trade grades in your exact scoring, with the uncertainty shown instead of hidden. Backtested on 2023 to 2025, it beats the expert consensus at QB, RB, WR and TE.",
    cardBg: "#1f5c2e",
    cardDark: true,
  },
  {
    slug: "linkd",
    name: "Linkd",
    detail: "Daily word chain game. 45K+ daily players.",
    role: "Developer",
    when: "2025",
    href: "https://linkddaily.com",
    mark: "linkd",
    shots: [{ src: "/projects/linkd.webp", alt: "Linkd", width: 1202, height: 900 }],
    blurb:
      "A daily word chain game with 45,000+ daily players. Six to ten words, each pair forming a real compound or common phrase.",
    cardBg: "#d32b25",
    cardDark: true,
  },
  {
    slug: "calma",
    name: "Calma",
    detail: "Independent verification lab for deterministic code in finance.",
    role: "Founder",
    when: "2025",
    href: "https://github.com/rikhinkavuru/calma",
    mark: "calma",
  },
  {
    slug: "auteur",
    name: "Auteur",
    detail: "AI copilot for After Effects. Won the Congressional App Challenge.",
    role: "Developer",
    when: "2025",
    href: "https://www.congressionalappchallenge.us/25-in03/",
    mark: "auteur",
  },
  {
    slug: "spocal",
    name: "Spocal",
    detail: "Transformer-based speech fluency scoring. Diamond Challenge finalist.",
    role: "Developer",
    when: "2024",
    mark: "spocal",
  },
];

export type Paper = {
  venue: string;
  track: string;
  title: string;
  note?: string;
  /** PDF under /public/papers, opened in the in-page reader. */
  pdf?: string;
  /** Rendered first page, shown as the row's preview. */
  thumb?: string;
};

export const research: Paper[] = [
  {
    venue: "IEEE BIBM 2026",
    track: "Regular paper",
    title:
      "Three Routes to Failure: An Interpretable Diagnosis of Task Difficulty and Negative-Set Contamination in Genomic Sequence-Classification Benchmarks",
    note: "Pending in IEEE Xplore",
    pdf: "/papers/bibm-three-routes.pdf",
    thumb: "/papers/thumbs/bibm-three-routes.webp",
  },
  {
    venue: "ISMB 2026",
    track: "DREAM Challenges track",
    title:
      "Single-Seed Benchmarks Are Unreliable for LLM Coding Agents on Bioinformatics Tasks",
    pdf: "/papers/ismb-single-seed.pdf",
    thumb: "/papers/thumbs/ismb-single-seed.webp",
  },
  {
    venue: "MIT URTC 2026",
    track: "Poster",
    title: "Clinical-Bibliometric Landscape Audit of Cross-BBB Delivery Vectors",
  },
  {
    venue: "INFORMS 2025",
    track: "Large Language Models track",
    title:
      "Measurement Reliability in LLM Agent Evaluation: Variance, Judge Non-Determinism, and the Limits of Benchmark Inference",
  },
];

export const footer = {
  lineOne: "Homestead High School · Class of 2027",
};

export const profile = {
  firstName: "Rikhin",
  lastName: "Kavuru",
  fullName: "Rikhin Kavuru",
  handle: "@rikhin.kavuru",
  avatar: "/avatar.jpg",
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
  /** Screenshot shown when the linked name is hovered. */
  preview?: string;
  /** Swapped in under dark mode, for marks that would otherwise disappear. */
  srcDark?: string;
  /** Brand colour the label tints to on hover, matching kominko's inline marks. */
  tint?: string;
  /** Background for the fallback lettered tile. */
  fallbackBg?: string;
};

export const marks: Record<string, Mark> = {
  convexia: { src: "/logos/convexia.png", tint: "#12b866", fallbackBg: "#0a0c0b" },
  broad: { src: "/logos/broad.png", tint: "#006ab2", fallbackBg: "#006ab2" },
  yale: {
    src: "/logos/yale.png",
    preview: "/previews/yale.jpg",
    tint: "#00356b",
    fallbackBg: "#00356b",
  },
  adaptyv: {
    src: "/logos/adaptyv.png",
    preview: "/previews/adaptyv.jpg",
    tint: "#5aa8cc",
    fallbackBg: "#5aa8cc",
  },
  purdue: { src: "/logos/purdue.png", tint: "#9d7f3d", fallbackBg: "#c7b28a" },
  telo: { src: "/logos/telo.png", tint: "#111111", fallbackBg: "#111111" },
  /** Transparent-background mark, for setting inline on a white page. */
  teloMark: {
    src: "/logos/telo-mark.png",
    srcDark: "/logos/telo-mark-dark.png",
    tint: "#111111",
    fallbackBg: "#111111",
  },
  inkr: { src: "/logos/inkr.png", tint: "#f4501e", fallbackBg: "#f4501e" },
  linkd: { src: "/logos/linkd.png", tint: "#d32b25", fallbackBg: "#eaddcb" },
  virahacks: { src: "/logos/virahacks.png", tint: "#17843f", fallbackBg: "#17843f" },
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
    thumb: "/postcards/fort-wayne-thumb.jpg",
    full: "/postcards/fort-wayne.jpg",
    alt: "Southern shore of Lake Michigan, Indiana",
    caption: "Southern shore of Lake Michigan, Indiana",
    exif: "Shot on \uf8ff iPhone 16 Pro · 24mm · ƒ/1.8 · ISO 50 · 1/1385s",
    rotate: -4,
  },
  sf: {
    id: "sf",
    thumb: "/postcards/sf-thumb.jpg",
    full: "/postcards/sf.jpg",
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
  title: "collage",
  artist: "Gunna",
  album: "One of Wun",
  art: "/music/collage.jpg",
  url: "https://open.spotify.com/track/41TXadM22OIJY04xSW9iuv",
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
    avatar: "/social/github-avatar.jpg",
    followers: 4,
    following: 1,
    repos: 25,
  },
  instagram: {
    handle: "rikhin.kavuru",
    name: "Rikhin Kavuru",
    avatar: "/avatar.jpg",
    /** Fill these in to show the posts/followers/following row. */
    posts: null as number | null,
    followers: null as number | null,
    following: null as number | null,
  },
  linkedin: {
    name: "Rikhin Kavuru",
    headline: "Machine Learning Engineer at Convexia",
    location: "Fort Wayne, Indiana",
    avatar: "/social/x-avatar.jpg",
    /** Fill in to show "· 500+ connections". */
    connections: null as string | null,
  },
  x: {
    handle: "rikhinkavuru",
    name: "Rikhin Kavuru",
    bio: "ml for biology. building Telo.",
    avatar: "/social/x-avatar.jpg",
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
    role: "Machine Learning Engineer",
    detail: "Models that predict clinical trial success for drug assets.",
    when: "Current",
    mark: "convexia",
    current: true,
  },
  {
    org: "Broad Institute of MIT and Harvard",
    role: "Machine Learning Research Intern",
    detail: "Machine learning methods for drug design and phylogenetics.",
    when: "Current",
    mark: "broad",
    current: true,
  },
  {
    org: "Yale Department of Neurology",
    role: "Computational Biology Research Assistant",
    detail: "Spatial mapping of cell interactions in MS brain tissue.",
    when: "2026",
    mark: "yale",
  },
  {
    org: "Adaptyv Bio",
    role: "Data Science Intern",
    detail: "Protein screening analysis. One of six interns from 400+ applicants.",
    when: "2025",
    mark: "adaptyv",
  },
  {
    org: "Purdue University Fort Wayne",
    role: "Computational Biochemistry Researcher",
    detail: "Virtual screening and molecular docking against STAT3.",
    when: "2024-25",
    mark: "purdue",
  },
];

/** One section of a case study. Paragraphs render in order; `image` is optional. */
export type CaseSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  image?: { src: string; alt: string; caption?: string };
};

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
  /** Chips under the title on the case-study page. */
  tags?: string[];
  /** Long-form case study. Absent means the page shows the summary only. */
  sections?: CaseSection[];
  /** Figures shown at the end of a case study. */
  stats?: { value: string; label: string; detail?: string }[];
  /** Sentence or two shown beside the artwork in the lightbox. */
  blurb?: string;
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
    role: "Founder",
    when: "Current",
    href: "https://virahacks.com",
    mark: "virahacks",
    current: true,
    shots: [{ src: "/projects/virahacks.png", alt: "ViraHacks", width: 600, height: 300 }],
    tags: ["Community", "Healthcare", "1,100+ students"],
    blurb:
      "A hackathon network for high schoolers: real venues, mentors, judges, and healthcare problems worth solving, all run by students.",
    cardBg: "#f2f3f1",
  },
  {
    slug: "telo",
    name: "Telo",
    detail: "Decentralized plants making shortage-critical sterile injectables.",
    role: "Founder",
    when: "Current",
    mark: "telo",
    current: true,
    shots: [{ src: "/projects/telo.png", alt: "Telo", width: 600, height: 600 }],
    tags: ["Pharma", "Manufacturing", "Supply chain"],
    blurb:
      "Decentralized microfactories making the sterile injectables that keep going short.",
    cardBg: "#17171a",
    cardDark: true,
  },
  {
    slug: "inkr",
    name: "Inkr",
    detail: "Platform matching students with research mentors. 60K+ users.",
    role: "Founder",
    when: "2024-26",
    href: "https://inkr.pro",
    mark: "inkr",
    shots: [{ src: "/projects/inkr.png", alt: "Inkr", width: 660, height: 470 }],
    tags: ["Education", "Marketplace", "60K+ users"],
    blurb:
      "AI for networking, used by 60,000+ students. Connects them with the researchers, mentors, and opportunities that actually move a career forward.",
    cardBg: "#4a4ac4",
    cardDark: true,
  },
  {
    slug: "linkd",
    name: "Linkd",
    detail: "Daily word chain game. 45K+ daily players.",
    role: "Creator",
    when: "2025",
    href: "https://linkddaily.com",
    mark: "linkd",
    shots: [{ src: "/projects/linkd.png", alt: "Linkd", width: 660, height: 440 }],
    tags: ["Games", "45K+ daily players"],
    blurb:
      "A daily word chain game with 45,000+ daily players. Six to ten words, each pair forming a real compound or common phrase.",
    cardBg: "#d32b25",
    cardDark: true,
  },
];

export type Paper = {
  venue: string;
  track: string;
  title: string;
  note?: string;
  href?: string;
};

export const research: Paper[] = [
  {
    venue: "MLCB 2026",
    track: "Full paper track",
    title:
      "How Much of Genomic Language Model Variant-Effect Prediction Is Base Composition?",
    note: "Pending in PMLR",
  },
  {
    venue: "ISMB 2026",
    track: "DREAM Challenges track",
    title:
      "Single-Seed Benchmarks Are Unreliable for LLM Coding Agents on Bioinformatics Tasks",
  },
  {
    venue: "IEEE BIBM 2025",
    track: "Trustworthy AI for Biomedical Discovery track",
    title:
      "Three Routes to Failure: An Interpretable Diagnosis of Task Difficulty and Negative-Set Contamination in Genomic Sequence-Classification Benchmarks",
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

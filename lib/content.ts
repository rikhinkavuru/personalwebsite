export const profile = {
  firstName: "Rikhin",
  lastName: "Kavuru",
  fullName: "Rikhin Kavuru",
  handle: "@rikhinkavuru",
  avatar: "/avatar.jpg",
  email: "rikhinkavuru@gmail.com",
  github: "https://github.com/rikhinkavuru",
  linkedin: "https://www.linkedin.com/in/rikhin-kavuru-29sb0926/",
  /** Set to a cal.com or Calendly URL to enable the "Book a call" button. */
  bookingUrl: "",
};

/**
 * Inline company/product marks used in prose and list rows. `src` points at a
 * file in /public/logos. Anything missing falls back to a lettered tile.
 */
export type Mark = {
  src?: string;
  /** Brand colour the label tints to on hover, matching kominko's inline marks. */
  tint?: string;
  /** Background for the fallback lettered tile. */
  fallbackBg?: string;
};

export const marks: Record<string, Mark> = {
  convexia: { src: "/logos/convexia.png", tint: "#1d4ed8", fallbackBg: "#1d4ed8" },
  broad: { src: "/logos/broad.png", tint: "#0f4c81", fallbackBg: "#0f4c81" },
  yale: { src: "/logos/yale.png", tint: "#00356b", fallbackBg: "#00356b" },
  adaptyv: { src: "/logos/adaptyv.png", tint: "#111827", fallbackBg: "#111827" },
  purdue: { src: "/logos/purdue.png", tint: "#9d7f3d", fallbackBg: "#9d7f3d" },
  telo: { src: "/logos/telo.png", tint: "#0f766e", fallbackBg: "#0f766e" },
  inkr: { src: "/logos/inkr.png", tint: "#7c3aed", fallbackBg: "#7c3aed" },
  linkd: { src: "/logos/linkd.png", tint: "#ea580c", fallbackBg: "#ea580c" },
  virahacks: { src: "/logos/virahacks.png", tint: "#dc2626", fallbackBg: "#dc2626" },
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
  fortWayne: {
    id: "fortWayne",
    thumb: "/postcards/fort-wayne-thumb.jpg",
    full: "/postcards/fort-wayne.jpg",
    alt: "Fort Wayne, Indiana",
    caption: "Fort Wayne, Indiana",
    exif: "",
    rotate: -4,
  },
  boston: {
    id: "boston",
    thumb: "/postcards/boston-thumb.jpg",
    full: "/postcards/boston.jpg",
    alt: "Cambridge, Massachusetts",
    caption: "Kendall Square, Cambridge",
    exif: "",
    rotate: 3,
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
    role: "ML Research Intern",
    detail: "ML methods for drug design and phylogenetics. Currently on SPECTRA.",
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
  current?: boolean;
};

export const projects: Project[] = [
  {
    slug: "telo",
    name: "Telo",
    detail: "Decentralized plants making shortage-critical sterile injectables.",
    role: "Founder",
    when: "Current",
    mark: "telo",
    current: true,
    shots: [],
    tags: ["Pharma", "Manufacturing", "Supply chain"],
  },
  {
    slug: "inkr",
    name: "Inkr",
    detail: "Platform matching students with research mentors. 60K+ users.",
    role: "Founder",
    when: "2024-26",
    href: "https://inkr.pro",
    mark: "inkr",
    shots: [],
    tags: ["Education", "Marketplace", "60K+ users"],
  },
  {
    slug: "linkd",
    name: "Linkd",
    detail: "Daily word chain game. 45K+ daily players.",
    role: "Creator",
    when: "2025",
    href: "https://linkddaily.com",
    mark: "linkd",
    shots: [],
    tags: ["Games", "45K+ daily players"],
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

export type Recognition = {
  label: string;
  /** primary renders a filled dot, otherwise a hollow ring. */
  primary?: boolean;
};

export const recognition: Recognition[] = [
  { label: "7th Internationally · HOSA ILC 2026", primary: true },
  { label: "USAMO Qualifier", primary: true },
  { label: "Congressional App Challenge Winner", primary: true },
  { label: "2x HOSA State Champion", primary: true },
  { label: "Google AI Data Center Community Fellow" },
  { label: "Cambridge Re:think Essay Honorable Mention" },
  { label: "IHSAA Tennis State Runner-Up" },
];

export type Role = {
  title: string;
  org: string;
  detail: string;
  mark?: keyof typeof marks;
  href?: string;
};

export const leadership: Role[] = [
  {
    title: "Founder",
    org: "ViraHacks",
    detail: "Healthcare hackathons across 20+ chapters and 1,100+ students.",
    mark: "virahacks",
    href: "https://virahacks.com",
  },
];

export const footer = {
  lineOne: "Homestead High School · Class of 2027",
  lineTwo: "Valedictorian",
};

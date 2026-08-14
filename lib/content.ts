export const profile = {
  handle: "~/rikhin",
  firstName: "Rikhin",
  lastName: "Kavuru",
  eyebrow: "Fort Wayne, IN · Convexia",
  interests: ["machine learning", "computational biology"],
  email: "rikhinkavuru@gmail.com",
  github: "https://github.com/rikhinkavuru",
  linkedin: "https://www.linkedin.com/in/rikhin-kavuru-29sb0926/",
};

export type Experience = {
  org: string;
  role: string;
  detail: string;
  when: string;
  current?: boolean;
};

export const experience: Experience[] = [
  {
    org: "Convexia (YC S25)",
    role: "Machine Learning Engineer",
    detail: "Predicting which drugs actually survive clinical trials.",
    when: "Current",
    current: true,
  },
  {
    org: "Broad Institute of MIT and Harvard",
    role: "ML Research Intern",
    detail: "ML for drug design and phylogenetics. Currently on SPECTRA.",
    when: "Current",
    current: true,
  },
  {
    org: "Yale Department of Neurology",
    role: "Computational Biology Research Assistant",
    detail: "Mapped how cells talk to each other in MS brain tissue.",
    when: "2026",
  },
  {
    org: "MedARC",
    role: "Computational Neuroscience Researcher",
    detail: "Taught models to read fMRI scans. Under review at ICML.",
    when: "2025",
  },
  {
    org: "Adaptyv Bio",
    role: "Data Science Intern",
    detail: "Protein screening stats. One of six taken from 400+ applicants.",
    when: "2025",
  },
  {
    org: "Purdue University Fort Wayne",
    role: "Computational Biochemistry Researcher",
    detail: "Docked thousands of compounds at STAT3 looking for a hit.",
    when: "2024-25",
  },
];

export type Project = {
  name: string;
  detail: string;
  href?: string;
  current?: boolean;
};

export const projects: Project[] = [
  {
    name: "Telo",
    detail: "Making injectables next door to the hospitals that run out.",
    current: true,
  },
  {
    name: "Calma",
    detail: "Verification lab for finance code that can't afford to be wrong.",
    href: "https://github.com/rikhinkavuru/calma",
  },
  {
    name: "Inkr",
    detail: "Matching students with research mentors. Past 60,000 of them.",
    href: "https://inkr.pro",
  },
  {
    name: "Linkd",
    detail: "A word chain game 45,000 people play every day.",
    href: "https://linkddaily.com",
  },
  {
    name: "Auteur",
    detail:
      "Edits After Effects from plain English. Won the Congressional App Challenge.",
    href: "https://www.congressionalappchallenge.us/25-in03/",
  },
  {
    name: "Spocal",
    detail: "Scores how fluently you speak. Diamond Challenge finalist.",
  },
];

export type Paper = {
  venue: string;
  track: string;
  title: string;
  note?: string;
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
  primary?: boolean;
};

// primary: true renders a filled orange dot, false renders a hollow circle.
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
};

export const leadership: Role[] = [
  {
    title: "Founder",
    org: "ViraHacks",
    detail: "Healthcare hackathons. 20+ chapters, 1,100+ students so far.",
  },
  {
    title: "Primary Director of Indiana",
    org: "Research Student Connection",
    detail: "Opening lab doors to high schoolers across Indiana.",
  },
  {
    title: "President",
    org: "Key Club",
    detail: "The school's biggest club and a lot of volunteer hours.",
  },
];

export const footer = {
  lineOne: "Homestead High School · Class of 2027",
  lineTwo: "Valedictorian",
};

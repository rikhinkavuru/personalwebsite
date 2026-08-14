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
    detail: "Models that predict clinical trial success for drug assets.",
    when: "Current",
    current: true,
  },
  {
    org: "Broad Institute of MIT and Harvard",
    role: "ML Research Intern",
    detail: "ML methods for drug design and phylogenetics. Currently on SPECTRA.",
    when: "Current",
    current: true,
  },
  {
    org: "Yale Department of Neurology",
    role: "Computational Biology Research Assistant",
    detail: "Spatial mapping of cell interactions in MS brain tissue.",
    when: "2026",
  },
  {
    org: "MedARC",
    role: "Computational Neuroscience Researcher",
    detail: "Deep learning models that decode fMRI scans. Under review at ICML.",
    when: "2025",
  },
  {
    org: "Adaptyv Bio",
    role: "Data Science Intern",
    detail: "Protein screening analysis. One of six interns from 400+ applicants.",
    when: "2025",
  },
  {
    org: "Purdue University Fort Wayne",
    role: "Computational Biochemistry Researcher",
    detail: "Virtual screening and molecular docking against STAT3.",
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
    detail: "Decentralized plants making shortage-critical sterile injectables.",
    current: true,
  },
  {
    name: "Calma",
    detail: "Independent verification lab for deterministic code in finance.",
    href: "https://github.com/rikhinkavuru/calma",
  },
  {
    name: "Inkr",
    detail: "Platform matching students with research mentors. 60K+ users.",
    href: "https://inkr.pro",
  },
  {
    name: "Linkd",
    detail: "Daily word chain game. 45K+ daily players.",
    href: "https://linkddaily.com",
  },
  {
    name: "Auteur",
    detail:
      "AI copilot for After Effects. Won the Congressional App Challenge.",
    href: "https://www.congressionalappchallenge.us/25-in03/",
  },
  {
    name: "Spocal",
    detail: "Transformer-based speech fluency scoring. Diamond Challenge finalist.",
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
    detail: "Healthcare hackathons across 20+ chapters and 1,100+ students.",
  },
  {
    title: "Primary Director of Indiana",
    org: "Research Student Connection",
    detail: "Connecting Indiana high schoolers with research labs.",
  },
  {
    title: "President",
    org: "Key Club",
    detail: "The school's largest club. 120+ members.",
  },
];

export const footer = {
  lineOne: "Homestead High School · Class of 2027",
  lineTwo: "Valedictorian",
};

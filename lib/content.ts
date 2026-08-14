export const profile = {
  handle: "~/rikhin",
  firstName: "Rikhin",
  lastName: "Kavuru",
  eyebrow: "Fort Wayne, IN · Convexia",
  interests: ["machine learning", "computational biology"],
  email: "rikhinkavuru@gmail.com",
  github: "https://github.com/rikhinkavuru",
  linkedin: "https://www.linkedin.com/in/rikhinkavuru",
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
    detail:
      "Training models that predict whether a drug asset will succeed in clinical trials, scored against historical programs.",
    when: "Current",
    current: true,
  },
  {
    org: "Broad Institute of MIT and Harvard",
    role: "ML Research Intern",
    detail:
      "Building machine learning methods for phylogenetics, drug design, and clinical informatics. Currently on SPECTRA under Dr. Yasha Ektefaie.",
    when: "Current",
    current: true,
  },
  {
    org: "Yale Department of Neurology",
    role: "Computational Biology Research Assistant",
    detail:
      "Mapped spatial cell interactions in brain tissue from multiple sclerosis patients to test candidate biomarkers for disease progression.",
    when: "2026",
  },
  {
    org: "MedARC",
    role: "Computational Neuroscience Researcher",
    detail:
      "Built deep learning models that decode fMRI brain scans into interpretable neural representations. Under review at ICML.",
    when: "2025",
  },
  {
    org: "Adaptyv Bio",
    role: "Data Science Intern",
    detail:
      "Ran the statistical analysis behind protein screening experiments. One of six interns taken from 400+ applicants.",
    when: "2025",
  },
  {
    org: "Purdue University Fort Wayne",
    role: "Computational Biochemistry Researcher",
    detail:
      "Screened thousands of compounds against the STAT3 protein and docked the best candidates under Dr. Arjun Sharma.",
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
    detail:
      "Automated, decentralized plants that make shortage-critical sterile injectables next to the hospitals that need them.",
    current: true,
  },
  {
    name: "Calma",
    detail:
      "An independent verification lab for deterministic code, built for the finance industry.",
    href: "https://github.com/rikhinkavuru/calma",
  },
  {
    name: "Inkr",
    detail:
      "A platform that matches students with research mentors, now past 60,000 users.",
    href: "https://inkr.pro",
  },
  {
    name: "Linkd",
    detail: "A daily word chain game with over 45,000 daily players.",
    href: "https://linkddaily.com",
  },
  {
    name: "Auteur",
    detail:
      "An After Effects extension that edits video from plain language, with an agent mode that reads the docs and writes its own ExtendScript until the task is finished. Won the Congressional App Challenge.",
    href: "https://www.congressionalappchallenge.us/25-in03/",
  },
  {
    name: "Spocal",
    detail:
      "A transformer-based tool that scores spoken fluency. Qualified for the Diamond Challenge finals.",
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
    note: "Pending publication in PMLR",
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
    detail:
      "A healthcare hackathon network that has grown to 20+ chapters and more than 1,100 students.",
  },
  {
    title: "Primary Director of Indiana",
    org: "Research Student Connection",
    detail:
      "Building partnerships between labs and high schools so students can get into real research.",
  },
  {
    title: "President",
    org: "Key Club",
    detail:
      "Running the school's largest club: 120+ members and thousands of volunteer hours a year.",
  },
];

export const footer = {
  lineOne: "Homestead High School · Class of 2027",
  lineTwo: "Valedictorian",
};

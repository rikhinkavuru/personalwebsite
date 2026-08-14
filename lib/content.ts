export const profile = {
  handle: "~/rikhin",
  firstName: "Rikhin",
  lastName: "Kavuru",
  // TODO: swap for your city if you want the location shown, e.g. "West Lafayette, IN · Broad Institute"
  eyebrow: "Broad Institute of MIT and Harvard",
  interests: ["computational biology", "machine learning"],
  email: "rikhinkavuru@gmail.com",
  github: "https://github.com/rikhinkavuru",
  linkedin: "https://www.linkedin.com/in/rikhinkavuru",
};

export type Experience = {
  org: string;
  detail: string;
  when: string;
  current?: boolean;
};

export const experience: Experience[] = [
  {
    org: "Broad Institute of MIT and Harvard",
    detail: "SPECTRA · Computational biology under Dr. Yasha Ektefaie",
    when: "Current",
    current: true,
  },
  {
    org: "Adaptyv Bio",
    detail: "Protein screening data · Binding curves and expression levels",
    when: "Current",
    current: true,
  },
  {
    org: "MedARC",
    detail: "fMRI decoding · Interpretable neural representations",
    when: "2025",
  },
  {
    org: "Purdue University",
    detail: "STAT3 molecular docking · ZINC and ChEMBL libraries",
    when: "2025",
  },
];

export type Project = {
  name: string;
  detail: string;
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Linkd",
    detail: "Word chain game that reached 60k+ players",
    href: "https://linkddaily.com",
  },
  {
    name: "Calma",
    detail: "Independent verification lab for AI agents in finance",
    href: "https://github.com/rikhinkavuru/calma",
  },
  {
    name: "Auteur",
    detail: "AI copilot for After Effects · Congressional App Challenge winner",
    href: "https://www.congressionalappchallenge.us/25-in03/",
  },
  {
    name: "Vira",
    detail: "Healthcare hackathon org · 20 chapters, 1000+ students",
    href: "https://www.virahacks.com/",
  },
  {
    name: "Spocal",
    detail: "Transformer-based speech fluency assessment",
  },
  {
    name: "TwoFace Games",
    detail: "Imposter-style party game shipped on the App Store",
    href: "https://apps.apple.com/us/app/twoface-games/id6761439165",
  },
  {
    name: "TestScan",
    detail: "Video frame extraction + GPT-4o Vision question solving",
    href: "https://testscan.vercel.app/",
  },
];

export type Recognition = {
  label: string;
  primary?: boolean;
};

// primary: true renders a filled orange dot, false renders a hollow circle.
export const recognition: Recognition[] = [
  { label: "Congressional App Challenge Winner", primary: true },
  { label: "agentDX accepted to BIBM 2026", primary: true },
  { label: "fMRI decoding under review at ICML", primary: true },
  { label: "Linkd · 60,000+ players", primary: true },
  { label: "Vira · 20 chapters nationwide" },
  { label: "TwoFace Games · App Store release" },
];

// TODO: replace with your school and class year
export const footer = {
  lineOne: "Rikhin Kavuru",
  lineTwo: "All rights reserved 2026",
};

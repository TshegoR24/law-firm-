import type { PracticeArea } from "@/data/practice-areas";

/**
 * TEAM PROFILES
 * Only details supplied by the firm are used. Biography, qualifications and
 * photography are still to come — add them here when confirmed.
 */

export interface Attorney {
  slug: string;
  name: string;
  initials: string;
  designation: string;
  /** Label shown above the name. */
  practiceArea: string;
  /** Optional link to one specific practice area page. */
  practiceAreaSlug?: PracticeArea["slug"];
  shortBio: string;
  fullBio: string[];
  focus: string[];
  tone: 0 | 1 | 2;
}

export const attorneys: Attorney[] = [
  {
    slug: "motlatso-walter-nabane",
    name: "Motlatso Walter Nabane",
    initials: "MN",
    designation: "Director",
    practiceArea: "Legal & Advisory Practice",
    shortBio:
      "Director of Walter Nabane Incorporated, a legal and advisory practice in Pretoria.",
    fullBio: [
      "Motlatso Walter Nabane is the director of Walter Nabane Incorporated, which is also referred to as Nabane Inc and Nabane Attorneys. The practice is based in Capital Park, Pretoria.",
      "A full biography, professional qualifications and photograph will be added once they have been supplied and approved by the firm.",
    ],
    focus: [
      "Administration of deceased estates",
      "Family law",
      "Road Accident Fund and personal injury claims",
      "Labour matters and litigation",
    ],
    tone: 0,
  },
];

export function getAttorney(slug: string): Attorney | undefined {
  return attorneys.find((attorney) => attorney.slug === slug);
}

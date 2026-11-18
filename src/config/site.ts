/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the single place to edit brand details
 * ─────────────────────────────────────────────────────────────
 *  Firm details below were supplied for this sample. Anything marked
 *  "to be confirmed" has not been provided yet.
 */

export const site = {
  /** Trading name used across the site. */
  name: "Nabane Inc",
  /** Registered name, as referenced in court records. */
  legalName: "Walter Nabane Incorporated",
  /** Also listed in directories as. */
  alternateNames: ["Nabane Attorneys"],
  /** Split used by the typographic logo (see components/brand/Logo.tsx). */
  logoWordmark: { primary: "NABANE", secondary: "INC" },
  tagline: "Legal & Advisory Practice · Pretoria",
  description:
    "Nabane Inc (Walter Nabane Incorporated) is a legal and advisory practice in Pretoria, assisting clients with deceased estates, family law, Road Accident Fund and personal injury claims, labour matters and litigation.",
  /** Canonical origin. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nabane-inc.example",
  locale: "en_ZA",
  builder: "Techsphere Solutions",
  /** Fixed year for the copyright line (avoids request-time Date usage). */
  copyrightYear: 2026,

  /** Director of the practice. */
  director: "Motlatso Walter Nabane",

  contact: {
    phoneDisplay: "+27 12 323 6374",
    phoneHref: "tel:+27123236374",
    /** Email address has not been supplied yet. */
    email: null as string | null,
  },

  /**
   * WhatsApp — number in international format WITHOUT "+" or spaces.
   * This is the firm's listed telephone number; confirm that it is
   * WhatsApp-enabled (or swap in a mobile number) before launch.
   */
  whatsapp: {
    number: "27123236374",
    display: "+27 12 323 6374",
    message:
      "Hello, I would like to enquire about your legal services and arrange a consultation.",
  },

  address: {
    lines: ["71 Malherbe Street", "Capital Park", "Pretoria", "0084"],
    oneLine: "71 Malherbe Street, Capital Park, Pretoria, 0084",
  },

  offices: [
    {
      city: "Pretoria",
      region: "Capital Park, Gauteng",
      address: "71 Malherbe Street, Capital Park, Pretoria, 0084",
    },
  ],

  hours: [
    { days: "Monday – Thursday", time: "08:00 – 16:30" },
    { days: "Friday", time: "08:00 – 14:00" },
  ],

  accessibility: "Wheelchair-accessible parking is available at the office.",
};

export function whatsappUrl(message: string = site.whatsapp.message): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

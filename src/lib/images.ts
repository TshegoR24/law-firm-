/**
 * ─────────────────────────────────────────────────────────────
 *  IMAGERY — the single place to swap in real photography
 * ─────────────────────────────────────────────────────────────
 *  Every image on the site is described here. By default each one
 *  renders as an art-directed architectural illustration (see
 *  components/visuals). To use a photograph instead, drop the file
 *  into /public/images and add `src: "/images/your-file.jpg"` to the
 *  entry — nothing else needs to change.
 */

export type SceneKind =
  | "residence"
  | "tower"
  | "facade"
  | "hall"
  | "estate"
  | "skyline";

export interface VisualProps {
  scene: SceneKind;
  /** Accessible description of the image. */
  alt: string;
  /** Colour/composition variant (0–3). */
  variant?: 0 | 1 | 2 | 3;
  /** Which part of the artwork stays visible when cropped. */
  align?: "left" | "center" | "right";
  /** "right" leaves space on the left for overlaid copy (hero use). */
  framing?: "default" | "right";
  /** Optional real photograph (path under /public). Overrides the artwork. */
  src?: string;
}

export const IMG = {
  hero: {
    scene: "residence",
    variant: 0,
    align: "center",
    framing: "right",
    alt: "A modern residence with a warmly lit glass ground floor, reflected in a still pool at dusk",
  },

  propertyLaw: {
    scene: "residence",
    variant: 1,
    align: "center",
    alt: "A contemporary home with cantilevered roof slabs and a lit glass living level at night",
  },
  propertyLawCard: {
    scene: "residence",
    variant: 3,
    align: "center",
    alt: "A modern home glowing at dusk beside a reflecting pool",
  },

  conveyancing: {
    scene: "tower",
    variant: 0,
    align: "center",
    alt: "Glass commercial and residential towers at dusk with lit windows",
  },
  conveyancingCard: {
    scene: "tower",
    variant: 2,
    align: "center",
    alt: "Modern towers rising against a soft morning sky",
  },

  estates: {
    scene: "estate",
    variant: 0,
    align: "center",
    alt: "A quiet family home at golden hour beneath a flowering jacaranda tree",
  },
  estatesCard: {
    scene: "estate",
    variant: 1,
    align: "center",
    alt: "A family home and garden in the evening light beneath a blossoming tree",
  },

  about: {
    scene: "facade",
    variant: 0,
    align: "center",
    alt: "Vertical architectural fins catching low evening sunlight",
  },
  aboutHall: {
    scene: "hall",
    variant: 0,
    align: "center",
    alt: "A receding colonnade of arches leading to a warmly lit hall",
  },
  aboutHero: {
    scene: "skyline",
    variant: 0,
    align: "center",
    alt: "A Gauteng city skyline at dusk with layered towers and warm light on the horizon",
  },

  attorneysHero: {
    scene: "hall",
    variant: 2,
    align: "center",
    alt: "A calm, light-filled arched corridor",
  },
  insightsHero: {
    scene: "facade",
    variant: 2,
    align: "center",
    alt: "Sunlight raking across a vertical stone and glass facade",
  },
  contactHero: {
    scene: "skyline",
    variant: 1,
    align: "center",
    alt: "A city skyline at night with warm lights reflected on the streets below",
  },
  consultationHero: {
    scene: "hall",
    variant: 1,
    align: "center",
    alt: "A warmly lit arched hall receding into the distance",
  },
  legalHero: {
    scene: "facade",
    variant: 1,
    align: "center",
    alt: "A dark architectural facade with fine vertical detailing",
  },
  cta: {
    scene: "skyline",
    variant: 2,
    align: "center",
    alt: "A city skyline in the soft glow of early morning",
  },

  articleTransfer: {
    scene: "tower",
    variant: 3,
    align: "center",
    alt: "Towers and buildings at dusk representing a property transfer",
  },
  articleIntestate: {
    scene: "estate",
    variant: 2,
    align: "center",
    alt: "A family home under a large tree in soft light",
  },
  articleConveyancer: {
    scene: "facade",
    variant: 1,
    align: "center",
    alt: "A precise architectural facade with repeating vertical lines",
  },
  articleOffer: {
    scene: "residence",
    variant: 2,
    align: "center",
    alt: "A modern house at dawn with a lit glass living area",
  },
  articleBond: {
    scene: "skyline",
    variant: 3,
    align: "center",
    alt: "A skyline of residential and commercial buildings at dusk",
  },
  articleExecutor: {
    scene: "hall",
    variant: 3,
    align: "center",
    alt: "A quiet, arched hallway with soft light",
  },
} as const satisfies Record<string, VisualProps>;

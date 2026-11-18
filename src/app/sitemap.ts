import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { articles } from "@/data/articles";
import { attorneys } from "@/data/attorneys";
import { practiceAreas } from "@/data/practice-areas";

// Fixed date: avoids request-time `new Date()` under Cache Components.
const LAST_MODIFIED = "2026-11-17";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", lastModified = LAST_MODIFIED) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/about", 0.8),
    entry("/practice-areas", 0.9),
    ...practiceAreas.map((a) => entry(`/practice-areas/${a.slug}`, 0.9)),
    entry("/attorneys", 0.7),
    ...attorneys.map((a) => entry(`/attorneys/${a.slug}`, 0.5)),
    entry("/insights", 0.7, "weekly"),
    ...articles.map((a) => entry(`/insights/${a.slug}`, 0.6, "yearly", a.date)),
    entry("/contact", 0.8),
    entry("/consultation", 0.8),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/website-disclaimer", 0.2, "yearly"),
  ];
}

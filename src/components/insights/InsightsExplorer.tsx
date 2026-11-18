"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/sections/ArticleCard";
import type { ArticleCategory, ArticleSummary } from "@/data/articles";
import { cx } from "@/lib/format";

export function InsightsExplorer({ articles, categories }: { articles: ArticleSummary[]; categories: ArticleCategory[] }) {
  const [category, setCategory] = useState<ArticleCategory | "All">("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const inCategory = category === "All" || a.category === category;
      const inQuery = !q || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [articles, category, query]);

  const tabs: Array<ArticleCategory | "All"> = ["All", ...categories];

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-navy/15 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-pressed={category === tab}
              onClick={() => setCategory(tab)}
              className={cx(
                "border px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                category === tab ? "border-navy bg-navy text-white" : "border-navy/25 text-navy hover:border-navy",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="insights-search" className="sr-only">Search insights</label>
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" aria-hidden="true" />
          <input
            id="insights-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search insights"
            className="w-full border-0 border-b border-navy/25 bg-transparent py-3 pl-7 pr-2 text-base placeholder:text-grey/70 focus:border-gold-deep focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-grey-dark" role="status" aria-live="polite">
        {results.length === 1 ? "1 article" : `${results.length} articles`}
        {category !== "All" && ` in ${category}`}
        {query.trim() && ` matching “${query.trim()}”`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-10 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border border-dashed border-navy/25 p-12 text-center">
          <p className="font-serif text-3xl text-navy">No articles found</p>
          <p className="mt-3 text-grey-dark">Try a different search term or choose another category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy underline decoration-gold underline-offset-8"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

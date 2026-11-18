import Link from "next/link";
import { Visual } from "@/components/visuals/Visual";
import type { ArticleSummary } from "@/data/articles";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article, priority }: { article: ArticleSummary; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[16/11] overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.06]">
          <Visual {...article.image} priority={priority} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" grain={false} />
        </div>
        <span className="absolute left-4 top-4 bg-navy-deep/85 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur-sm">{article.category}</span>
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="flex flex-wrap items-center gap-x-3 text-[0.72rem] uppercase tracking-[0.16em] text-grey-dark">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
          <span>{article.readMinutes} min read</span>
        </p>
        <h3 className="mt-3 text-[1.6rem] font-medium leading-[1.15] text-navy transition-colors duration-300 group-hover:text-gold-deep">
          <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">{article.title}</Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-grey-dark">{article.excerpt}</p>
        <p className="mt-5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-grey">Illustrative sample article</p>
      </div>
    </article>
  );
}

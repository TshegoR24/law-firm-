import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Visual } from "@/components/visuals/Visual";
import { articles, getArticle, getRelatedArticles } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, buildMetadata, jsonLd } from "@/lib/seo";

/**
 * Every valid slug is prerendered by generateStaticParams; unknown slugs 404.
 * Navigation to these routes therefore never waits on dynamic data.
 */
export const instant = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function ArticlePage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3).map(({ body: _body, ...rest }) => rest);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
    { name: article.title, href: `/insights/${article.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd(crumbs)) }} />

      <header className="relative isolate overflow-hidden bg-navy-deep text-white">
        <div className="kenburns absolute inset-0 -z-20">
          <Visual {...article.image} priority sizes="100vw" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/50" />
        <Container className="pb-16 pt-40 sm:pb-24 sm:pt-52">
          <Breadcrumbs crumbs={[crumbs[0], crumbs[1], { name: "Article", href: crumbs[2].href }]} />
          <div className="max-w-4xl">
            <Eyebrow tone="light" className="mb-6">{article.category}</Eyebrow>
            <h1 className="text-[2.4rem] font-medium leading-[1.05] sm:text-6xl">{article.title}</h1>
            <p className="mt-8 flex flex-wrap items-center gap-x-4 text-[0.75rem] uppercase tracking-[0.2em] text-white/70">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
              <span>{article.readMinutes} min read</span>
            </p>
          </div>
        </Container>
      </header>

      <article className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-[44rem]">
            <DemoNotice className="mb-12">
              Illustrative sample article — demonstration content pending attorney review. General information only; not legal advice.
            </DemoNotice>
            <p className="font-serif text-[1.8rem] leading-snug text-navy sm:text-[2.1rem]">{article.excerpt}</p>
            <div className="mt-10 space-y-6">
              {article.body.map((block, i) => {
                if (block.type === "h2") return <h2 key={i} className="!mt-14 text-[2rem] font-medium text-navy sm:text-[2.3rem]">{block.text}</h2>;
                if (block.type === "ul")
                  return (
                    <ul key={i} className="space-y-3 pl-1">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-4 text-[1.05rem] leading-relaxed text-grey-dark">
                          <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-gold-deep" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                return <p key={i} className="text-[1.05rem] leading-[1.9] text-grey-dark">{block.text}</p>;
              })}
            </div>
            <div className="mt-16 border-t border-navy/15 pt-8">
              <Link href="/insights" className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy hover:text-gold-deep">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> Back to insights
              </Link>
            </div>
          </div>
        </Container>
      </article>

      <section className="bg-ivory py-24" aria-labelledby="related-heading">
        <Container>
          <Eyebrow className="mb-4">Keep reading</Eyebrow>
          <h2 id="related-heading" className="text-4xl text-navy sm:text-5xl">Related articles</h2>
          <ul className="mt-12 grid gap-12 md:grid-cols-3 lg:gap-10">
            {related.map((r) => (
              <li key={r.slug}>
                <ArticleCard article={r} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

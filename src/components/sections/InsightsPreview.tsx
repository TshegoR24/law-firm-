import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";

export function InsightsPreview() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Insights" title={<>Clear Thinking on <span className="italic text-gold-deep">Everyday Legal Questions.</span></>} intro="Illustrative sample articles — demonstration content pending attorney review." />
          <TextLink href="/insights">All insights</TextLink>
        </div>
        <ul className="mt-14 grid gap-12 md:grid-cols-3 lg:gap-10">
          {articles.slice(0, 3).map((article, i) => (
            <Reveal as="li" key={article.slug} delay={i * 0.1}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import { InsightsExplorer } from "@/components/insights/InsightsExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { articleCategories, articles, type ArticleSummary } from "@/data/articles";
import { IMG } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description: "Illustrative sample articles on deceased estates, family law, Road Accident Fund claims, labour matters and litigation in South Africa. Demonstration content pending attorney review.",
  path: "/insights",
});

export default function InsightsPage() {
  const summaries: ArticleSummary[] = articles.map(({ body: _body, ...rest }) => rest);
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Clear Thinking on <span className="italic text-gold-light">Everyday Legal Questions.</span></>}
        intro="Plain-language articles on the legal questions we are asked most often."
        image={IMG.insightsHero}
        crumbs={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }]}
      />
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <DemoNotice className="mb-12 max-w-3xl">
            Demonstration content pending attorney review: these articles are illustrative samples, provide general information only and are not legal advice.
          </DemoNotice>
          <InsightsExplorer articles={summaries} categories={articleCategories} />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

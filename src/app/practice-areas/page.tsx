import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PracticeCards } from "@/components/sections/PracticeCards";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { IMG } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Practice Areas",
  description: "Deceased estates, family law, RAF and personal injury claims, and labour law and litigation in Pretoria. Explore the practice areas of Nabane Inc.",
  path: "/practice-areas",
});

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice areas"
        title={<>Focused Support <span className="italic text-gold-light">Across Four Disciplines.</span></>}
        intro="Deceased estates, family law, Road Accident Fund and personal injury claims, and labour law and litigation — each handled with careful preparation, clear communication and personal attention."
        image={IMG.propertyLaw}
        crumbs={[{ name: "Home", href: "/" }, { name: "Practice Areas", href: "/practice-areas" }]}
      />
      <section className="bg-ivory pb-32 pt-24 sm:pb-40 sm:pt-32">
        <Container>
          <SectionHeading eyebrow="What we do" title={<>Legal Expertise. <span className="italic text-gold-deep">Personal Commitment.</span></>} />
          <div className="mt-16">
            <PracticeCards stagger={false} />
          </div>
          <DemoNotice className="mt-20 max-w-3xl">
            Demonstration content: services shown across these pages are illustrative and have not been confirmed by an actual firm.
          </DemoNotice>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

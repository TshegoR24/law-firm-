import type { Metadata } from "next";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { AttorneysPreview } from "@/components/sections/AttorneysPreview";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { PracticeCards } from "@/components/sections/PracticeCards";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { absoluteUrl } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="services" className="bg-ivory pb-28 pt-24 sm:pb-36 sm:pt-32 lg:pb-44">
        <Container>
          <SectionHeading
            eyebrow="Practice areas"
            title={<>Legal Expertise. <span className="italic text-gold-deep">Personal Commitment.</span></>}
            intro="Three focused disciplines, each approached with care, clarity and attention to the people involved."
          />
          <div className="mt-16 lg:mt-20">
            <PracticeCards />
          </div>
        </Container>
      </section>

      <AboutSplit />
      <WhyChoose />
      <AttorneysPreview />
      <InsightsPreview />
      <CtaBand />
    </>
  );
}

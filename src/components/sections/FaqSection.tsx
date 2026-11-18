import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";

export function FaqSection({ items, title = "Frequently asked questions" }: { items: AccordionItem[]; title?: string }) {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-24">
        <div>
          <SectionHeading eyebrow="FAQ" title={title} intro="General information only — not legal advice. Speak to an attorney about your specific circumstances." />
        </div>
        <Accordion items={items} />
      </Container>
    </section>
  );
}

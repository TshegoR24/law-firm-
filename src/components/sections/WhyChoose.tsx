import { BadgeCheck, MessagesSquare, Target, UserRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Eyebrow";

const features = [
  {
    icon: BadgeCheck,
    title: "Professional Expertise",
    text: "Careful, technically sound advice grounded in the legal requirements that govern estates, family, injury and labour matters.",
  },
  {
    icon: UserRound,
    title: "Personalised Attention",
    text: "Every matter is handled with an understanding of your circumstances, not as a file number.",
  },
  {
    icon: MessagesSquare,
    title: "Transparent Communication",
    text: "Plain-language explanations, clear next steps and regular updates so you always know where things stand.",
  },
  {
    icon: Target,
    title: "Client-Focused Solutions",
    text: "Practical outcomes shaped around what matters most to you and your family.",
  },
];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-gold/15" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full border border-gold/10" />
      <Container className="relative">
        <SectionHeading tone="light" eyebrow="Why choose us" title={<>The Standard You <span className="italic text-gold-light">Should Expect.</span></>} />
        <ul className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 0.08} className="group bg-navy p-8 transition-colors duration-500 hover:bg-navy-deep lg:p-10">
              <div className="flex items-center justify-between">
                <f.icon className="h-8 w-8 text-gold" strokeWidth={1.25} aria-hidden="true" />
                <span aria-hidden="true" className="font-serif text-3xl font-light text-white/20 transition-colors group-hover:text-gold/60">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-[1.65rem] font-medium leading-tight">{f.title}</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-white/65">{f.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

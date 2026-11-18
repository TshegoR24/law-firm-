import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Visual } from "@/components/visuals/Visual";
import { IMG } from "@/lib/images";

export function AboutSplit() {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
            <Visual {...IMG.about} align="center" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent" />
          </div>
          <div aria-hidden="true" className="absolute -bottom-5 -left-5 -z-10 h-2/3 w-2/3 border border-gold/70 sm:-bottom-7 sm:-left-7" />
          <div className="absolute -bottom-8 -right-3 hidden w-[44%] border-[6px] border-white bg-navy-deep shadow-2xl sm:block lg:-right-10">
            <div className="relative aspect-[4/3]">
              <Visual {...IMG.aboutHall} sizes="25vw" grain={false} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow className="mb-7">About the firm</Eyebrow>
          <h2 className="text-[2.5rem] font-medium leading-[1.04] text-navy sm:text-5xl lg:text-[3.6rem]">
            A Legacy of Trust. <span className="italic text-gold-deep">A Commitment to Excellence.</span>
          </h2>
          <p className="mt-8 text-base leading-[1.85] text-grey-dark sm:text-lg">
            At Nabane Inc, we believe that effective legal representation begins with understanding our clients. We combine professional legal knowledge with a personal approach, providing considered guidance through important estate, family, injury and employment matters.
          </p>
          <div aria-hidden="true" className="gold-rule my-9 w-24" />
          <Button href="/about" variant="navy">Explore Our Firm</Button>
        </Reveal>
      </Container>
    </section>
  );
}

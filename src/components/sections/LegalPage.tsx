import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { IMG } from "@/lib/images";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({ eyebrow, title, path, intro, sections }: { eyebrow: string; title: string; path: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} image={IMG.legalHero} crumbs={[{ name: "Home", href: "/" }, { name: title, href: path }]} size="compact" />
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <DemoNotice className="mb-12">
              Template text for demonstration purposes only. It must be reviewed and replaced by the firm’s attorneys before any real use.
            </DemoNotice>
            <div className="space-y-12">
              {sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-[2rem] text-navy">{s.heading}</h2>
                  <div className="mt-4 space-y-4 text-[1.02rem] leading-[1.85] text-grey-dark">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

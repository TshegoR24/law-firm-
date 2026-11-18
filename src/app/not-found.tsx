import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/lib/images";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Error 404"
      title={<>We couldn’t find <span className="italic text-gold-light">that page.</span></>}
      intro="The page you’re looking for may have moved or no longer exists."
      image={IMG.legalHero}
    >
      <Button href="/" size="lg">Return home</Button>
      <Button href="/contact" variant="outline-light" size="lg" arrow={false}>Contact us</Button>
    </PageHero>
  );
}

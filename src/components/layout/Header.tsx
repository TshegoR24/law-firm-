"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { CONSULTATION_HREF, primaryNav } from "@/config/navigation";
import { cx } from "@/lib/format";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-gold/20 bg-navy-deep/90 py-3 shadow-[0_12px_40px_-18px_rgba(5,11,20,0.7)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5 lg:py-7",
        )}
      >
        <Container className="flex items-center justify-between gap-6">
          <Logo tone="light" />

          <nav aria-label="Primary" className="hidden items-center gap-9 xl:gap-11 lg:flex">
            {primaryNav
              .filter((item) => item.href !== "/")
              .map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "group relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                      active ? "text-white" : "text-white/75 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cx(
                        "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            <Link
              href={CONSULTATION_HREF}
              className="border border-gold/70 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-navy-deep"
            >
              Request a Consultation
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-white lg:hidden"
          >
            <Menu className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}

"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { CONSULTATION_HREF, primaryNav } from "@/config/navigation";
import { site } from "@/config/site";
import { practiceAreas } from "@/data/practice-areas";
import { cx } from "@/lib/format";

interface Props {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({ open, onClose, pathname }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastPath = useRef(pathname);

  // Close after navigating.
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Scroll lock + focus management.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={onKeyDown}
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy-deep text-white lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <Logo tone="light" />
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="-mr-2 flex h-11 w-11 items-center justify-center">
              <X className="h-7 w-7" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-8">
            <ul className="space-y-1">
              {primaryNav.map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.12 + i * 0.05, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "flex items-baseline gap-4 border-b border-white/10 py-3.5 font-serif text-[2rem] leading-none transition-colors",
                        active ? "text-gold" : "text-white hover:text-gold",
                      )}
                    >
                      <span aria-hidden="true" className="w-6 font-sans text-[0.65rem] tracking-[0.2em] text-white/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                    {item.href === "/practice-areas" && (
                      <ul className="flex flex-wrap gap-x-5 gap-y-1 pb-2 pl-10 pt-2.5">
                        {practiceAreas.map((area) => (
                          <li key={area.slug}>
                            <Link href={`/practice-areas/${area.slug}`} className="text-[0.7rem] uppercase tracking-[0.18em] text-white/60 hover:text-gold">
                              {area.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="space-y-5 px-5 pb-8 sm:px-8"
          >
            <Link
              href={CONSULTATION_HREF}
              className="flex w-full items-center justify-center bg-gold px-6 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy-deep"
            >
              Request a Consultation
            </Link>
            <div className="flex flex-col gap-2 text-sm text-white/65 sm:flex-row sm:gap-6">
              <a href={site.contact.phoneHref} className="flex items-center gap-2 hover:text-gold">
                <Phone className="h-4 w-4" aria-hidden="true" /> {site.contact.phoneDisplay}
              </a>
            </div>
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/35">{site.address.oneLine}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

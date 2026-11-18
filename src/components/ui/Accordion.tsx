"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cx } from "@/lib/format";

export interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items, tone = "dark" }: { items: AccordionItem[]; tone?: "dark" | "light" }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cx("divide-y border-y", tone === "light" ? "divide-white/15 border-white/15" : "divide-navy/15 border-navy/15")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <div key={item.question}>
            <h3 className="font-sans text-base font-medium leading-snug tracking-normal">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cx(
                  "flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 sm:py-7 sm:text-lg",
                  tone === "light" ? "text-white hover:text-gold" : "text-navy hover:text-gold-deep",
                )}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cx(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    tone === "light" ? "border-white/30" : "border-navy/25",
                    isOpen && "rotate-45 border-gold bg-gold text-navy-deep",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cx("max-w-3xl pb-7 pr-12 leading-relaxed", tone === "light" ? "text-white/75" : "text-grey-dark")}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

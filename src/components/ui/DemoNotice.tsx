import { Info } from "lucide-react";
import { cx } from "@/lib/format";

export function DemoNotice({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cx("flex items-start gap-3 border-l-2 border-gold bg-gold/10 px-5 py-4 text-sm leading-relaxed text-charcoal", className)}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

import { site, whatsappUrl } from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Floating WhatsApp shortcut. The number lives in config/site.ts and is a
 * DEMONSTRATION PLACEHOLDER — replace it before launch.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp (demonstration number ${site.whatsapp.display})`}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-[#25d366] p-[0.95rem] text-white shadow-[0_10px_30px_-6px_rgba(5,11,20,0.55)] ring-1 ring-white/20 transition-all duration-300 hover:gap-3 hover:bg-[#1fb857] hover:pr-6 focus-visible:gap-3 focus-visible:pr-6 sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[12rem] group-hover:opacity-100 group-focus-visible:max-w-[12rem] group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}

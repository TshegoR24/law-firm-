import Image from "next/image";
import { cx } from "@/lib/format";
import type { VisualProps } from "@/lib/images";
import { SceneSvg } from "./scenes";

interface Props extends VisualProps {
  className?: string;
  /** Responsive `sizes` hint, used only when a real photograph is supplied. */
  sizes?: string;
  priority?: boolean;
  /** Film grain adds texture on large images; switch off for tiny ones. */
  grain?: boolean;
}

/**
 * Fills its (relatively positioned) parent like `object-fit: cover`.
 * Renders a photograph when `src` is provided, otherwise the
 * art-directed architectural illustration for the chosen scene.
 */
export function Visual({
  scene,
  alt,
  variant = 0,
  align = "center",
  framing,
  src,
  className,
  sizes = "100vw",
  priority,
  grain = true,
}: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cx("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cx("absolute inset-0 overflow-hidden", className)}
    >
      <SceneSvg scene={scene} variant={variant} align={align} grain={grain} framing={framing} />
    </div>
  );
}

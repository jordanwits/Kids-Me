"use client";

import { useEffect, useRef } from "react";

/**
 * The Procare registration form, embedded.
 *
 * It is a cross-origin iframe, so nothing on this site can restyle what is
 * inside it, only the width it lays out at. Procare's form is not built for
 * narrow screens: below about 480px its step labels run into each other and
 * the last step is cut off. (On its own site Procare forces phones to render a
 * 768px page and shrink it; that viewport trick has no effect inside an iframe.)
 *
 * So when this box is narrower than LAYOUT_WIDTH, the form is laid out at
 * LAYOUT_WIDTH and scaled down to fit, the same way a phone shrinks a wide
 * page. At that width and up it renders 1:1. The scale is a CSS variable set
 * from a ResizeObserver, so the server HTML is the plain unscaled frame.
 */

/** Label text stops colliding at 480px; the extra 20px is slack for font rendering. */
const LAYOUT_WIDTH = 500;

export default function RegistrationFrame({
  src,
  title,
  className = "",
}: {
  src: string;
  title: string;
  /** Sizing for the visible box, its height in particular. */
  className?: string;
}) {
  const box = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const width = el.getBoundingClientRect().width;
      if (width > 0) {
        el.style.setProperty("--frame-scale", String(Math.min(1, width / LAYOUT_WIDTH)));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className={`relative overflow-hidden bg-white ${className}`}>
      {/* Width and height are divided by the scale, then the transform shrinks
          the frame back down, so it always fills the box exactly. */}
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="absolute left-0 top-0 origin-top-left border-0 bg-white"
        style={{
          width: "calc(100% / var(--frame-scale, 1))",
          height: "calc(100% / var(--frame-scale, 1))",
          transform: "scale(var(--frame-scale, 1))",
        }}
      />
    </div>
  );
}

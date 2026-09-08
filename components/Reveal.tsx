"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals children once they scroll into view. IntersectionObserver rather than
 * `animation-timeline` so Safari and Firefox get the same treatment as Chrome.
 * Honours prefers-reduced-motion via CSS in globals.css.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Anything already on screen when this mounts is shown straight away
       rather than waiting on an observer callback. This is what makes deep
       links work: landing on /programs#themes or /about#why puts a section
       mid-page into view before any scrolling happens, and that content must
       not depend on an intersection change that never comes. */
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (alreadyInView || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal
      data-visible={visible ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}

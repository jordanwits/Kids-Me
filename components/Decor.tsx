/**
 * Decorative primitives lifted from the logo: the gold dots that flank
 * PRESCHOOL, hand-cut paper edges and the feature icon set. The handprint
 * itself now comes from /public/HandGraphic.png. All SVG, so it stays crisp.
 */

type SVGProps = React.SVGProps<SVGSVGElement>;

/** Scattered confetti dots — the gold bullets beside PRESCHOOL, multiplied. */
export function ConfettiDots({ className }: { className?: string }) {
  const dots = [
    { x: 8, y: 22, r: 4, c: "#EBB75F" },
    { x: 32, y: 8, r: 2.5, c: "#EE9B7E" },
    { x: 54, y: 30, r: 3.5, c: "#7BABAB" },
    { x: 78, y: 14, r: 2.5, c: "#AA99AA" },
    { x: 96, y: 34, r: 4, c: "#EBB75F" },
    { x: 20, y: 48, r: 2.5, c: "#C6B09C" },
    { x: 66, y: 52, r: 3, c: "#EE9B7E" },
  ];
  return (
    <svg viewBox="0 0 110 60" className={className} aria-hidden>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={0.85} />
      ))}
    </svg>
  );
}

/** Torn construction-paper edge. Flip with `flip` to cap the top of a band. */
export function PaperEdge({
  fill = "#FDF7F0",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <path
        d="M0 44c92-22 168 16 262 12s148-38 246-30 140 44 244 40 160-40 268-34 156 38 260 30 118-30 160-38v70H0Z"
        fill={fill}
      />
    </svg>
  );
}

/** Softer, rolling wave used where a torn edge would be too busy. */
export function Wave({
  fill = "#FDF7F0",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <path
        d="M0 64c160-48 320-48 480 0s320 48 480 0 320-48 480 0v56H0Z"
        fill={fill}
      />
    </svg>
  );
}

/** Loose hand-drawn arrow used to point at the enrollment card. */
export function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden>
      <path
        d="M6 8c30 4 58 20 72 44 6 10 8 20 7 28"
        stroke="#C6B09C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      <path
        d="M70 68l15 14 14-16"
        stroke="#C6B09C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Feature icons: hand-drawn, single-stroke ---------- */

const stroke = {
  fill: "none",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const featureIcons = {
  shield: (p: SVGProps) => (
    <svg viewBox="0 0 24 24" {...stroke} stroke="currentColor" {...p}>
      <path d="M12 3.2 4.8 6v5.4c0 4.4 3 8.1 7.2 9.4 4.2-1.3 7.2-5 7.2-9.4V6L12 3.2Z" />
      <path d="m9 12 2.2 2.2L15.3 10" />
    </svg>
  ),
  apple: (p: SVGProps) => (
    <svg viewBox="0 0 24 24" {...stroke} stroke="currentColor" {...p}>
      <path d="M12 8.4c-1.6-1.6-4.2-1.8-5.9-.2-2 1.9-1.9 5.4.2 8.2 1.3 1.7 3 3 4.4 3 .6 0 .9-.2 1.3-.2s.7.2 1.3.2c1.4 0 3.1-1.3 4.4-3 2.1-2.8 2.2-6.3.2-8.2-1.7-1.6-4.3-1.4-5.9.2Z" />
      <path d="M12 8.4V5.6M12 5.6c0-1.4 1.2-2.4 2.7-2.4M12 5.6c-.7-.9-1.9-1.2-3-.8" />
    </svg>
  ),
  tree: (p: SVGProps) => (
    <svg viewBox="0 0 24 24" {...stroke} stroke="currentColor" {...p}>
      <path d="M12 3.5 6.4 11h3.1L5.6 16.4h12.8L14.5 11h3.1L12 3.5Z" />
      <path d="M12 16.4v4.1M9.6 20.5h4.8" />
    </svg>
  ),
  house: (p: SVGProps) => (
    <svg viewBox="0 0 24 24" {...stroke} stroke="currentColor" {...p}>
      <path d="M3.5 10.6 12 3.8l8.5 6.8" />
      <path d="M5.6 9v11.2h12.8V9" />
      <path d="M10 20.2v-5.1h4v5.1M8.8 6.2V4h2.4" />
    </svg>
  ),
  chat: (p: SVGProps) => (
    <svg viewBox="0 0 24 24" {...stroke} stroke="currentColor" {...p}>
      <path d="M20.3 12.4c0 3.8-3.7 6.9-8.3 6.9-1 0-2-.2-2.9-.4l-4.6 1.9 1.4-4a6.3 6.3 0 0 1-2.2-4.4c0-3.8 3.7-6.9 8.3-6.9s8.3 3.1 8.3 6.9Z" />
      <path d="M8.6 12h.01M12 12h.01M15.4 12h.01" />
    </svg>
  ),
  pencil: (p: SVGProps) => (
    <svg viewBox="0 0 24 24" {...stroke} stroke="currentColor" {...p}>
      <path d="M4.4 19.6 4 21l1.4-.4 12-12-1-1-12 12Z" />
      <path d="m16.4 7.6 2.6-2.6a1.4 1.4 0 0 0 0-2l-.9-.9a1.4 1.4 0 0 0-2 0l-2.6 2.6" />
      <path d="M4.6 19.4 8 20.8" />
    </svg>
  ),
  clock: (p: SVGProps) => (
    <svg viewBox="0 0 24 24" {...stroke} stroke="currentColor" {...p}>
      <circle cx="12" cy="12.6" r="8.2" />
      <path d="M12 8v4.6l3 1.9M9 2.4h6" />
    </svg>
  ),
  heart: (p: SVGProps) => (
    <svg viewBox="0 0 24 24" {...stroke} stroke="currentColor" {...p}>
      <path d="M12 20.3S3.8 15.6 3.8 9.9A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 8.2 2.3c0 5.7-8.2 10.4-8.2 10.4Z" />
    </svg>
  ),
} as const;

"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface RoomIllustrationProps {
  /** Scroll progress through the intro container, 0 to 1. Pass a constant
   * MotionValue of 1 (via useMotionValue(1)) to render every layer fully
   * built and static. Ignored when revealMode is true. */
  progress: MotionValue<number>;
  /** Mobile/reduced-motion fallback: each layer fades in via an ordinary
   * whileInView reveal, staggered grid then panels then board then
   * finished, instead of mapping opacity to scroll progress. */
  revealMode?: boolean;
}

/**
 * Isometric room, one shared back corner (400,200 at floor level, 400,20 at
 * ceiling level) so the floor, wall and ceiling planes tile together with no
 * gaps and no overlap. The wall's two stud lines belong to the always-visible
 * shell; the wall-board layer is a solid parallelogram painted over the same
 * footprint, on top of the shell in paint order, so it legitimately covers
 * the studs once "boarded."
 */
export default function RoomIllustration({
  progress,
  revealMode = false,
}: RoomIllustrationProps) {
  const gridOpacity = useTransform(progress, [0.15, 0.22], [0, 1]);
  const gridY = useTransform(progress, [0.15, 0.22], [12, 0]);
  const panelsOpacity = useTransform(progress, [0.4, 0.47], [0, 1]);
  const panelsY = useTransform(progress, [0.4, 0.47], [12, 0]);
  const boardOpacity = useTransform(progress, [0.65, 0.72], [0, 1]);
  const boardY = useTransform(progress, [0.65, 0.72], [12, 0]);
  const finishOpacity = useTransform(progress, [0.85, 0.92], [0, 1]);
  const finishY = useTransform(progress, [0.85, 0.92], [12, 0]);

  const revealProps = (index: number) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.4, delay: index * 0.15 },
  });

  return (
    <svg
      viewBox="0 0 800 600"
      className="h-full w-full"
      role="img"
      aria-label="An empty room being built, in isometric view: ceiling grid, ceiling panels, wall board and finished room"
    >
      {/* Always-visible shell: floor, bare wall framing (two studs, no
          board), and the open ceiling boundary (outline only). */}
      <g id="room-shell">
        <polygon
          points="400,200 680,340 400,480 120,340"
          fill="#faf7f3"
          stroke="#414141"
          strokeOpacity="0.18"
        />
        <polygon
          points="400,20 680,160 400,300 120,160"
          fill="none"
          stroke="#414141"
          strokeOpacity="0.22"
          strokeDasharray="6 6"
        />
        <polygon
          points="400,200 680,340 680,160 400,20"
          fill="none"
          stroke="#414141"
          strokeOpacity="0.22"
        />
        <line x1="493" y1="247" x2="493" y2="67" stroke="#414141" strokeOpacity="0.22" strokeWidth="2" />
        <line x1="587" y1="293" x2="587" y2="113" stroke="#414141" strokeOpacity="0.22" strokeWidth="2" />
      </g>

      {/* Ceiling grid: T-bar lines within the ceiling boundary. */}
      <motion.g
        id="ceiling-grid"
        style={revealMode ? undefined : { opacity: gridOpacity, y: gridY }}
        {...(revealMode ? revealProps(0) : {})}
      >
        <line x1="307" y1="67" x2="587" y2="207" stroke="#414141" strokeWidth="2" />
        <line x1="213" y1="113" x2="493" y2="253" stroke="#414141" strokeWidth="2" />
        <line x1="493" y1="67" x2="213" y2="207" stroke="#414141" strokeWidth="2" />
        <line x1="587" y1="113" x2="307" y2="253" stroke="#414141" strokeWidth="2" />
      </motion.g>

      {/* Ceiling panels: two tiles filling grid cells near the back and
          front corners of the ceiling. */}
      <motion.g
        id="ceiling-panels"
        style={revealMode ? undefined : { opacity: panelsOpacity, y: panelsY }}
        {...(revealMode ? revealProps(1) : {})}
      >
        <polygon points="400,20 493,67 400,114 307,67" fill="#ffffff" stroke="#414141" strokeOpacity="0.25" />
        <polygon points="400,300 493,253 400,206 307,253" fill="#ffffff" stroke="#414141" strokeOpacity="0.25" />
      </motion.g>

      {/* Wall board: solid panel painted over the shell's bare studs. */}
      <motion.g
        id="wall-board"
        style={revealMode ? undefined : { opacity: boardOpacity, y: boardY }}
        {...(revealMode ? revealProps(2) : {})}
      >
        <polygon
          points="400,200 680,340 680,160 400,20"
          fill="#ffffff"
          stroke="#90192c"
          strokeOpacity="0.2"
        />
      </motion.g>

      {/* Finished room: a paint swatch on the board, a ceiling light
          fixture, and a floor furnishing hint. */}
      <motion.g
        id="finished-room"
        style={revealMode ? undefined : { opacity: finishOpacity, y: finishY }}
        {...(revealMode ? revealProps(3) : {})}
      >
        <polygon points="470,230 590,295 590,235 470,170" fill="#90192c" fillOpacity="0.12" />
        <circle cx="400" cy="160" r="9" fill="#90192c" />
        <line x1="400" y1="151" x2="400" y2="130" stroke="#90192c" strokeWidth="2" />
        <rect x="350" y="410" width="100" height="42" rx="4" fill="#414141" fillOpacity="0.08" />
      </motion.g>
    </svg>
  );
}

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

export default function RoomIllustration({
  progress,
  revealMode = false,
}: RoomIllustrationProps) {
  const gridOpacity = useTransform(progress, [0.15, 0.22], [0, 1]);
  const gridY = useTransform(progress, [0.15, 0.22], [16, 0]);
  const panelsOpacity = useTransform(progress, [0.4, 0.47], [0, 1]);
  const panelsY = useTransform(progress, [0.4, 0.47], [16, 0]);
  const boardOpacity = useTransform(progress, [0.65, 0.72], [0, 1]);
  const boardY = useTransform(progress, [0.65, 0.72], [16, 0]);
  const finishOpacity = useTransform(progress, [0.85, 0.92], [0, 1]);
  const finishY = useTransform(progress, [0.85, 0.92], [16, 0]);

  const revealProps = (index: number) => ({
    initial: { opacity: 0, y: 16 },
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
      <g id="room-shell">
        <polygon
          points="80,420 400,540 720,420 400,300"
          fill="#faf7f3"
          stroke="#414141"
          strokeOpacity="0.13"
        />
        <polygon
          points="80,420 80,180 400,60 400,300"
          fill="#ffffff"
          stroke="#414141"
          strokeOpacity="0.13"
        />
        <polygon
          points="400,300 400,60 720,180 720,420"
          fill="#faf7f3"
          stroke="#414141"
          strokeOpacity="0.13"
        />
      </g>

      <motion.g
        id="ceiling-grid"
        style={revealMode ? undefined : { opacity: gridOpacity, y: gridY }}
        {...(revealMode ? revealProps(0) : {})}
      >
        <line x1="440" y1="90" x2="680" y2="210" stroke="#414141" strokeWidth="2" />
        <line x1="480" y1="70" x2="720" y2="190" stroke="#414141" strokeWidth="2" />
        <line x1="520" y1="50" x2="400" y2="110" stroke="#414141" strokeWidth="2" />
        <line x1="600" y1="90" x2="480" y2="150" stroke="#414141" strokeWidth="2" />
      </motion.g>

      <motion.g
        id="ceiling-panels"
        style={revealMode ? undefined : { opacity: panelsOpacity, y: panelsY }}
        {...(revealMode ? revealProps(1) : {})}
      >
        <polygon
          points="400,60 560,140 560,180 400,100"
          fill="#ffffff"
          stroke="#414141"
          strokeOpacity="0.2"
        />
        <polygon
          points="560,140 720,220 720,260 560,180"
          fill="#faf7f3"
          stroke="#414141"
          strokeOpacity="0.2"
        />
      </motion.g>

      <motion.g
        id="wall-board"
        style={revealMode ? undefined : { opacity: boardOpacity, y: boardY }}
        {...(revealMode ? revealProps(2) : {})}
      >
        <polygon
          points="400,300 400,60 720,180 720,420"
          fill="#ffffff"
          stroke="#90192c"
          strokeOpacity="0.13"
        />
      </motion.g>

      <motion.g
        id="finished-room"
        style={revealMode ? undefined : { opacity: finishOpacity, y: finishY }}
        {...(revealMode ? revealProps(3) : {})}
      >
        <circle cx="560" cy="140" r="10" fill="#90192c" />
        <rect x="140" y="380" width="90" height="60" rx="4" fill="#414141" fillOpacity="0.07" />
      </motion.g>
    </svg>
  );
}

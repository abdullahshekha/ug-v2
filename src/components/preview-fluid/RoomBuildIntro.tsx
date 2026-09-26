"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "framer-motion";
import RoomIllustration from "./RoomIllustration";
import { useReducedMotion } from "@/lib/useReducedMotion";

const callouts = [
  {
    key: "grid",
    name: "Smart Grid",
    copy: "Galvanized steel T-bar suspended ceiling system.",
    href: "/smart-grid/",
    range: [0.1, 0.16] as const,
  },
  {
    key: "panels",
    name: "Smart Ceiling Panel",
    copy: "Non-combustible gypsum core in vinyl-laminated or foil-backed finishes.",
    href: "/smart-ceiling-panel/",
    range: [0.35, 0.41] as const,
  },
  {
    key: "board",
    name: "Smart Gypsum Board",
    copy: "Incombustible gypsum core faced with extra-tough paper on both sides.",
    href: "/smart-gypsum-board/",
    range: [0.6, 0.66] as const,
  },
] as const;

function CalloutCard({
  name,
  copy,
  href,
  opacity,
}: {
  name: string;
  copy: string;
  href: string;
  opacity?: MotionValue<number>;
}) {
  return (
    <motion.div style={opacity ? { opacity } : undefined}>
      <Link
        href={href}
        className="block rounded-2xl border border-warm bg-white p-4 shadow-plaster transition-transform hover:-translate-y-1"
      >
        <h3 className="text-sm font-extrabold text-red">{name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-grey">{copy}</p>
      </Link>
    </motion.div>
  );
}

function IntroCopy({ calloutOpacities }: { calloutOpacities?: MotionValue<number>[] }) {
  return (
    <div>
      <span className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
        <span className="h-px w-6 bg-red" aria-hidden="true" />
        Watch the room come together
      </span>
      <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-grey sm:text-4xl lg:text-5xl">
        From an empty shell to a finished room, one system at a time
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-grey">
        Keep scrolling: the grid goes up, the panels drop in, the walls get
        boarded and the room comes to life, each step built from a real
        United Gypsum product.
      </p>
      <div className="mt-6 grid gap-3">
        {callouts.map((c, i) => (
          <CalloutCard
            key={c.key}
            name={c.name}
            copy={c.copy}
            href={c.href}
            opacity={calloutOpacities?.[i]}
          />
        ))}
      </div>
    </div>
  );
}

export default function RoomBuildIntro() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const staticProgress = useMotionValue(1);

  const gridCalloutOpacity = useTransform(scrollYProgress, [...callouts[0].range], [0.4, 1]);
  const panelsCalloutOpacity = useTransform(scrollYProgress, [...callouts[1].range], [0.4, 1]);
  const boardCalloutOpacity = useTransform(scrollYProgress, [...callouts[2].range], [0.4, 1]);
  const calloutOpacities = [gridCalloutOpacity, panelsCalloutOpacity, boardCalloutOpacity];

  if (reducedMotion) {
    return (
      <section className="bg-mist pt-28 lg:pt-32">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <IntroCopy />
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <RoomIllustration progress={staticProgress} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* The pinned/scrubbed intro is CSS-only below md and under
          prefers-reduced-motion (motion-reduce:), so a reduced-motion
          visitor never sees the 250vh/sticky layout even before this
          component's own JS branch above has a chance to run. */}
      <div
        ref={containerRef}
        className="relative hidden md:block md:h-[250vh] motion-reduce:!static motion-reduce:!h-auto"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-mist pt-28 lg:pt-32 motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible motion-reduce:py-16">
          <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-4 sm:px-8 md:grid-cols-2 lg:px-12">
            <IntroCopy calloutOpacities={calloutOpacities} />
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <RoomIllustration progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>

      <section className="bg-mist pt-28 md:hidden">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8">
          <IntroCopy />
          <div className="relative mx-auto mt-10 aspect-square w-full max-w-md">
            <RoomIllustration progress={staticProgress} revealMode />
          </div>
        </div>
      </section>
    </>
  );
}

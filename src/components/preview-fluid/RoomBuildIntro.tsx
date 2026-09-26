"use client";

import { useRef } from "react";
import Link from "next/link";
import { useMotionValue, useScroll } from "framer-motion";
import RoomIllustration from "./RoomIllustration";
import { useReducedMotion } from "@/lib/useReducedMotion";

const callouts = [
  {
    key: "grid",
    name: "Smart Grid",
    copy: "Galvanized steel T-bar suspended ceiling system.",
    href: "/smart-grid/",
  },
  {
    key: "panels",
    name: "Smart Ceiling Panel",
    copy: "Non-combustible gypsum core in vinyl-laminated or foil-backed finishes.",
    href: "/smart-ceiling-panel/",
  },
  {
    key: "board",
    name: "Smart Gypsum Board",
    copy: "Incombustible gypsum core faced with extra-tough paper on both sides.",
    href: "/smart-gypsum-board/",
  },
] as const;

function IntroCopy() {
  return (
    <div>
      <span className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
        <span className="h-px w-6 bg-red" aria-hidden="true" />
        Watch the room come together
      </span>
      <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-grey sm:text-5xl">
        From an empty shell to a finished room, one system at a time
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-grey">
        Keep scrolling: the grid goes up, the panels drop in, the walls get
        boarded and the room comes to life, each step built from a real
        United Gypsum product.
      </p>
      <div className="mt-8 grid gap-4">
        {callouts.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="rounded-2xl border border-warm bg-white p-5 shadow-plaster transition-transform hover:-translate-y-1"
          >
            <h3 className="text-sm font-extrabold text-red">{c.name}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-grey">
              {c.copy}
            </p>
          </Link>
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

  if (reducedMotion) {
    return (
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 lg:px-12">
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
      <div
        ref={containerRef}
        className="relative hidden md:block"
        style={{ height: "250vh" }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-mist">
          <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-4 sm:px-8 md:grid-cols-2 lg:px-12">
            <IntroCopy />
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <RoomIllustration progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>

      <section className="bg-mist md:hidden">
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

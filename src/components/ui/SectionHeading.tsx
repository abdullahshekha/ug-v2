import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <span
          className={`flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow ${
            centered ? "justify-center" : ""
          } ${tone === "dark" ? "text-brand-300" : "text-brand-800"}`}
        >
          <span
            className={`h-px w-6 ${tone === "dark" ? "bg-brand-300/60" : "bg-brand-800/50"}`}
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          tone === "dark" ? "text-white" : "text-plaster-800"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            tone === "dark" ? "text-plaster-200" : "text-plaster-600"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

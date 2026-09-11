"use client";

import { useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react";
import ShadeCardFlipbook from "@/components/shade-card/ShadeCardFlipbook";

export default function ShadeCardViewer({ pageCount }: { pageCount: number }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pageCount === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm font-bold text-red transition-colors hover:text-grey"
      >
        <BookOpen className="h-4 w-4" />
        Browse the shade card
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-grey">
          <div className="flex flex-shrink-0 items-center justify-between px-4 py-4 sm:px-8">
            <p className="text-sm font-bold text-white">
              Smart Ceiling Panel shade card
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close shade card"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="min-h-0 flex-1 px-2 pb-4 sm:px-6 sm:pb-8">
            <ShadeCardFlipbook pageCount={pageCount} />
          </div>
        </div>
      )}
    </>
  );
}

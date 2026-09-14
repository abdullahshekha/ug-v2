"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShadeCardFlipbookProps {
  pageCount: number;
}

// react-pageflip's ref exposes `.pageFlip()` returning the underlying
// StPageFlip instance (flipNext / flipPrev, etc).
interface PageFlipHandle {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
  };
}

export default function ShadeCardFlipbook({ pageCount }: ShadeCardFlipbookProps) {
  const bookRef = useRef<PageFlipHandle | null>(null);
  const [page, setPage] = useState(0);

  const handleFlip = useCallback((e: { data: number }) => {
    setPage(e.data);
  }, []);

  const goPrev = () => bookRef.current?.pageFlip().flipPrev();
  const goNext = () => bookRef.current?.pageFlip().flipNext();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* The book is centered by margin, with the arrows absolutely
       * positioned over its sides, rather than flexed alongside it: react-
       * pageflip's own "stretch" sizing does not play well as a flex item
       * (it ends up off-center), so give it an unambiguous fixed-width box
       * to measure instead. No height is reserved here with CSS (an
       * aspect-ratio box was tried and could disagree with what react-
       * pageflip actually renders at these larger sizes, leaving a visible
       * gap below the book): HTMLFlipBook sets its own container height via
       * inline style once mounted, so this wrapper is left to shrink-wrap
       * to that instead. */}
      <div className="relative mx-auto w-full max-w-[840px] py-4 sm:max-w-[1280px]">
        {/* @ts-expect-error -- react-pageflip's types don't model the generic ref/children shape precisely */}
        <HTMLFlipBook
          ref={bookRef}
          width={840}
          height={1188}
          minWidth={480}
          maxWidth={1280}
          minHeight={680}
          maxHeight={1810}
          size="stretch"
          showCover
          usePortrait
          drawShadow
          flippingTime={700}
          maxShadowOpacity={0.5}
          mobileScrollSupport={false}
          className="shade-card-book"
          style={{}}
          onFlip={handleFlip}
        >
          {Array.from({ length: pageCount }, (_, i) => (
            <div
              key={i}
              className="flex h-full w-full items-center justify-center overflow-hidden bg-white"
            >
              <Image
                src={`/images/shade-card/${i + 1}.jpg`}
                alt={`Smart Ceiling Panel shade card, page ${i + 1} of ${pageCount}`}
                width={1100}
                height={1559}
                className="h-full w-full object-contain"
                priority={i < 2}
              />
            </div>
          ))}
        </HTMLFlipBook>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous page"
          className="absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 flex-shrink-0 items-center justify-center rounded-full border border-warm bg-white text-grey shadow-plaster transition-colors hover:text-red"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next page"
          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 flex-shrink-0 items-center justify-center rounded-full border border-warm bg-white text-grey shadow-plaster transition-colors hover:text-red"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 flex-shrink-0 text-sm font-bold text-grey">
        Page {page + 1} of {pageCount}
      </p>
    </div>
  );
}

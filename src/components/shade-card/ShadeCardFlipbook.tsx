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
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full flex-1 items-center justify-center gap-2 overflow-hidden sm:gap-6">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous page"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-warm bg-white text-grey shadow-plaster transition-colors hover:text-red"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="h-full max-h-full w-full max-w-4xl py-4">
          {/* @ts-expect-error -- react-pageflip's types don't model the generic ref/children shape precisely */}
          <HTMLFlipBook
            ref={bookRef}
            width={420}
            height={594}
            minWidth={240}
            maxWidth={640}
            minHeight={340}
            maxHeight={905}
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
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next page"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-warm bg-white text-grey shadow-plaster transition-colors hover:text-red"
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

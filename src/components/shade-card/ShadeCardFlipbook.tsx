"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShadeCardFlipbookProps {
  pageCount: number;
}

// react-pageflip's ref exposes `.pageFlip()` returning the underlying
// StPageFlip instance (flipNext / flipPrev / getCurrentPageIndex, etc).
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
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-center">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous page"
          className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-warm bg-white text-grey shadow-plaster transition-colors hover:text-red sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="mx-2 sm:mx-6">
          {/* @ts-expect-error -- react-pageflip's types don't model the generic ref/children shape precisely */}
          <HTMLFlipBook
            ref={bookRef}
            width={380}
            height={538}
            minWidth={240}
            maxWidth={480}
            minHeight={340}
            maxHeight={680}
            size="stretch"
            showCover
            usePortrait
            drawShadow
            flippingTime={700}
            maxShadowOpacity={0.4}
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
          className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-warm bg-white text-grey shadow-plaster transition-colors hover:text-red sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4 sm:hidden">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous page"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-warm bg-white text-grey shadow-plaster"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold text-grey">
          Page {page + 1} / {pageCount}
        </span>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next page"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-warm bg-white text-grey shadow-plaster"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 hidden text-sm font-bold text-grey sm:block">
        Page {page + 1} of {pageCount}
      </p>
    </div>
  );
}

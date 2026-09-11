import ShadeCardFlipbook from "@/components/shade-card/ShadeCardFlipbook";

export default function ShadeCardViewer({ pageCount }: { pageCount: number }) {
  if (pageCount === 0) return null;

  return (
    <div className="h-[520px] sm:h-[640px]">
      <ShadeCardFlipbook pageCount={pageCount} />
    </div>
  );
}

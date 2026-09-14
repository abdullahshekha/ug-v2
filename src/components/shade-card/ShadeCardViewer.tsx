import ShadeCardFlipbook from "@/components/shade-card/ShadeCardFlipbook";

export default function ShadeCardViewer({ pageCount }: { pageCount: number }) {
  if (pageCount === 0) return null;

  return <ShadeCardFlipbook pageCount={pageCount} />;
}

import Image from "next/image";
import type { BlogSection } from "@/app/blogs/data";

function Table({ content }: { content: string }) {
  const rows = content.split(" || ").map((r) => r.split(" | "));
  if (rows.length === 0) return null;
  const [head, ...body] = rows;
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-warm">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-plaster-100">
            {head.map((c, i) => (
              <th key={i} className="px-4 py-3 font-extrabold text-plaster-800">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, ri) => (
            <tr
              key={ri}
              className="border-t border-warm bg-white even:bg-plaster-50"
            >
              {r.map((c, ci) => (
                <td key={ci} className="px-4 py-3 align-top text-plaster-600">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogArticle({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="max-w-prose">
      {sections.map((s, i) => {
        switch (s.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 text-2xl font-extrabold tracking-tight text-brand-800"
              >
                {s.content}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-8 text-lg font-extrabold text-plaster-800"
              >
                {s.content}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={i}
                className="mt-6 text-base font-extrabold text-plaster-800"
              >
                {s.content}
              </h4>
            );
          case "p":
            return (
              <p
                key={i}
                className="mt-4 text-base leading-relaxed text-plaster-700"
              >
                {s.content}
              </p>
            );
          case "ul":
          case "ol": {
            const items = s.content.split(" || ");
            const List = s.type === "ol" ? "ol" : "ul";
            return (
              <List
                key={i}
                className={`mt-4 space-y-2 pl-5 text-base leading-relaxed text-plaster-700 ${
                  s.type === "ol" ? "list-decimal" : "list-disc"
                }`}
              >
                {items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </List>
            );
          }
          case "img":
            return (
              <span
                key={i}
                className="mt-8 block overflow-hidden rounded-2xl border border-warm"
              >
                <Image
                  src={s.content}
                  alt={s.alt ?? ""}
                  width={1024}
                  height={576}
                  className="h-auto w-full object-cover"
                />
              </span>
            );
          case "table":
            return <Table key={i} content={s.content} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

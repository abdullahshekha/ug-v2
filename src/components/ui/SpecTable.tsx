export interface Spec {
  columns: string[];
  rows: string[][];
  note?: string;
}

export default function SpecTable({ spec }: { spec: Spec }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-warm">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-mist">
              {spec.columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 font-extrabold text-grey"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spec.rows.map((row, r) => (
              <tr
                key={r}
                className="border-t border-warm bg-white even:bg-mist"
              >
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`px-4 py-3 align-top ${
                      c === 0
                        ? "font-semibold text-grey"
                        : "text-grey"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-grey">
        {spec.note ??
          "Specifications are indicative. Confirm current figures with United Gypsum before ordering."}
      </p>
    </div>
  );
}

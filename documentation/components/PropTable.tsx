interface PropRow {
  prop: string;
  type: string;
  default?: string;
  description: string;
}

interface PropTableProps {
  rows: PropRow[];
}

export default function PropTable({ rows }: PropTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="bg-white/5 text-left">
            <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider border-b border-white/10 w-[18%]">
              Prop
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider border-b border-white/10 w-[26%]">
              Type
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider border-b border-white/10 w-[16%]">
              Default
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider border-b border-white/10">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.prop}
              className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.018]'}
            >
              <td className="px-4 py-2.5 border-b border-white/5 align-top">
                <code className="text-violet-300 text-xs font-mono">{row.prop}</code>
              </td>
              <td className="px-4 py-2.5 border-b border-white/5 align-top">
                <code className="text-sky-300 text-xs font-mono break-words">{row.type}</code>
              </td>
              <td className="px-4 py-2.5 border-b border-white/5 align-top">
                {row.default ? (
                  <code className="text-amber-300 text-xs font-mono">{row.default}</code>
                ) : (
                  <span className="text-white/20 text-xs">—</span>
                )}
              </td>
              <td className="px-4 py-2.5 border-b border-white/5 align-top text-white/55 text-sm leading-relaxed">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

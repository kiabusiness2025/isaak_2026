import { type ComparisonTable } from '@isaak/content';

type PricingComparisonTableProps = {
  table: ComparisonTable;
};

export function PricingComparisonTable({ table }: PricingComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-camel/30 bg-cream/70 shadow-glass">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="border-b border-camel/30 bg-beige/40 text-xs uppercase tracking-wide text-chocolate/60">
          <tr>
            <th className="px-5 py-3">Función</th>
            {table.planNames.map((name) => (
              <th key={name} className="px-5 py-3">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label} className="border-b border-camel/15 last:border-0">
              <td className="px-5 py-3 font-medium text-chocolate">{row.label}</td>
              {row.values.map((value, index) => (
                <td key={`${row.label}-${index}`} className="px-5 py-3 text-chocolate/70">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

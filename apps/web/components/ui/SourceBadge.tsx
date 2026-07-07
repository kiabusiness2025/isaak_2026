type SourceBadgeProps = {
  source: string;
};

export function SourceBadge({ source }: SourceBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-isaak-blue/25 bg-isaak-blue/5 px-2.5 py-1 text-[11px] font-medium text-isaak-blue shadow-[0_0_10px_rgba(47,94,158,0.15)]">
      <span className="h-1.5 w-1.5 rounded-full bg-isaak-blue" />
      Fuente: {source}
    </span>
  );
}

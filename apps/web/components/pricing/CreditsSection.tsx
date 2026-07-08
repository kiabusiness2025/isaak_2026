import { creditsSection } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';

export function CreditsSection() {
  return (
    <div>
      <SectionHeading title={creditsSection.title} body={creditsSection.body} align="left" />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <p className="text-xs font-semibold uppercase tracking-wide text-copper">
            Cuánto consume cada acción
          </p>
          <ul className="mt-3 space-y-2">
            {creditsSection.usageExamples.map((example) => (
              <li
                key={example.action}
                className="flex items-center justify-between gap-3 text-sm text-chocolate/75"
              >
                <span>{example.action}</span>
                <span className="shrink-0 font-medium text-chocolate">{example.credits}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="grid grid-cols-2 gap-3">
          {creditsSection.packs.map((pack) => (
            <div
              key={pack.id}
              className="rounded-xl border border-camel/30 bg-cream/70 p-4 text-center shadow-glass"
            >
              <p className="font-serif-display text-lg font-semibold text-chocolate">
                {pack.label}
              </p>
              <p className="mt-1 text-sm font-medium text-copper">{pack.price}</p>
              <p className="mt-1 text-xs text-chocolate/55">{pack.recommendedFor}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-xl space-y-1 text-center text-xs text-chocolate/50">
        {creditsSection.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </div>
  );
}

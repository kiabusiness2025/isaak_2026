import type { Metadata } from 'next';
import { aeatModels } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IsaakButton } from '@/components/ui/IsaakButton';

export const metadata: Metadata = {
  title: 'Calendario fiscal inteligente — Isaak',
  description:
    'El calendario fiscal no debería ser una tabla que visitas una vez al trimestre. Debería avisarte antes.',
};

const quarterlyModels = aeatModels.filter((m) => m.periodicity === 'Trimestral');

export default function CalendarioFiscalPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Calendario fiscal"
            title="El calendario fiscal no debería ser una tabla que visitas una vez al trimestre."
            body="Debería avisarte antes. Isaak convierte los plazos trimestrales en avisos que llegan con margen real."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-14 rounded-3xl border border-camel/30 bg-cream/70 p-6 shadow-glass sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-copper">
              Modelos trimestrales que Isaak vigila
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {quarterlyModels.map((model) => (
                <div
                  key={model.code}
                  className="rounded-xl border border-camel/20 bg-cream px-4 py-3 text-sm"
                >
                  <p className="font-semibold text-chocolate">Modelo {model.code}</p>
                  <p className="mt-1 text-chocolate/60">{model.name}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 text-center">
            <IsaakButton href="/demo">Ver cómo avisa Isaak</IsaakButton>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

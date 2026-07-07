import type { Metadata } from 'next';
import { aeatModels } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StatusPill } from '@/components/ui/StatusPill';

export const metadata: Metadata = {
  title: 'Modelos AEAT — Isaak',
  description:
    'Modelos AEAT explicados por Isaak: qué son, cuándo aplican y qué puede preparar.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: aeatModels.map((model) => ({
    '@type': 'Question',
    name: `¿Qué es el modelo ${model.code}?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `${model.name}. Periodicidad: ${model.periodicity}.`,
    },
  })),
};

export default function ModelosAeatPage() {
  return (
    <div className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Modelos AEAT"
            title="Hacienda publica los modelos. Isaak te explica cuáles importan para ti."
            body="No sabes si te afecta el modelo 303. Isaak sí sabe qué mirar."
          />
        </ScrollReveal>

        <div className="mt-14 overflow-hidden rounded-2xl border border-camel/30 bg-cream/70 shadow-glass">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-camel/30 bg-beige/40 text-xs uppercase tracking-wide text-chocolate/60">
              <tr>
                <th className="px-5 py-3">Modelo</th>
                <th className="px-5 py-3">Nombre</th>
                <th className="px-5 py-3">Área</th>
                <th className="px-5 py-3">Periodicidad</th>
              </tr>
            </thead>
            <tbody>
              {aeatModels.map((model) => (
                <tr key={model.code} className="border-b border-camel/15 last:border-0">
                  <td className="px-5 py-3 font-semibold text-chocolate">{model.code}</td>
                  <td className="px-5 py-3 text-chocolate/80">{model.name}</td>
                  <td className="px-5 py-3 text-chocolate/60">{model.area}</td>
                  <td className="px-5 py-3">
                    <StatusPill tone="neutral">{model.periodicity}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-xs text-chocolate/50">
          Fuente: catálogo público de modelos de la Agencia Tributaria. Revisar siempre la sede
          oficial antes de presentar.
        </p>
      </div>
    </div>
  );
}

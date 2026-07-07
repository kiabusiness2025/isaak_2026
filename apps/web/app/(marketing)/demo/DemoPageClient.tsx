'use client';

import { useState } from 'react';
import { demoSection } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { DemoScenarioCard, type DemoScenario } from '@/components/demo/DemoScenarioCard';
import { IsaakDemoChat } from '@/components/demo/IsaakDemoChat';

const SCENARIOS: DemoScenario[] = [
  {
    id: 'iva',
    title: 'Autónomo que pregunta por su IVA',
    description: 'Isaak cruza facturas emitidas y recibidas para estimar el IVA del trimestre.',
  },
  {
    id: 'cobros',
    title: 'Empresa que pregunta por cobros pendientes',
    description: 'Isaak revisa facturas y banco para decir quién debe pagar todavía.',
  },
  {
    id: 'notificacion',
    title: 'Notificación de Hacienda sin abrir',
    description: 'Isaak explica qué dice la carta y qué plazo tienes para responder.',
  },
  {
    id: 'resumen',
    title: 'Resumen semanal para empezar el proyecto',
    description: 'Isaak cruza factura, banco y modelo AEAT en un solo resumen preparado.',
  },
];

export function DemoPageClient() {
  const [selected, setSelected] = useState(SCENARIOS[0]!.id);

  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Demo"
            title="Isaak ayudando a alguien que acaba de empezar."
            body="Elige un escenario y mira cómo Isaak convierte una pregunta cualquiera en un resumen claro, con confirmación humana antes de cualquier acción."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {SCENARIOS.map((scenario) => (
            <DemoScenarioCard
              key={scenario.id}
              scenario={scenario}
              active={selected === scenario.id}
              onSelect={setSelected}
            />
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-camel/30 bg-beige/30 p-6 sm:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-copper">
            {demoSection.eyebrow}
          </p>
          <p className="mt-2 text-center font-serif-display text-2xl font-semibold text-chocolate">
            {demoSection.title}
          </p>
          <div className="mt-8">
            <IsaakDemoChat />
          </div>
        </div>
      </div>
    </div>
  );
}

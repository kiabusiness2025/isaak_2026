import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'Modelos y trámites — Isaak',
  description: 'Biblioteca de modelos y trámites que Isaak entiende y puede ayudarte a preparar.',
};

export default function ModelosPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Modelos"
            title="Modelos y trámites, explicados por Isaak."
            body="Una biblioteca creciente de modelos oficiales: qué son, a quién afectan y qué puede preparar Isaak."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Link href="/modelos/aeat" className="mt-14 block">
            <GlassCard>
              <p className="font-serif-display text-lg font-semibold text-chocolate">
                Modelos AEAT
              </p>
              <p className="mt-2 text-sm text-chocolate/70">
                IVA, IRPF, retenciones, resúmenes, censos, Sociedades y más.
              </p>
            </GlassCard>
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}

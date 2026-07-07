import type { Metadata } from 'next';
import Link from 'next/link';
import { connectorCategories } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'Conectores — Isaak',
  description: 'Catálogo neutral de conectores: programas, bancos, documentos y sedes electrónicas.',
};

export default function ConectoresPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Conectores"
            title="Tus programas hablan idiomas distintos. Isaak los traduce."
            body="Conecta lo que ya usas. Isaak no te obliga a cambiar tu forma de trabajar: la entiende."
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {connectorCategories.map((category, index) => (
            <ScrollReveal key={category.id} delay={index * 0.05}>
              <GlassCard className="h-full">
                <p className="font-serif-display text-lg font-semibold text-chocolate">
                  {category.label}
                </p>
                <p className="mt-2 text-sm text-chocolate/70">{category.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.examples.map((example) => (
                    <span
                      key={example}
                      className="rounded-full bg-beige/60 px-3 py-1 text-xs text-chocolate/70"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-14 flex flex-wrap justify-center gap-3">
            <Link
              href="/conectores/programas"
              className="rounded-full border border-camel/30 bg-cream/70 px-5 py-2 text-sm text-chocolate hover:border-isaak-blue"
            >
              Programas y ERP
            </Link>
            <Link
              href="/conectores/bancos"
              className="rounded-full border border-camel/30 bg-cream/70 px-5 py-2 text-sm text-chocolate hover:border-isaak-blue"
            >
              Bancos
            </Link>
            <Link
              href="/conectores/documentos"
              className="rounded-full border border-camel/30 bg-cream/70 px-5 py-2 text-sm text-chocolate hover:border-isaak-blue"
            >
              Documentos
            </Link>
            <Link
              href="/conectores/sedes-electronicas"
              className="rounded-full border border-camel/30 bg-cream/70 px-5 py-2 text-sm text-chocolate hover:border-isaak-blue"
            >
              Sedes electrónicas
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

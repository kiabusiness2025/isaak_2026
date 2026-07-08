import Link from 'next/link';
import { type ConnectorCategory } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { IsaakButton } from '@/components/ui/IsaakButton';

type ConnectorCategoryDetailProps = {
  category: ConnectorCategory;
};

export function ConnectorCategoryDetail({ category }: ConnectorCategoryDetailProps) {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Link href="/conectores" className="text-sm text-copper hover:underline">
          ← Todos los conectores
        </Link>

        <ScrollReveal>
          <div className="mt-6">
            <SectionHeading
              eyebrow="Conectores"
              title={category.label}
              body={category.description}
              align="left"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <GlassCard className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-copper">
              Ejemplos de este tipo de conector
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.examples.map((example) => (
                <span
                  key={example}
                  className="rounded-full bg-beige/60 px-3 py-1.5 text-sm text-chocolate/75"
                >
                  {example}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-chocolate/60">
              Ningún conector concreto domina la narrativa de Isaak: cada uno es una pieza más de
              una conversación única.
            </p>
          </GlassCard>
        </ScrollReveal>

        <div className="mt-10">
          <IsaakButton href="/demo">Ver demo</IsaakButton>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import { profesionalPage } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { IsaakButton } from '@/components/ui/IsaakButton';

export const metadata: Metadata = {
  title: 'Isaak Profesional — tu empresa en una conversación',
  description: profesionalPage.subtitle,
};

export default function ProfesionalPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={profesionalPage.eyebrow}
            title={profesionalPage.title}
            body={profesionalPage.subtitle}
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {profesionalPage.sections.map((section, index) => (
            <ScrollReveal key={section.title} delay={index * 0.05}>
              <GlassCard className="h-full">
                <p className="font-serif-display text-lg font-semibold text-chocolate">
                  {section.title}
                </p>
                <p className="mt-2 text-sm text-chocolate/70">{section.body}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 rounded-3xl border border-camel/30 bg-cream/70 p-8 shadow-glass sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
              Preguntas que puedes hacerle a Isaak
            </p>
            <ul className="mt-4 space-y-2 text-base text-chocolate/80">
              {profesionalPage.sampleQuestions.map((q) => (
                <li key={q}>“{q}”</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <IsaakButton href="/demo">Ver demo</IsaakButton>
              <IsaakButton href="/conectores" variant="secondary">
                Ver conectores
              </IsaakButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

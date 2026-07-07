import type { Metadata } from 'next';
import { personalPage } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { IsaakButton } from '@/components/ui/IsaakButton';

export const metadata: Metadata = {
  title: 'Isaak Personal — tus trámites, sin lenguaje de gestoría',
  description: personalPage.subtitle,
};

export default function PersonalPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={personalPage.eyebrow}
            title={personalPage.title}
            body={personalPage.subtitle}
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {personalPage.sections.map((section, index) => (
            <ScrollReveal key={section.title} delay={index * 0.06}>
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
              {personalPage.sampleQuestions.map((q) => (
                <li key={q}>“{q}”</li>
              ))}
            </ul>
            <div className="mt-6">
              <IsaakButton href="/demo">Ver demo</IsaakButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

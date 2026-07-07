import type { Metadata } from 'next';
import { securitySection } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { ActionPreparedPanel } from '@/components/demo/ActionPreparedPanel';

export const metadata: Metadata = {
  title: 'Seguridad — Isaak prepara. Tú confirmas.',
  description: securitySection.body,
};

export default function SeguridadPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={securitySection.eyebrow}
            title={securitySection.title}
            body={securitySection.body}
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {securitySection.cards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 0.08}>
              <GlassCard className="h-full">
                <p className="font-serif-display text-lg font-semibold text-chocolate">
                  {card.title}
                </p>
                <p className="mt-2 text-sm text-chocolate/70">{card.detail}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-14">
            <p className="mb-6 text-center text-sm font-medium text-chocolate/70">
              Así se ve una acción preparada antes de que la confirmes:
            </p>
            <ActionPreparedPanel />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

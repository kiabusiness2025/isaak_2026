import { securitySection } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { ConfirmationMoment } from '@/components/demo/ConfirmationMoment';

export function SecuritySection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={securitySection.eyebrow}
            title={securitySection.title}
            body={securitySection.body}
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="mx-auto mt-14 max-w-md rounded-3xl border border-camel/30 bg-cream/70 p-8 shadow-glass">
            <ConfirmationMoment />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

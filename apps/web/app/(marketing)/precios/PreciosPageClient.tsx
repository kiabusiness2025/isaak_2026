'use client';

import { useState } from 'react';
import {
  plans,
  comparisonTables,
  pricingPageHero,
  pricingHeader,
  addOns,
  planSelectorQuiz,
  pricingConditions,
  pricingClosing,
  type BillingCadence,
  type UsageTab,
} from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { IsaakButton } from '@/components/ui/IsaakButton';
import { PricingTabs } from '@/components/pricing/PricingTabs';
import { PricingBillingToggle } from '@/components/pricing/PricingBillingToggle';
import { PricingCard } from '@/components/pricing/PricingCard';
import { PricingComparisonTable } from '@/components/pricing/PricingComparisonTable';
import { CreditsSection } from '@/components/pricing/CreditsSection';
import { PricingFaq } from '@/components/pricing/PricingFaq';
import { AdvisorBetaForm } from '@/components/pricing/AdvisorBetaForm';

export function PreciosPageClient() {
  const [tab, setTab] = useState<UsageTab>('personal');
  const [cadence, setCadence] = useState<BillingCadence>('monthly');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const visiblePlans = plans.filter((plan) => plan.tab === tab);
  const comparisonTable = comparisonTables.find((table) => table.tab === tab) ?? comparisonTables[0];
  const selectedQuizOption = planSelectorQuiz.options.find((o) => o.id === quizAnswer);

  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading title={pricingPageHero.title} body={pricingPageHero.subtitle} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-6 flex justify-center">
            <IsaakButton href="/demo" size="lg">
              {pricingPageHero.cta}
            </IsaakButton>
          </div>
          <p className="mt-3 text-center text-xs text-chocolate/50">{pricingPageHero.microcopy}</p>
        </ScrollReveal>

        {/* Selector + cards */}
        <ScrollReveal delay={0.15}>
          <div className="mt-16">
            <PricingTabs value={tab} onChange={setTab} />
            <div className="mt-6">
              <PricingBillingToggle value={cadence} onChange={setCadence} />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} cadence={cadence} />
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-xl space-y-1 text-center text-xs text-chocolate/50">
              {pricingHeader.closing.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tabla comparativa */}
        <ScrollReveal delay={0.1}>
          <div className="mt-20">
            <SectionHeading
              eyebrow="Comparativa"
              title={`Todo lo que incluye cada plan de ${pricingHeader.tabs[tab]}`}
            />
            <div className="mt-8">
              {comparisonTable && <PricingComparisonTable table={comparisonTable} />}
            </div>
          </div>
        </ScrollReveal>

        {/* Créditos IA */}
        <div className="mt-20">
          <ScrollReveal>
            <CreditsSection />
          </ScrollReveal>
        </div>

        {/* Add-ons */}
        <ScrollReveal delay={0.1}>
          <div className="mt-20">
            <SectionHeading eyebrow="Add-ons" title="Amplía tu plan cuando lo necesites" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {addOns.map((addOn) => (
                <GlassCard key={addOn.id}>
                  <p className="font-serif-display text-lg font-semibold text-chocolate">
                    {addOn.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-copper">{addOn.price}</p>
                  <p className="mt-1 text-xs text-chocolate/55">Aplica a: {addOn.appliesTo}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Quiz qué plan necesito */}
        <ScrollReveal delay={0.1}>
          <div className="mt-20">
            <SectionHeading title={planSelectorQuiz.title} />
            <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-3">
              {planSelectorQuiz.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setQuizAnswer(option.id)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                    quizAnswer === option.id
                      ? 'border-isaak-blue bg-isaak-blue text-cream'
                      : 'border-camel/30 bg-cream/70 text-chocolate hover:border-copper'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {selectedQuizOption && (
              <GlassCard className="mx-auto mt-6 max-w-lg">
                <ul className="space-y-2 text-sm text-chocolate/80">
                  {selectedQuizOption.answer.map((line) => (
                    <li key={line}>→ {line}</li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </div>
        </ScrollReveal>

        {/* Asesorías beta form */}
        <ScrollReveal delay={0.1}>
          <div id="asesorias-beta" className="mt-20 scroll-mt-24">
            <SectionHeading eyebrow="Asesorías" title="¿Gestionas una asesoría? Prueba Isaak en beta." />
            <div className="mx-auto mt-8 max-w-2xl">
              <AdvisorBetaForm />
            </div>
          </div>
        </ScrollReveal>

        {/* Condiciones claras */}
        <ScrollReveal delay={0.1}>
          <div className="mt-20 rounded-3xl border border-camel/30 bg-beige/30 p-8 sm:p-10">
            <SectionHeading title={pricingConditions.title} align="left" />
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {pricingConditions.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-chocolate/75">
                  <span className="mt-0.5 text-copper">✓</span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <IsaakButton href="/legal/terminos" variant="secondary">
                {pricingConditions.cta}
              </IsaakButton>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQ de precios */}
        <div className="mt-20">
          <ScrollReveal>
            <PricingFaq />
          </ScrollReveal>
        </div>

        {/* CTA final */}
        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-20 max-w-lg text-center font-serif-display text-xl font-semibold text-chocolate">
            {pricingClosing}
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}

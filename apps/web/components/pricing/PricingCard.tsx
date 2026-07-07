import { type PricingPlan, type BillingCadence } from '@isaak/content';
import { IsaakButton } from '@/components/ui/IsaakButton';
import { StatusPill } from '@/components/ui/StatusPill';

type PricingCardProps = {
  plan: PricingPlan;
  cadence: BillingCadence;
};

export function PricingCard({ plan, cadence }: PricingCardProps) {
  const price = cadence === 'monthly' ? plan.monthlyPrice : plan.annualMonthlyEquivalent;
  const isFree = price === 0;
  const isComingSoon = plan.badge === 'proximamente';

  return (
    <div
      className={`flex h-full flex-col rounded-3xl border p-6 shadow-glass ${
        plan.badge === 'popular'
          ? 'border-isaak-blue bg-isaak-blue/[0.04] shadow-lift'
          : 'border-camel/30 bg-cream/70'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-serif-display text-xl font-semibold text-chocolate">{plan.name}</p>
        {plan.badge === 'popular' && <StatusPill tone="ready">Más elegido</StatusPill>}
        {isComingSoon && <StatusPill tone="warning">Próximamente</StatusPill>}
      </div>
      <p className="mt-2 text-sm text-chocolate/65">{plan.tagline}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-serif-display text-4xl font-semibold text-chocolate">
          {isFree ? '0€' : `${price}€`}
        </span>
        {!isFree && <span className="text-sm text-chocolate/55">/mes</span>}
      </div>
      {cadence === 'annual' && !isFree && (
        <p className="mt-1 text-xs text-copper">Facturado anualmente · 2 meses gratis</p>
      )}
      {plan.trialDays && (
        <p className="mt-1 text-xs text-chocolate/55">{plan.trialDays} días de prueba</p>
      )}

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-chocolate/80">
            <span className="mt-0.5 text-isaak-blue">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <IsaakButton
          href="/demo"
          variant={plan.badge === 'popular' ? 'primary' : 'secondary'}
          className="w-full justify-center"
        >
          {isFree ? 'Empezar gratis' : isComingSoon ? 'Unirme a la lista' : 'Empezar prueba'}
        </IsaakButton>
      </div>
    </div>
  );
}

import { type Plan, type BillingCadence } from '@isaak/content';
import { IsaakButton } from '@/components/ui/IsaakButton';
import { StatusPill } from '@/components/ui/StatusPill';

type PricingCardProps = {
  plan: Plan;
  cadence: BillingCadence;
};

function formatPrice(plan: Plan, cadence: BillingCadence) {
  if (plan.monthlyPrice === null || plan.annualPrice === null) {
    return { headline: 'Próximamente', note: null as string | null };
  }
  if (plan.monthlyPrice === 0) {
    return { headline: '0 €', note: null };
  }
  if (cadence === 'monthly') {
    return { headline: `${plan.monthlyPrice} € + IVA`, note: '/mes' };
  }
  const monthlyEquivalent = (plan.annualPrice / 12).toFixed(2).replace('.00', '');
  return {
    headline: `${plan.annualPrice} € + IVA`,
    note: `/año · equivale a ${monthlyEquivalent} €/mes`,
  };
}

export function PricingCard({ plan, cadence }: PricingCardProps) {
  const price = formatPrice(plan, cadence);
  const isComingSoon = plan.status === 'proximamente';
  const isBeta = plan.status === 'beta';

  return (
    <div
      className={`flex h-full flex-col rounded-3xl border p-6 shadow-glass ${
        plan.recommended
          ? 'border-isaak-blue bg-isaak-blue/[0.04] shadow-lift'
          : 'border-camel/30 bg-cream/70'
      } ${isComingSoon ? 'relative overflow-hidden' : ''}`}
    >
      {isComingSoon && (
        <div className="pointer-events-none absolute inset-0 bg-copper/[0.06]" aria-hidden="true" />
      )}

      <div className="relative flex items-center justify-between gap-2">
        <p className="font-serif-display text-xl font-semibold text-chocolate">{plan.name}</p>
        {plan.recommended && <StatusPill tone="ready">Recomendado</StatusPill>}
        {isComingSoon && <StatusPill tone="warning">Próximamente</StatusPill>}
        {isBeta && <StatusPill tone="warning">Beta privada</StatusPill>}
      </div>
      <p className="relative mt-2 text-sm text-chocolate/65">{plan.tagline}</p>

      <div className="relative mt-6 flex flex-wrap items-baseline gap-1">
        <span className="font-serif-display text-3xl font-semibold text-chocolate">
          {price.headline}
        </span>
        {price.note && <span className="text-xs text-chocolate/55">{price.note}</span>}
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-2 text-xs text-chocolate/60">
        <div>
          <p className="font-semibold text-copper">Créditos IA</p>
          <p>{plan.aiCreditsPerMonth}</p>
        </div>
        <div>
          <p className="font-semibold text-copper">Usuarios</p>
          <p>{plan.usersIncluded}</p>
        </div>
        {plan.veriFactuInvoicesPerMonth && (
          <div className="col-span-2">
            <p className="font-semibold text-copper">Facturas VeriFactu</p>
            <p>{plan.veriFactuInvoicesPerMonth}</p>
          </div>
        )}
      </div>

      <ul className="relative mt-6 flex-1 space-y-2.5">
        {plan.featuresIncluded.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-chocolate/80">
            <span className="mt-0.5 text-isaak-blue">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative mt-8">
        <IsaakButton
          href={isBeta || isComingSoon ? '/precios#asesorias-beta' : '/demo'}
          variant={plan.recommended ? 'primary' : 'secondary'}
          className="w-full justify-center"
        >
          {plan.cta}
        </IsaakButton>
      </div>
    </div>
  );
}

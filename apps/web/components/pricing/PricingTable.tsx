'use client';

import { useState } from 'react';
import { plans, pricingHeader, type BillingCadence, type UsageTab } from '@isaak/content';
import { PricingTabs } from './PricingTabs';
import { PricingBillingToggle } from './PricingBillingToggle';
import { PricingCard } from './PricingCard';

export function PricingTable() {
  const [tab, setTab] = useState<UsageTab>('personal');
  const [cadence, setCadence] = useState<BillingCadence>('monthly');

  const visiblePlans = plans.filter((plan) => plan.tab === tab);

  return (
    <div>
      <PricingTabs value={tab} onChange={setTab} />

      <div className="mt-6">
        <PricingBillingToggle value={cadence} onChange={setCadence} />
      </div>

      <p className="mt-4 text-center text-sm text-chocolate/60">
        14 días de prueba en todos los planes de pago. Sin tarjeta para empezar.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} cadence={cadence} />
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-xl space-y-1 text-center text-xs text-chocolate/50">
        {pricingHeader.closing.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

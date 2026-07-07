'use client';

import { useState } from 'react';
import { pricingPlans, pricingHeader, type BillingCadence } from '@isaak/content';
import { PricingCard } from './PricingCard';

export function PricingTable() {
  const [cadence, setCadence] = useState<BillingCadence>('monthly');

  return (
    <div>
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-camel/30 bg-cream/70 p-1">
        {(['monthly', 'annual'] as BillingCadence[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setCadence(option)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              cadence === option ? 'bg-isaak-blue text-cream' : 'text-chocolate/70'
            }`}
          >
            {pricingHeader.cadenceCopy[option]}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-chocolate/60">{pricingHeader.trialCopy}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} cadence={cadence} />
        ))}
      </div>
    </div>
  );
}

'use client';

import { pricingHeader, type BillingCadence } from '@isaak/content';

type PricingBillingToggleProps = {
  value: BillingCadence;
  onChange: (cadence: BillingCadence) => void;
};

const CADENCES: BillingCadence[] = ['monthly', 'annual'];

export function PricingBillingToggle({ value, onChange }: PricingBillingToggleProps) {
  return (
    <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-camel/30 bg-cream/70 p-1">
      {CADENCES.map((cadence) => (
        <button
          key={cadence}
          type="button"
          onClick={() => onChange(cadence)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            value === cadence ? 'bg-isaak-blue text-cream' : 'text-chocolate/70'
          }`}
        >
          {pricingHeader.cadenceCopy[cadence]}
        </button>
      ))}
    </div>
  );
}

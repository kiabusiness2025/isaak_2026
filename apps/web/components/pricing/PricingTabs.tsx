'use client';

import { pricingHeader, type UsageTab } from '@isaak/content';

type PricingTabsProps = {
  value: UsageTab;
  onChange: (tab: UsageTab) => void;
};

const TABS: UsageTab[] = ['personal', 'profesional', 'asesorias'];

export function PricingTabs({ value, onChange }: PricingTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Uso"
      className="mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-full border border-camel/30 bg-cream/70 p-1"
    >
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={value === tab}
          onClick={() => onChange(tab)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            value === tab ? 'bg-chocolate text-cream' : 'text-chocolate/70'
          }`}
        >
          {pricingHeader.tabs[tab]}
        </button>
      ))}
    </div>
  );
}

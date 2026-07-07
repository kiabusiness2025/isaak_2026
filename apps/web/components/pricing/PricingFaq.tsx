'use client';

import { useState } from 'react';
import { pricingFaqItems, type FaqItem } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

function PricingFaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-camel/30 bg-cream/70">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-chocolate">{item.question}</span>
        <span
          className={`shrink-0 text-lg text-copper transition-transform ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm leading-relaxed text-chocolate/70">{item.answer}</div>
      )}
    </div>
  );
}

export function PricingFaq() {
  return (
    <div>
      <SectionHeading eyebrow="FAQ de precios" title="Preguntas frecuentes sobre planes y créditos" />
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {pricingFaqItems.map((item) => (
          <PricingFaqRow key={item.question} item={item} />
        ))}
      </div>
    </div>
  );
}

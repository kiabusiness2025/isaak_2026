'use client';

import { useState } from 'react';
import { faqItems, type FaqItem } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-camel/30 bg-cream/70">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-chocolate sm:text-base">{item.question}</span>
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

type FaqSectionProps = {
  compact?: boolean;
};

export function FaqSection({ compact = false }: FaqSectionProps) {
  const items = compact ? faqItems.slice(0, 3) : faqItems;

  return (
    <section className={compact ? 'py-20 sm:py-28' : 'py-16'}>
      <div className="mx-auto max-w-3xl px-6">
        {compact && (
          <ScrollReveal>
            <SectionHeading eyebrow="FAQ" title="Preguntas frecuentes" />
          </ScrollReveal>
        )}
        <div className="mt-10 space-y-3">
          {items.map((item) => (
            <FaqRow key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

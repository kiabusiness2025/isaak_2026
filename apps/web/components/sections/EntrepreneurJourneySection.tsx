'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { journey } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type Mode = 'antes' | 'despues';

export function EntrepreneurJourneySection() {
  const [mode, setMode] = useState<Mode>('antes');
  const items = mode === 'antes' ? journey.before : journey.after;

  return (
    <section className="bg-beige/30 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow={journey.eyebrow} title={journey.title} />
        </ScrollReveal>

        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-camel/30 bg-cream p-1">
            {(['antes', 'despues'] as Mode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={`rounded-full px-5 py-1.5 text-sm font-medium capitalize transition-colors ${
                  mode === option ? 'bg-chocolate text-cream' : 'text-chocolate/70'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <motion.ul
          key={mode}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className={`mx-auto mt-10 max-w-xl space-y-3 ${mode === 'antes' ? 'opacity-90' : ''}`}
        >
          {items.map((item) => (
            <motion.li
              key={item}
              variants={{
                hidden: { opacity: 0, x: mode === 'antes' ? -8 : 8 },
                visible: { opacity: 1, x: 0 },
              }}
              className={`rounded-xl border px-5 py-3 text-sm font-medium shadow-glass ${
                mode === 'antes'
                  ? 'border-copper/30 bg-cream/60 text-chocolate/70'
                  : 'border-isaak-blue/30 bg-isaak-blue/5 text-chocolate'
              }`}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-10 space-y-1 text-center text-base text-chocolate/75">
          {journey.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

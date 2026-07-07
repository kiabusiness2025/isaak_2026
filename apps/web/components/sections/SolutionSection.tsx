'use client';

import { motion } from 'framer-motion';
import { solution } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function SolutionSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow={solution.eyebrow} title={solution.title} body={solution.body} />
        </ScrollReveal>

        <div className="relative mx-auto mt-16 flex h-[320px] max-w-2xl items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full bg-chocolate shadow-lift" />
          {solution.nodes.map((node, index) => {
            const angle = (index / solution.nodes.length) * Math.PI * 2;
            const radius = 44;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            return (
              <motion.div
                key={node}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-camel/40 bg-cream px-3 py-2 text-center text-xs font-medium text-chocolate shadow-glass"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {node}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

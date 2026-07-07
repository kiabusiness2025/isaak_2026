'use client';

import { motion } from 'framer-motion';
import { problem } from '@isaak/content';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ProblemSection() {
  return (
    <section className="bg-beige/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
              {problem.eyebrow}
            </p>
            <blockquote className="border-l-2 border-copper/50 pl-4 text-base italic text-chocolate/70">
              “{problem.scenario}”
            </blockquote>
            <h2 className="mt-6 font-serif-display text-3xl font-semibold leading-tight text-chocolate sm:text-4xl">
              {problem.title}
            </h2>
            <ul className="mt-6 space-y-2 text-base text-chocolate/75">
              {problem.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="mt-6 space-y-1 text-base font-medium text-chocolate">
              {problem.resolution.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative mx-auto grid max-w-sm grid-cols-2 gap-3">
              {[
                'Facturas',
                'Banco',
                'Correo',
                'Documentos',
                'Modelo 303',
                'Notificación',
              ].map((label, index) => (
                <motion.div
                  key={label}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [-3, 3, -2, 2, 0][index % 5] }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="rounded-xl border border-camel/40 bg-cream/80 px-4 py-6 text-center text-sm font-medium text-chocolate/70 shadow-glass"
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

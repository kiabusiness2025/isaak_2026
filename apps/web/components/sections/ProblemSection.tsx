'use client';

import { motion } from 'framer-motion';
import { problem } from '@isaak/content';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IsaakCharacter } from '@/components/hero/IsaakCharacter';

type ChaosCard = {
  label: string;
  chaos: { x: number; y: number; rotate: number };
  settled: { x: number; y: number };
};

// Cada tarjeta nace dispersa (posición/rotación "caótica") y converge, al entrar
// en el viewport, hacia una lista ordenada junto a Isaak — la sección entera es
// la animación "chaos-to-clarity": lo que se mueve es el desorden, no un adorno.
const CHAOS_CARDS: ChaosCard[] = [
  { label: 'Facturas', chaos: { x: 8, y: 18, rotate: -12 }, settled: { x: 150, y: 6 } },
  { label: 'Banco', chaos: { x: 150, y: 4, rotate: 9 }, settled: { x: 150, y: 54 } },
  { label: 'Correo', chaos: { x: 0, y: 130, rotate: -8 }, settled: { x: 150, y: 102 } },
  { label: 'Documentos', chaos: { x: 165, y: 165, rotate: 14 }, settled: { x: 150, y: 150 } },
  { label: 'Modelo 303', chaos: { x: 55, y: 220, rotate: -6 }, settled: { x: 150, y: 198 } },
  { label: 'Notificación', chaos: { x: 175, y: 250, rotate: 10 }, settled: { x: 150, y: 246 } },
];

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
            <div className="relative mx-auto h-[320px] w-full max-w-sm">
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <IsaakCharacter size={104} state="idle" />
              </div>

              {CHAOS_CARDS.map((card, index) => (
                <motion.div
                  key={card.label}
                  className="absolute left-0 top-0 w-32 rounded-xl border border-camel/40 bg-cream/80 px-3 py-4 text-center text-sm font-medium text-chocolate/70 shadow-glass"
                  initial={{ x: card.chaos.x, y: card.chaos.y, rotate: card.chaos.rotate, opacity: 0 }}
                  whileInView={{ x: card.settled.x, y: card.settled.y, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9, delay: 0.15 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {card.label}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { hero } from '@isaak/content';
import { IsaakButton } from '@/components/ui/IsaakButton';
import { OrbitalLines } from './OrbitalLines';
import { IsaakCharacter } from './IsaakCharacter';
import { FloatingCards, FloatingCardsStrip } from './FloatingCards';
import { EntrepreneurScenario } from './EntrepreneurScenario';
import { useIsaakTimeline } from './useIsaakTimeline';

export function RetroHeroScene() {
  const characterState = useIsaakTimeline();

  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 min-w-0 max-w-xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-copper">
            {hero.eyebrow}
          </p>
          <h1 className="font-serif-display text-4xl font-semibold leading-[1.08] text-chocolate sm:text-5xl lg:text-[3.2rem]">
            {hero.title}
            <br />
            <span className="text-isaak-blue">{hero.titleLine2}</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-chocolate/75">{hero.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <IsaakButton href="/precios" size="lg">
              {hero.ctaPrimary}
            </IsaakButton>
            <IsaakButton href="/demo" variant="secondary" size="lg">
              {hero.ctaSecondary}
            </IsaakButton>
          </div>

          <p className="mt-4 text-sm text-chocolate/55">{hero.microcopy}</p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 border-l-2 border-copper/50 pl-4 font-serif-display text-lg italic text-chocolate/70"
          >
            No abras diez pestañas. Abre una conversación.
          </motion.p>

          <div className="mt-8">
            <FloatingCardsStrip />
          </div>
        </motion.div>

        <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[380px] lg:min-h-[560px]">
          <OrbitalLines />
          <div className="relative z-0 flex flex-col items-center gap-6">
            <div className="-my-16 scale-[0.62] sm:-my-8 sm:scale-[0.8] lg:my-0 lg:scale-100">
              <IsaakCharacter state={characterState} variant="full" size={340} />
            </div>
            <div className="w-full max-w-[22rem] lg:max-w-xs lg:translate-x-8">
              <EntrepreneurScenario />
            </div>
          </div>
          <FloatingCards />
        </div>
      </div>
    </section>
  );
}

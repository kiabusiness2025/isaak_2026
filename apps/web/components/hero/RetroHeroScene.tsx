'use client';

import { motion } from 'framer-motion';
import { hero } from '@isaak/content';
import { IsaakButton } from '@/components/ui/IsaakButton';
import { OrbitalLines } from './OrbitalLines';
import { IsaakCharacter } from './IsaakCharacter';
import { FloatingCards } from './FloatingCards';
import { EntrepreneurScenario } from './EntrepreneurScenario';

export function RetroHeroScene() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-xl"
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
        </motion.div>

        <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[560px]">
          <OrbitalLines />
          <FloatingCards />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <IsaakCharacter />
            <div className="w-full max-w-[22rem] lg:absolute lg:-bottom-4 lg:right-[-2rem] lg:max-w-xs">
              <EntrepreneurScenario />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

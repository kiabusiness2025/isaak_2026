import { finalCta } from '@isaak/content';
import { IsaakButton } from '@/components/ui/IsaakButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IsaakCharacter } from '@/components/hero/IsaakCharacter';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-cta-gradient py-24 text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30"
      >
        <div className="h-[420px] w-[420px] animate-orbit-spin rounded-full border border-copper/40" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <div className="mx-auto mb-8 flex justify-center">
            <IsaakCharacter size={140} state="confirmed" />
          </div>
          <h2 className="font-serif-display text-3xl font-semibold leading-tight sm:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-cream/75">{finalCta.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <IsaakButton href="/precios" size="lg">
              {finalCta.ctaPrimary}
            </IsaakButton>
            <IsaakButton
              href="/demo"
              variant="secondary"
              size="lg"
              className="border-cream/30 text-cream hover:border-cream hover:text-cream"
            >
              {finalCta.ctaSecondary}
            </IsaakButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

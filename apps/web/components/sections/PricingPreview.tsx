import { pricingPreview } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PricingTable } from '@/components/pricing/PricingTable';
import { IsaakButton } from '@/components/ui/IsaakButton';

export function PricingPreview() {
  return (
    <section className="bg-beige/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow={pricingPreview.eyebrow} title={pricingPreview.title} />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12">
            <PricingTable />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex justify-center">
            <IsaakButton href="/precios" variant="secondary">
              Ver todos los precios
            </IsaakButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

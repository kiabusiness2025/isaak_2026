import { pricingPreview } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PricingTable } from '@/components/pricing/PricingTable';

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
      </div>
    </section>
  );
}

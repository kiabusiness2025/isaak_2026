import type { Metadata } from 'next';
import { pricingHeader, pricingFootnotes } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PricingTable } from '@/components/pricing/PricingTable';
import { FaqSection } from '@/components/sections/FaqSection';

export const metadata: Metadata = {
  title: 'Precios — Isaak',
  description: pricingHeader.subtitle,
};

export default function PreciosPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading title={pricingHeader.title} body={pricingHeader.subtitle} />
        </ScrollReveal>

        <div className="mt-14">
          <PricingTable />
        </div>

        <div className="mx-auto mt-10 max-w-xl space-y-1 text-center text-xs text-chocolate/50">
          {pricingFootnotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <FaqSection compact />
      </div>
    </div>
  );
}

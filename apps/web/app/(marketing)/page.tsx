import type { Metadata } from 'next';
import { demoSection } from '@isaak/content';
import { RetroHeroScene } from '@/components/hero/RetroHeroScene';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { EntrepreneurJourneySection } from '@/components/sections/EntrepreneurJourneySection';
import { ConnectorsSection } from '@/components/sections/ConnectorsSection';
import { OfficialSitesSection } from '@/components/sections/OfficialSitesSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { SecuritySection } from '@/components/sections/SecuritySection';
import { PricingPreview } from '@/components/sections/PricingPreview';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IsaakDemoChat } from '@/components/demo/IsaakDemoChat';

export const metadata: Metadata = {
  title: 'Isaak — el personaje inteligente que ordena tu caos administrativo',
};

export default function HomePage() {
  return (
    <>
      <RetroHeroScene />
      <ProblemSection />
      <SolutionSection />
      <EntrepreneurJourneySection />
      <ConnectorsSection />
      <OfficialSitesSection />

      <section className="bg-beige/30 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <SectionHeading eyebrow={demoSection.eyebrow} title={demoSection.title} />
          </ScrollReveal>
          <div className="mt-12">
            <IsaakDemoChat />
          </div>
        </div>
      </section>

      <UseCasesSection />
      <SecuritySection />
      <PricingPreview />
      <FaqSection compact />
      <FinalCTA />
    </>
  );
}

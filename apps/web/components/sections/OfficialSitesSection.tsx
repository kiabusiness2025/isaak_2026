import { officialSitesSection } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { OfficialSitesConstellation } from '@/components/orbit/OfficialSitesConstellation';

export function OfficialSitesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={officialSitesSection.eyebrow}
            title={officialSitesSection.title}
            body={officialSitesSection.body}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-14">
            <OfficialSitesConstellation />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

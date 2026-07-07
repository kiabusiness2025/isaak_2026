import { connectorsSection } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { OrbitalConnectorMap } from '@/components/orbit/OrbitalConnectorMap';

export function ConnectorsSection() {
  return (
    <section className="bg-beige/30 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={connectorsSection.eyebrow}
            title={connectorsSection.title}
            body={connectorsSection.body}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-14">
            <OrbitalConnectorMap />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

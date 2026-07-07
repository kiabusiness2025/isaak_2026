import type { Metadata } from 'next';
import { officialSitesSection } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { OfficialSitesConstellation } from '@/components/orbit/OfficialSitesConstellation';
import { IsaakButton } from '@/components/ui/IsaakButton';

export const metadata: Metadata = {
  title: 'Sedes electrónicas — Isaak también entiende la Administración',
  description: officialSitesSection.body,
};

export default function SedesElectronicasPage() {
  return (
    <div className="py-20 sm:py-28">
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

        <ScrollReveal delay={0.2}>
          <div className="mt-14 rounded-3xl border border-camel/30 bg-beige/30 p-8 text-center shadow-glass sm:p-10">
            <p className="font-serif-display text-xl font-semibold text-chocolate">
              Isaak prepara. Tú confirmas.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-chocolate/70">
              El acceso a información autenticada y la respuesta a notificaciones oficiales
              siempre requieren tu confirmación explícita.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <IsaakButton href="/seguridad" variant="secondary">
                Ver cómo funciona la seguridad
              </IsaakButton>
              <IsaakButton href="/demo">Ver demo</IsaakButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

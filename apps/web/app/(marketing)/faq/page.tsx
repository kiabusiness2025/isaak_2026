import type { Metadata } from 'next';
import { faqItems } from '@isaak/content';
import { FaqSection } from '@/components/sections/FaqSection';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes — Isaak',
  description: 'Resolvemos las dudas más habituales sobre qué es Isaak y qué puede hacer por ti.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqSection compact />
    </>
  );
}

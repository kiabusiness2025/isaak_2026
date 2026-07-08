import type { Metadata } from 'next';
import { pricingPageHero } from '@isaak/content';
import { PreciosPageClient } from './PreciosPageClient';

export const metadata: Metadata = {
  title: 'Precios — Isaak',
  description: pricingPageHero.subtitle,
};

export default function PreciosPage() {
  return <PreciosPageClient />;
}

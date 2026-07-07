import type { Metadata } from 'next';
import { DemoPageClient } from './DemoPageClient';

export const metadata: Metadata = {
  title: 'Demo — Isaak en acción',
  description:
    'Mira cómo Isaak convierte una pregunta cualquiera en un resumen claro, con confirmación humana antes de cualquier acción.',
};

export default function DemoPage() {
  return <DemoPageClient />;
}

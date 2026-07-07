import type { Metadata } from 'next';
import { connectorCategories } from '@isaak/content';
import { ConnectorCategoryDetail } from '@/components/sections/ConnectorCategoryDetail';

const category = connectorCategories.find((c) => c.id === 'sedes')!;

export const metadata: Metadata = {
  title: `${category.label} — Conectores Isaak`,
  description: category.description,
};

export default function SedesConectoresPage() {
  return <ConnectorCategoryDetail category={category} />;
}

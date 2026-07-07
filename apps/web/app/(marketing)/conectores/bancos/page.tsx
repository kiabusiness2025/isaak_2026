import type { Metadata } from 'next';
import { connectorCategories } from '@isaak/content';
import { ConnectorCategoryDetail } from '@/components/sections/ConnectorCategoryDetail';

const category = connectorCategories.find((c) => c.id === 'bancos')!;

export const metadata: Metadata = {
  title: `${category.label} — Conectores Isaak`,
  description: category.description,
};

export default function BancosConectoresPage() {
  return <ConnectorCategoryDetail category={category} />;
}

'use client';

import { motion } from 'framer-motion';

export type DemoScenario = {
  id: string;
  title: string;
  description: string;
};

type DemoScenarioCardProps = {
  scenario: DemoScenario;
  active: boolean;
  onSelect: (id: string) => void;
};

export function DemoScenarioCard({ scenario, active, onSelect }: DemoScenarioCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(scenario.id)}
      whileHover={{ y: -3 }}
      className={`w-full rounded-2xl border p-5 text-left shadow-glass transition-colors ${
        active
          ? 'border-isaak-blue bg-isaak-blue/5'
          : 'border-camel/30 bg-cream/70 hover:border-camel/60'
      }`}
    >
      <p className="text-sm font-semibold text-chocolate">{scenario.title}</p>
      <p className="mt-1.5 text-sm text-chocolate/65">{scenario.description}</p>
    </motion.button>
  );
}

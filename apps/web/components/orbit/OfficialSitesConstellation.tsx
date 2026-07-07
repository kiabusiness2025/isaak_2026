'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { officialSites, type OfficialSite } from '@isaak/content';
import { GlassCard } from '@/components/ui/GlassCard';

export function OfficialSitesConstellation() {
  const [active, setActive] = useState<OfficialSite>(officialSites[0]!);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {officialSites.map((site) => {
          const isActive = active.id === site.id;
          return (
            <motion.button
              key={site.id}
              type="button"
              onMouseEnter={() => setActive(site)}
              onFocus={() => setActive(site)}
              whileHover={{ y: -3 }}
              className={`rounded-xl border px-3 py-4 text-center text-xs font-medium leading-tight shadow-glass transition-colors ${
                isActive
                  ? 'border-isaak-blue bg-isaak-blue text-cream'
                  : 'border-camel/30 bg-cream/70 text-chocolate'
              }`}
            >
              {site.name}
            </motion.button>
          );
        })}
      </div>

      <motion.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="space-y-4">
          <p className="font-serif-display text-lg font-semibold text-chocolate">{active.name}</p>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-copper">
              Isaak entiende
            </p>
            <p className="mt-1 text-sm text-chocolate/75">{active.understands}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-copper">
              Isaak puede preparar
            </p>
            <p className="mt-1 text-sm text-chocolate/75">{active.prepares}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-isaak-blue">
              Requiere tu confirmación
            </p>
            <p className="mt-1 text-sm text-chocolate/75">{active.requiresConfirmation}</p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

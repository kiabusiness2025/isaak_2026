'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { brandAssets } from '@isaak/brand';
import { connectorCategories, type ConnectorCategory } from '@isaak/content';
import { ConnectorIcon } from '@/components/connectors/ConnectorIcon';

export function OrbitalConnectorMap() {
  const [active, setActive] = useState<ConnectorCategory>(connectorCategories[0]!);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div className="relative mx-auto flex h-[min(380px,85vw)] w-[min(380px,85vw)] items-center justify-center sm:h-[440px] sm:w-[440px]">
        <div className="absolute inset-0 animate-orbit-spin rounded-full border border-copper/20" />
        <div className="absolute inset-8 rounded-full border border-camel/20" />
        <div className="absolute h-16 w-16 overflow-hidden rounded-full border-2 border-copper/40 shadow-lift">
          <Image
            src={brandAssets.robot.bust.idle}
            alt="Isaak"
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>

        {connectorCategories.map((category, index) => {
          const angle = (index / connectorCategories.length) * Math.PI * 2;
          const radius = 42;
          // Fijado a 4 decimales: server y cliente pueden diferir en el último
          // bit de Math.cos/sin, lo que rompía la hidratación con "29%" vs "28.999...%".
          // Se mantiene como string (no Number) para que el valor final en el
          // CSS sea exactamente el que fijamos, sin volver a serializar el float.
          const x = (50 + radius * Math.cos(angle)).toFixed(4);
          const y = (50 + radius * Math.sin(angle)).toFixed(4);
          const isActive = active.id === category.id;

          return (
            <motion.button
              key={category.id}
              type="button"
              onMouseEnter={() => setActive(category)}
              onFocus={() => setActive(category)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              whileHover={{ scale: 1.08 }}
            >
              <span
                className={`flex max-w-[6.5rem] flex-col items-center gap-1 rounded-full border px-3 py-1.5 text-center text-[11px] font-medium leading-tight shadow-glass transition-colors ${
                  isActive
                    ? 'border-isaak-blue bg-isaak-blue text-cream'
                    : 'border-camel/40 bg-cream text-chocolate'
                }`}
              >
                <ConnectorIcon categoryId={category.id} className="h-4 w-4" />
                {category.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-camel/30 bg-cream/70 p-6 shadow-glass"
      >
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
          <ConnectorIcon categoryId={active.id} className="h-4 w-4" />
          {active.label}
        </p>
        <p className="mt-3 text-base text-chocolate/80">{active.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {active.examples.map((example) => (
            <span
              key={example}
              className="rounded-full bg-beige/60 px-3 py-1 text-xs text-chocolate/70"
            >
              {example}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

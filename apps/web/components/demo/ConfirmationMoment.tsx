'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IsaakButton } from '@/components/ui/IsaakButton';

export function ConfirmationMoment() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <AnimatePresence mode="wait">
        {!confirmed ? (
          <motion.div
            key="pending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="rounded-full bg-beige/70 px-4 py-1.5 text-xs font-medium tracking-wide text-chocolate">
              Listo para revisar
            </span>
            <IsaakButton onClick={() => setConfirmed(true)}>Confirmar</IsaakButton>
          </motion.div>
        ) : (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-isaak-blue text-cream shadow-glow-blue">
              ✓
            </div>
            <p className="text-sm font-medium text-chocolate">Preparado y confirmado por ti.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

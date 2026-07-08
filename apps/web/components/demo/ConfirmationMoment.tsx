'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IsaakButton } from '@/components/ui/IsaakButton';
import { IsaakCharacter } from '@/components/hero/IsaakCharacter';

export function ConfirmationMoment() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <IsaakCharacter size={96} state={confirmed ? 'confirmed' : 'preparing'} />

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
            <IsaakButton onClick={() => setConfirmed(true)} size="lg" className="shadow-lift">
              Confirmar
            </IsaakButton>
          </motion.div>
        ) : (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-1"
          >
            <p className="text-sm font-medium text-chocolate">Preparado y confirmado por ti.</p>
            <p className="text-xs text-chocolate/55">Isaak prepara. Tú confirmas.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

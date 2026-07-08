'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import { hero } from '@isaak/content';

const POSITIONS = [
  'left-[0%] top-[10%]',
  'right-[0%] top-[6%]',
  'left-[0%] top-[48%]',
  'right-[0%] top-[44%]',
  'left-[6%] bottom-[2%]',
  'left-[14%] top-[0%]',
];

/**
 * Solo estas 6 tarjetas (de las 8 en @isaak/content) tienen hueco propio en la
 * constelación de escritorio sin invadir ni al personaje ni al panel de chat
 * inferior (EntrepreneurScenario). El resto ('cliente', 'seg-social') se queda
 * fuera del desktop; tampoco aparece en la tira móvil (que ya usa solo las 5 primeras).
 */
const DESKTOP_CARD_IDS = ['factura', 'banco', 'modelo-303', 'notificacion-aeat', 'calendario', 'documento'];

const MAGNETIC_RANGE = 14;

/** Desplaza la tarjeta 4-8px hacia el cursor, con muelle suave, y vuelve al reposo al salir. */
function MagneticCard({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * MAGNETIC_RANGE);
    y.set(relY * MAGNETIC_RANGE);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingCards() {
  const cards = hero.floatingCards.filter((card) => DESKTOP_CARD_IDS.includes(card.id));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`pointer-events-auto absolute ${POSITIONS[index % POSITIONS.length]} w-48`}
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 + index * 0.08 },
            y: {
              duration: 4.5 + (index % 3) * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            },
          }}
        >
          <MagneticCard>
            <div className="rounded-xl border border-beige/70 bg-cream/70 p-3 shadow-glass backdrop-blur-md">
              <p className="text-xs font-semibold text-chocolate">{card.label}</p>
              <p className="mt-1 text-[11px] text-chocolate/60">{card.detail}</p>
            </div>
          </MagneticCard>
        </motion.div>
      ))}
    </div>
  );
}

/** Tira horizontal para mobile/tablet — misma información, sin posicionamiento absoluto. */
export function FloatingCardsStrip() {
  return (
    <div className="flex snap-x gap-3 overflow-x-auto pb-2 lg:hidden">
      {hero.floatingCards.slice(0, 5).map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
          className="w-40 shrink-0 snap-start rounded-xl border border-beige/70 bg-cream/70 p-3 shadow-glass"
        >
          <p className="text-xs font-semibold text-chocolate">{card.label}</p>
          <p className="mt-1 text-[11px] text-chocolate/60">{card.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}

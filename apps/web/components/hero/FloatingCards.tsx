'use client';

import { motion } from 'framer-motion';
import { hero } from '@isaak/content';

const POSITIONS = [
  'left-[2%] top-[8%]',
  'right-[4%] top-[4%]',
  'left-[0%] top-[46%]',
  'right-[0%] top-[42%]',
  'left-[10%] bottom-[4%]',
  'right-[12%] bottom-[2%]',
  'left-[32%] top-[0%]',
  'right-[30%] bottom-[10%]',
];

export function FloatingCards() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {hero.floatingCards.map((card, index) => (
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
          whileHover={{ y: -6, scale: 1.03 }}
        >
          <div className="rounded-xl border border-beige/70 bg-cream/70 p-3 shadow-glass backdrop-blur-md">
            <p className="text-xs font-semibold text-chocolate">{card.label}</p>
            <p className="mt-1 text-[11px] text-chocolate/60">{card.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

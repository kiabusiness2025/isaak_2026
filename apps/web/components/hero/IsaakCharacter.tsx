'use client';

import { motion } from 'framer-motion';

type IsaakCharacterProps = {
  size?: number;
};

/**
 * Placeholder elegante del robot Isaak (SVG abstracto). Sustituir por el asset
 * definitivo cuando exista, manteniendo la misma silueta orbital + luz azul.
 */
export function IsaakCharacter({ size = 260 }: IsaakCharacterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <motion.div
        animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-full w-full"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_20px_40px_rgba(61,42,31,0.18)]">
          {/* Cuerpo */}
          <rect x="55" y="80" width="90" height="90" rx="24" fill="#3D2A1F" />
          <rect x="65" y="90" width="70" height="70" rx="18" fill="#F7F1E7" opacity="0.08" />

          {/* Cabeza */}
          <rect x="62" y="30" width="76" height="60" rx="20" fill="#3D2A1F" />
          <rect x="72" y="42" width="56" height="30" rx="12" fill="#F7F1E7" opacity="0.1" />

          {/* Ojo / luz central */}
          <motion.circle
            cx="100"
            cy="57"
            r="10"
            fill="#2F5E9E"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Antena / órbita */}
          <circle cx="100" cy="14" r="4" fill="#B87333" />
          <line x1="100" y1="18" x2="100" y2="30" stroke="#B87333" strokeWidth="2" />

          {/* Brazos */}
          <rect x="38" y="95" width="16" height="46" rx="8" fill="#3D2A1F" />
          <rect x="146" y="95" width="16" height="46" rx="8" fill="#3D2A1F" />

          {/* Libro / panel que sostiene */}
          <rect x="72" y="128" width="56" height="34" rx="6" fill="#C89B61" />
          <line x1="100" y1="128" x2="100" y2="162" stroke="#3D2A1F" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { brandAssets } from '@isaak/brand';

export type IsaakCharacterState = 'idle' | 'listening' | 'preparing' | 'connecting' | 'confirmed';

type IsaakCharacterProps = {
  size?: number;
  state?: IsaakCharacterState;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);
  return reduced;
}

/**
 * Personaje Isaak — retrato ilustrado real (packages/brand/assets/robot),
 * con microcomportamientos alrededor: inclinación al escuchar, brillo cobre
 * al conectar datos, sello al confirmar. El parpadeo y el movimiento del
 * libro de la versión SVG anterior no son portables a una foto estática;
 * si se necesitan de vuelta, requieren una ilustración por capas (cara,
 * ojos, libro) en vez de un único PNG plano.
 */
export function IsaakCharacter({ size = 260, state = 'idle' }: IsaakCharacterProps) {
  const reducedMotion = usePrefersReducedMotion();
  const headTilt = state === 'listening' ? -6 : 0;
  const isConnecting = state === 'connecting';
  const isConfirmed = state === 'confirmed';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Brillo cobre al conectar datos */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-12%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(184,115,51,0.35) 0%, rgba(184,115,51,0) 70%)',
        }}
        animate={{ opacity: isConnecting ? [0.2, 0.6, 0.2] : 0 }}
        transition={{ duration: 1.8, repeat: isConnecting ? Infinity : 0, ease: 'easeInOut' }}
      />

      <motion.div
        animate={{
          rotate: reducedMotion ? 0 : [0, 1.2, 0, -1.2, 0],
        }}
        transition={{ duration: 9, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        className="relative h-full w-full"
      >
        <motion.div
          className="h-full w-full overflow-hidden rounded-full border-4 border-copper/40 shadow-[0_20px_40px_rgba(61,42,31,0.18)]"
          animate={{ rotate: headTilt }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={brandAssets.robot.main}
            alt="Isaak"
            width={size}
            height={size}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Sello de confirmación */}
      {isConfirmed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-isaak-blue text-cream shadow-glow-blue"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
}

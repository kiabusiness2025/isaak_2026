'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { brandAssets } from '@isaak/brand';

export type IsaakCharacterState = 'idle' | 'listening' | 'preparing' | 'connecting' | 'confirmed';

type IsaakCharacterProps = {
  size?: number;
  state?: IsaakCharacterState;
  /** 'circle' (avatar recortado, por defecto) o 'full' (cuerpo entero, sin marco circular). */
  variant?: 'circle' | 'full';
};

type Pose = 'idle' | 'thinking' | 'confirmed';

const POSE_BY_STATE: Record<IsaakCharacterState, Pose> = {
  idle: 'idle',
  listening: 'idle',
  preparing: 'thinking',
  connecting: 'thinking',
  confirmed: 'confirmed',
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
 * Personaje Isaak — retratos ilustrados reales (packages/brand/assets/robot),
 * uno por gesto (idle, pensando, confirmado) y por formato (busto circular /
 * cuerpo entero). El estado anima un crossfade entre esas poses reales en vez
 * de rotar o mover el marco del avatar, para que lo que se mueva sea Isaak,
 * no el círculo que lo contiene.
 */
export function IsaakCharacter({ size = 260, state = 'idle', variant = 'circle' }: IsaakCharacterProps) {
  const reducedMotion = usePrefersReducedMotion();
  const pose = POSE_BY_STATE[state];
  const headTilt = state === 'listening' ? -4 : 0;
  const isConnecting = state === 'connecting';
  const isConfirmed = state === 'confirmed';

  const src = variant === 'full' ? brandAssets.robot.full[pose] : brandAssets.robot.bust[pose];
  const aspect = variant === 'full' ? 760 / 1000 : 1;
  const width = variant === 'full' ? Math.round(size * aspect) : size;
  const height = size;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ width, height }}
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
        className={
          variant === 'circle'
            ? 'relative h-full w-full overflow-hidden rounded-full border-4 border-copper/40 shadow-[0_20px_40px_rgba(61,42,31,0.18)]'
            : 'relative h-full w-full'
        }
        animate={{ rotate: headTilt }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={pose}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: reducedMotion ? 1 : [1, 1.01, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 6, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' },
            }}
          >
            <Image
              src={src}
              alt="Isaak"
              width={width}
              height={height}
              className={variant === 'circle' ? 'h-full w-full object-cover' : 'h-full w-full object-contain'}
              priority
            />
          </motion.div>
        </AnimatePresence>
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

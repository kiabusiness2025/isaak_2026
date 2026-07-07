'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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
 * Personaje Isaak — placeholder elegante en SVG con microcomportamientos:
 * parpadeo cada 8-12s, luz que pulsa, inclinación al escuchar, movimiento
 * del libro al preparar, brillo cobre al conectar datos, sello al confirmar.
 * Sustituir el SVG por el asset ilustrado definitivo sin tocar la lógica de
 * estados: la silueta orbital + luz central deben mantenerse.
 */
export function IsaakCharacter({ size = 260, state = 'idle' }: IsaakCharacterProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [blinking, setBlinking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (reducedMotion) return undefined;

    function scheduleBlink() {
      const delay = 8000 + Math.random() * 4000;
      timeoutRef.current = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 140);
        scheduleBlink();
      }, delay);
    }

    scheduleBlink();
    return () => clearTimeout(timeoutRef.current);
  }, [reducedMotion]);

  const headTilt = state === 'listening' ? -6 : 0;
  const bookLift = state === 'preparing' ? -3 : 0;
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
        <motion.svg
          viewBox="0 0 200 200"
          className="h-full w-full drop-shadow-[0_20px_40px_rgba(61,42,31,0.18)]"
          animate={{ rotate: headTilt }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '100px 60px' }}
        >
          {/* Cuerpo */}
          <rect x="55" y="80" width="90" height="90" rx="24" fill="#3D2A1F" />
          <rect x="65" y="90" width="70" height="70" rx="18" fill="#F7F1E7" opacity="0.08" />

          {/* Cabeza */}
          <rect x="62" y="30" width="76" height="60" rx="20" fill="#3D2A1F" />
          <rect x="72" y="42" width="56" height="30" rx="12" fill="#F7F1E7" opacity="0.1" />

          {/* Ojo / luz central — pulso calmado; parpadeo real via scaleY */}
          <motion.circle
            cx="100"
            cy="57"
            r="10"
            fill="#2F5E9E"
            animate={{
              opacity: isConfirmed ? 0.95 : [0.6, 1, 0.6],
              scaleY: blinking ? 0.12 : 1,
            }}
            transition={{
              opacity: isConfirmed
                ? { duration: 0.6 }
                : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
              scaleY: { duration: 0.14, ease: 'easeInOut' },
            }}
            style={{ transformOrigin: '100px 57px' }}
          />

          {/* Antena / órbita */}
          <circle cx="100" cy="14" r="4" fill="#B87333" />
          <line x1="100" y1="18" x2="100" y2="30" stroke="#B87333" strokeWidth="2" />

          {/* Brazos */}
          <rect x="38" y="95" width="16" height="46" rx="8" fill="#3D2A1F" />
          <rect x="146" y="95" width="16" height="46" rx="8" fill="#3D2A1F" />

          {/* Libro / panel — leve movimiento al preparar respuesta */}
          <motion.g
            animate={{ y: bookLift }}
            transition={{
              duration: 1.6,
              repeat: state === 'preparing' ? Infinity : 0,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <rect x="72" y="128" width="56" height="34" rx="6" fill="#C89B61" />
            <line x1="100" y1="128" x2="100" y2="162" stroke="#3D2A1F" strokeWidth="1.5" />
          </motion.g>
        </motion.svg>
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

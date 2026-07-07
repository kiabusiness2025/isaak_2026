'use client';

import { useEffect, useRef, useState } from 'react';
import type { IsaakCharacterState } from './IsaakCharacter';

type Step = { state: IsaakCharacterState; duration: number };

const DEFAULT_SEQUENCE: Step[] = [
  { state: 'idle', duration: 2400 },
  { state: 'listening', duration: 1100 },
  { state: 'preparing', duration: 2000 },
  { state: 'connecting', duration: 1300 },
  { state: 'confirmed', duration: 2600 },
];

/**
 * Ciclo calmado de estados para animar a Isaak sin depender de eventos reales.
 * Usado en escenas ambientales (hero, CTA final) donde no hay una conversación
 * real que dirija el estado del personaje.
 */
export function useIsaakTimeline(sequence: Step[] = DEFAULT_SEQUENCE) {
  const [state, setState] = useState<IsaakCharacterState>(sequence[0]?.state ?? 'idle');
  const indexRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    let timeoutId: ReturnType<typeof setTimeout>;

    function advance() {
      const step = sequence[indexRef.current];
      if (!step) return;
      setState(step.state);
      timeoutId = setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % sequence.length;
        advance();
      }, step.duration);
    }

    advance();
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

/**
 * Presets de animación compartidos. Premium, lentos, sin glitches ni neones.
 * Todo consumidor debe respetar prefers-reduced-motion (ver hooks en apps/web).
 */
export const easing = {
  premium: [0.16, 1, 0.3, 1] as const,
  soft: [0.22, 1, 0.36, 1] as const,
};

export const durations = {
  fast: 0.25,
  base: 0.6,
  slow: 1.2,
  orbit: 60,
};

export const scrollReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easing.premium },
  },
};

export const staggerContainer = (stagger = 0.08) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

export const floatY = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

export const orbitSpin = {
  animate: {
    rotate: 360,
    transition: {
      duration: durations.orbit,
      repeat: Infinity,
      ease: 'linear' as const,
    },
  },
};

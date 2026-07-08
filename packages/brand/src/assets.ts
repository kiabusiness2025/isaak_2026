/**
 * Rutas públicas de los assets de marca servidos desde apps/web/public.
 * Fuente original: docs/brand/isaak-retro-logos/ y
 * apps/isaak_retro_vibe/isaak-retro-home/assets/ (repo isaak).
 */
export const brandAssets = {
  wordmark: {
    dark: '/brand/isaak-wordmark-dark.png',
    light: '/brand/isaak-wordmark-light.png',
  },
  icon: {
    png512: '/brand/isaak-icon-512.png',
    png192: '/brand/isaak-icon-192.png',
    favicon32: '/brand/favicon-32.png',
  },
  og: '/og/isaak-og.png',
  robot: {
    full: {
      idle: '/robot/isaak-full-idle.png',
      thinking: '/robot/isaak-full-thinking.png',
      confirmed: '/robot/isaak-full-confirmed.png',
    },
    bust: {
      idle: '/robot/isaak-bust-idle.png',
      thinking: '/robot/isaak-bust-thinking.png',
      confirmed: '/robot/isaak-bust-confirmed.png',
    },
  },
} as const;

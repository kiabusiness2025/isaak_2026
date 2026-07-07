import { colors } from './colors';

export const tokens = {
  color: {
    background: colors.cream,
    surface: colors.beige,
    accent: colors.camel,
    ink: colors.chocolate,
    line: colors.copper,
    action: colors.isaakBlue,
  },
  radius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    pill: '999px',
  },
  shadow: {
    glass: '0 8px 32px rgba(61, 42, 31, 0.12)',
    lift: '0 16px 48px rgba(61, 42, 31, 0.18)',
    glowBlue: '0 0 24px rgba(47, 94, 158, 0.35)',
  },
  gradient: {
    hero: 'radial-gradient(circle at 70% 20%, #FBF6EC 0%, #F7F1E7 45%, #EFE3CF 100%)',
    ctaDark:
      'linear-gradient(160deg, #3D2A1F 0%, #2E1F16 60%, #241811 100%)',
  },
} as const;

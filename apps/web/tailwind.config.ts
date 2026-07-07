import type { Config } from 'tailwindcss';
import { colors } from '@isaak/brand';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: colors.cream,
        beige: colors.beige,
        camel: colors.camel,
        chocolate: colors.chocolate,
        copper: colors.copper,
        'isaak-blue': colors.isaakBlue,
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(61, 42, 31, 0.12)',
        lift: '0 16px 48px rgba(61, 42, 31, 0.18)',
        'glow-blue': '0 0 24px rgba(47, 94, 158, 0.35)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 70% 20%, #FBF6EC 0%, #F7F1E7 45%, #EFE3CF 100%)',
        'cta-gradient': 'linear-gradient(160deg, #3D2A1F 0%, #2E1F16 60%, #241811 100%)',
      },
      keyframes: {
        'orbit-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'orbit-spin': 'orbit-spin 60s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

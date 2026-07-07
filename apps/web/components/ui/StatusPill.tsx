import { type ReactNode } from 'react';

type Tone = 'neutral' | 'action' | 'warning' | 'ready';

const TONE_CLASSES: Record<Tone, string> = {
  neutral: 'bg-beige/70 text-chocolate',
  action: 'bg-isaak-blue/10 text-isaak-blue',
  warning: 'bg-copper/15 text-copper',
  ready: 'bg-isaak-blue text-cream',
};

type StatusPillProps = {
  children: ReactNode;
  tone?: Tone;
};

export function StatusPill({ children, tone = 'neutral' }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}

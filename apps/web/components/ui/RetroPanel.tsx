import { type HTMLAttributes, type ReactNode } from 'react';

type RetroPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: 'light' | 'dark';
};

export function RetroPanel({ children, tone = 'light', className = '', ...props }: RetroPanelProps) {
  const toneClasses =
    tone === 'dark'
      ? 'bg-cta-gradient text-cream border-copper/30'
      : 'bg-beige/40 text-chocolate border-camel/30';

  return (
    <div
      className={`rounded-3xl border p-8 sm:p-10 ${toneClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

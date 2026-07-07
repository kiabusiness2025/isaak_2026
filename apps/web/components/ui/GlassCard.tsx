import { type HTMLAttributes, type ReactNode } from 'react';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-beige/60 bg-cream/60 p-5 shadow-glass backdrop-blur-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

import Link from 'next/link';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-isaak-blue text-cream hover:bg-isaak-blue/90 shadow-glow-blue',
  secondary:
    'bg-transparent border border-chocolate/30 text-chocolate hover:border-isaak-blue hover:text-isaak-blue',
  ghost: 'bg-transparent text-chocolate hover:text-isaak-blue',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

type IsaakButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export function IsaakButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...buttonProps
}: IsaakButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

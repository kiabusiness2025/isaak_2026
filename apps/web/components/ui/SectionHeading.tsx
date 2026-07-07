import { type ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, body, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-3xl ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif-display text-3xl font-semibold leading-tight text-chocolate sm:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-4 text-base text-chocolate/75 sm:text-lg">{body}</p>}
    </div>
  );
}

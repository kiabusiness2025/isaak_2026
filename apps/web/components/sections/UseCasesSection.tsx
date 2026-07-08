import Link from 'next/link';
import { useCasesSection } from '@isaak/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function UseCasesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow={useCasesSection.eyebrow} title="Una conversación, tres formas de usarla." />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {useCasesSection.columns.map((column, index) => (
            <ScrollReveal key={column.id} delay={index * 0.1}>
              <Link
                href={column.href}
                className="block h-full rounded-3xl border border-camel/30 bg-cream/70 p-6 shadow-glass transition-colors hover:border-copper/50"
              >
                <p className="font-serif-display text-lg font-semibold leading-snug text-chocolate">
                  {column.title}
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-chocolate/70">
                  {column.questions.map((question) => (
                    <li key={question} className="flex gap-2">
                      <span className="text-copper">→</span>
                      {question}
                    </li>
                  ))}
                </ul>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

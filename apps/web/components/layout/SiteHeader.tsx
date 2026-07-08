'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { brandAssets } from '@isaak/brand';
import { IsaakButton } from '@/components/ui/IsaakButton';

const NAV_LINKS = [
  { href: '/personal', label: 'Personal' },
  { href: '/profesional', label: 'Profesional' },
  { href: '/conectores', label: 'Conectores' },
  { href: '/sedes-electronicas', label: 'Sedes electrónicas' },
  { href: '/precios', label: 'Precios' },
  { href: '/faq', label: 'FAQ' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-camel/20 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image src={brandAssets.wordmark.dark} alt="Isaak" width={120} height={33} priority />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-chocolate/80 transition-colors hover:text-copper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/demo" className="text-sm font-medium text-chocolate/80 hover:text-copper">
            Ver demo
          </Link>
          <IsaakButton href="/precios" size="sm">
            Empezar gratis
          </IsaakButton>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-chocolate lg:hidden"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          <div className="flex h-4 w-6 flex-col justify-between">
            <span className="h-0.5 w-full bg-chocolate" />
            <span className="h-0.5 w-full bg-chocolate" />
            <span className="h-0.5 w-full bg-chocolate" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-camel/20 bg-cream px-6 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-sm text-chocolate/80 hover:text-copper"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/demo"
            className="py-2 text-sm font-medium text-chocolate hover:text-copper"
            onClick={() => setOpen(false)}
          >
            Ver demo
          </Link>
          <div className="pt-2">
            <IsaakButton href="/precios" size="sm" className="w-full justify-center">
              Empezar gratis
            </IsaakButton>
          </div>
        </nav>
      )}
    </header>
  );
}

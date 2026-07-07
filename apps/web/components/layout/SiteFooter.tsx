import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Producto',
    links: [
      { href: '/personal', label: 'Personal' },
      { href: '/profesional', label: 'Profesional' },
      { href: '/demo', label: 'Demo' },
      { href: '/precios', label: 'Precios' },
    ],
  },
  {
    title: 'Conocimiento',
    links: [
      { href: '/conectores', label: 'Conectores' },
      { href: '/sedes-electronicas', label: 'Sedes electrónicas' },
      { href: '/modelos/aeat', label: 'Modelos AEAT' },
      { href: '/calendario-fiscal', label: 'Calendario fiscal' },
    ],
  },
  {
    title: 'Confianza',
    links: [
      { href: '/seguridad', label: 'Seguridad' },
      { href: '/faq', label: 'FAQ' },
      { href: '/legal/privacidad', label: 'Privacidad' },
      { href: '/legal/terminos', label: 'Términos' },
      { href: '/legal/cookies', label: 'Cookies' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-camel/20 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-serif-display text-lg font-semibold text-chocolate">Isaak</p>
            <p className="mt-3 max-w-xs text-sm text-chocolate/70">
              Isaak habla con tus programas y entiende las sedes electrónicas. Tú solo hablas con
              Isaak.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-chocolate">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-chocolate/70 transition-colors hover:text-copper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-camel/20 pt-6 text-xs text-chocolate/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Isaak. Isaak prepara. Tú confirmas.</p>
          <p>Hecho para acompañarte, no para sustituir tu criterio.</p>
        </div>
      </div>
    </footer>
  );
}

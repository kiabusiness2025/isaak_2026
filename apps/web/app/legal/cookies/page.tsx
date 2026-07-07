import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de cookies — Isaak',
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="font-serif-display text-3xl font-semibold text-chocolate">
        Política de cookies
      </h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-chocolate/75">
        <p>
          La web pública de Isaak en su fase V1 estática no utiliza cookies de analítica ni de
          marketing. Solo se emplean cookies técnicas estrictamente necesarias para el
          funcionamiento del sitio.
        </p>
        <p>
          Cuando se incorpore analítica o formularios en fases posteriores, esta política se
          actualizará para reflejar exactamente qué cookies se usan y con qué finalidad.
        </p>
      </div>
    </div>
  );
}

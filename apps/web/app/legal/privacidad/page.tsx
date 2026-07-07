import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de privacidad — Isaak',
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="font-serif-display text-3xl font-semibold text-chocolate">
        Política de privacidad
      </h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-chocolate/75">
        <p>
          Este documento es un borrador de referencia para la fase V1 estática de la web de
          Isaak. Se sustituirá por la versión definitiva revisada legalmente antes de tratar
          datos personales reales.
        </p>
        <p>
          Isaak solo procesa la información necesaria para responder a tus preguntas y, cuando lo
          autorizas expresamente, para preparar acciones que tú confirmas. Ninguna acción sensible
          se ejecuta sin tu aprobación explícita.
        </p>
        <p>
          Para cualquier consulta sobre privacidad, escribe a soporte@isaak.es (dirección de
          contacto provisional para esta fase del proyecto).
        </p>
      </div>
    </div>
  );
}

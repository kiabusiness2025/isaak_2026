import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y condiciones — Isaak',
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="font-serif-display text-3xl font-semibold text-chocolate">
        Términos y condiciones
      </h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-chocolate/75">
        <p>
          Borrador de referencia para la fase V1 estática de la web de Isaak. Se sustituirá por la
          versión definitiva revisada legalmente antes del lanzamiento comercial.
        </p>
        <p>
          Isaak prepara información, resúmenes y borradores para ayudarte a decidir. Isaak no
          sustituye el criterio profesional de un asesor cuando la situación lo requiere, y no
          presenta, paga ni envía nada en tu nombre sin tu confirmación explícita.
        </p>
        <p>
          El uso del plan gratuito no requiere tarjeta de pago. Los planes de pago incluyen 14 días
          de prueba y pueden cancelarse en cualquier momento.
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState, type FormEvent } from 'react';
import { advisorBetaForm } from '@isaak/content';
import { IsaakButton } from '@/components/ui/IsaakButton';

export function AdvisorBetaForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // V1 estática: sin backend todavía. La captación real se conectará en
    // una fase posterior (Fase 6+ del roadmap de isaak_retro).
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-isaak-blue/30 bg-isaak-blue/5 p-6 text-center">
        <p className="text-sm font-medium text-chocolate">{advisorBetaForm.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-3xl border border-camel/30 bg-cream/70 p-6 shadow-glass sm:grid-cols-2 sm:p-8"
    >
      <p className="font-serif-display text-lg font-semibold text-chocolate sm:col-span-2">
        {advisorBetaForm.title}
      </p>

      <label className="text-sm text-chocolate/70">
        Nombre y apellidos
        <input
          required
          type="text"
          className="mt-1 w-full rounded-lg border border-camel/30 bg-cream px-3 py-2 text-sm text-chocolate outline-none focus:border-isaak-blue"
        />
      </label>

      <label className="text-sm text-chocolate/70">
        Email profesional
        <input
          required
          type="email"
          className="mt-1 w-full rounded-lg border border-camel/30 bg-cream px-3 py-2 text-sm text-chocolate outline-none focus:border-isaak-blue"
        />
      </label>

      <label className="text-sm text-chocolate/70">
        Teléfono (opcional)
        <input
          type="tel"
          className="mt-1 w-full rounded-lg border border-camel/30 bg-cream px-3 py-2 text-sm text-chocolate outline-none focus:border-isaak-blue"
        />
      </label>

      <label className="text-sm text-chocolate/70">
        Nombre de la asesoría
        <input
          required
          type="text"
          className="mt-1 w-full rounded-lg border border-camel/30 bg-cream px-3 py-2 text-sm text-chocolate outline-none focus:border-isaak-blue"
        />
      </label>

      <label className="text-sm text-chocolate/70">
        Número aproximado de clientes
        <input
          type="text"
          className="mt-1 w-full rounded-lg border border-camel/30 bg-cream px-3 py-2 text-sm text-chocolate outline-none focus:border-isaak-blue"
        />
      </label>

      <label className="text-sm text-chocolate/70">
        Software actual
        <input
          type="text"
          className="mt-1 w-full rounded-lg border border-camel/30 bg-cream px-3 py-2 text-sm text-chocolate outline-none focus:border-isaak-blue"
        />
      </label>

      <label className="text-sm text-chocolate/70 sm:col-span-2">
        Principal dolor
        <select className="mt-1 w-full rounded-lg border border-camel/30 bg-cream px-3 py-2 text-sm text-chocolate outline-none focus:border-isaak-blue">
          {advisorBetaForm.fields.painOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm text-chocolate/70 sm:col-span-2">
        Mensaje opcional
        <textarea
          rows={3}
          className="mt-1 w-full rounded-lg border border-camel/30 bg-cream px-3 py-2 text-sm text-chocolate outline-none focus:border-isaak-blue"
        />
      </label>

      <label className="flex items-start gap-2 text-xs text-chocolate/60 sm:col-span-2">
        <input required type="checkbox" className="mt-0.5" />
        Acepto que Isaak me contacte sobre la beta de asesorías.
      </label>

      <div className="sm:col-span-2">
        <IsaakButton type="submit" className="w-full justify-center sm:w-auto">
          Solicitar acceso a la beta
        </IsaakButton>
      </div>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { DemoScenarioCard, type DemoScenario } from '@/components/demo/DemoScenarioCard';
import { IsaakDemoChat } from '@/components/demo/IsaakDemoChat';

type ScenarioContent = DemoScenario & {
  eyebrow: string;
  chatTitle: string;
  prompt: string;
  answerIntro: string;
  answerItems: { label: string; detail: string }[];
  answerClosing: string;
  actionButton: string;
  actionData: { dataUsed: string[]; source: string; nextStep: string };
};

const SCENARIOS: ScenarioContent[] = [
  {
    id: 'iva',
    title: 'Autónomo que pregunta por su IVA',
    description: 'Isaak cruza facturas emitidas y recibidas para estimar el IVA del trimestre.',
    eyebrow: 'Escenario · IVA trimestral',
    chatTitle: '¿Cuánto IVA voy a pagar este trimestre?',
    prompt: 'Isaak, ¿cuánto IVA voy a pagar este trimestre?',
    answerIntro: 'He cruzado tus facturas emitidas y recibidas:',
    answerItems: [
      { label: 'IVA repercutido', detail: '2.340 € en facturas emitidas' },
      { label: 'IVA soportado', detail: '860 € en gastos y compras' },
      { label: 'Estimación a pagar', detail: '1.480 € (modelo 303)' },
    ],
    answerClosing: 'Puedo dejarte preparado el borrador del 303 para que lo revises.',
    actionButton: 'Ver borrador preparado',
    actionData: {
      dataUsed: ['Facturas emitidas del trimestre', 'Facturas de gastos y compras', 'Tipo de IVA aplicado'],
      source: 'Programa de facturación conectado',
      nextStep: 'Preparar borrador del modelo 303 para revisar antes de presentar.',
    },
  },
  {
    id: 'cobros',
    title: 'Empresa que pregunta por cobros pendientes',
    description: 'Isaak revisa facturas y banco para decir quién debe pagar todavía.',
    eyebrow: 'Escenario · Cobros pendientes',
    chatTitle: '¿Qué clientes me deben dinero?',
    prompt: 'Isaak, ¿qué clientes me deben dinero ahora mismo?',
    answerIntro: 'He revisado tus facturas emitidas contra los movimientos del banco:',
    answerItems: [
      { label: 'Nova Ediciones', detail: '1.210 € — vence hace 6 días' },
      { label: 'Estudio Marín', detail: '540 € — vence en 3 días' },
      { label: 'Total pendiente', detail: '1.750 € en 2 facturas' },
    ],
    answerClosing: 'Puedo preparar un recordatorio de pago para los dos clientes.',
    actionButton: 'Ver recordatorio preparado',
    actionData: {
      dataUsed: ['Facturas emitidas pendientes', 'Movimientos bancarios recientes'],
      source: 'Programa de facturación + banco conectado',
      nextStep: 'Preparar recordatorio de pago para Nova Ediciones y Estudio Marín.',
    },
  },
  {
    id: 'notificacion',
    title: 'Notificación de Hacienda sin abrir',
    description: 'Isaak explica qué dice la carta y qué plazo tienes para responder.',
    eyebrow: 'Escenario · Notificación oficial',
    chatTitle: 'Me ha llegado una carta de Hacienda',
    prompt: 'Isaak, me ha llegado una notificación de Hacienda y no sé qué hacer.',
    answerIntro: 'La he leído. Esto es lo que dice, en claro:',
    answerItems: [
      { label: 'Tipo', detail: 'Requerimiento de información sobre el modelo 347' },
      { label: 'Plazo', detail: '10 días hábiles desde la notificación' },
      { label: 'Riesgo si no respondes', detail: 'Posible sanción por no atender el requerimiento' },
    ],
    answerClosing: 'Puedo prepararte un borrador de respuesta con los datos que ya tienes conectados.',
    actionButton: 'Ver respuesta preparada',
    actionData: {
      dataUsed: ['Contenido de la notificación', 'Modelo 347 presentado el trimestre pasado'],
      source: 'Sede electrónica de la Agencia Tributaria',
      nextStep: 'Preparar borrador de respuesta al requerimiento para revisar antes de enviar.',
    },
  },
  {
    id: 'resumen',
    title: 'Resumen semanal para empezar el proyecto',
    description: 'Isaak cruza factura, banco y modelo AEAT en un solo resumen preparado.',
    eyebrow: 'Escenario · Resumen semanal',
    chatTitle: '¿Qué debería tener controlado esta semana?',
    prompt: 'Isaak, acabo de empezar mi proyecto. ¿Qué debería tener controlado esta semana?',
    answerIntro: 'Te preparo un resumen claro:',
    answerItems: [
      { label: 'Facturas', detail: 'hay 2 pendientes de cobro' },
      { label: 'Banco', detail: 'el saldo cubre gastos de los próximos 21 días' },
      { label: 'Documentos', detail: 'falta subir 1 factura de proveedor' },
      { label: 'Plazos', detail: 'hay un vencimiento próximo en calendario' },
    ],
    answerClosing: 'No haré nada sin tu confirmación.',
    actionButton: 'Ver acción preparada',
    actionData: {
      dataUsed: ['2 facturas pendientes', 'Saldo bancario actual', 'Modelo 303 del trimestre'],
      source: 'Programa de facturación + banco conectado',
      nextStep: 'Preparar borrador de resumen para revisar antes de tu asesoría.',
    },
  },
];

export function DemoPageClient() {
  const [selectedId, setSelectedId] = useState(SCENARIOS[0]!.id);
  const selected = SCENARIOS.find((s) => s.id === selectedId)!;

  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Demo"
            title="Isaak ayudando a alguien que acaba de empezar."
            body="Elige un escenario y mira cómo Isaak convierte una pregunta cualquiera en un resumen claro, con confirmación humana antes de cualquier acción."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {SCENARIOS.map((scenario) => (
            <DemoScenarioCard
              key={scenario.id}
              scenario={scenario}
              active={selectedId === scenario.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-camel/30 bg-beige/30 p-6 sm:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-copper">
            {selected.eyebrow}
          </p>
          <p className="mt-2 text-center font-serif-display text-2xl font-semibold text-chocolate">
            {selected.chatTitle}
          </p>
          <div className="mt-8">
            <IsaakDemoChat key={selected.id} content={selected} actionData={selected.actionData} />
          </div>
        </div>
      </div>
    </div>
  );
}

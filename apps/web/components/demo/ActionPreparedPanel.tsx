'use client';

import { motion } from 'framer-motion';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { StatusPill } from '@/components/ui/StatusPill';
import { ConfirmationMoment } from './ConfirmationMoment';

type ActionPreparedPanelProps = {
  dataUsed?: string[];
  source?: string;
  risk?: 'bajo' | 'medio' | 'alto';
  nextStep?: string;
};

export function ActionPreparedPanel({
  dataUsed = ['2 facturas pendientes', 'Saldo bancario actual', 'Modelo 303 del trimestre'],
  source = 'Programa de facturación + banco conectado',
  risk = 'bajo',
  nextStep = 'Preparar borrador de resumen para revisar antes de tu asesoría.',
}: ActionPreparedPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-camel/30 bg-cream p-6 shadow-lift sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-serif-display text-lg font-semibold text-chocolate">
          Acción preparada por Isaak
        </p>
        <StatusPill tone="warning">Riesgo {risk}</StatusPill>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-copper">Datos usados</p>
          <ul className="mt-2 space-y-1.5 text-sm text-chocolate/80">
            {dataUsed.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-copper">Próximo paso</p>
          <p className="mt-2 text-sm text-chocolate/80">{nextStep}</p>
          <div className="mt-3">
            <SourceBadge source={source} />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-camel/20 pt-6">
        <ConfirmationMoment />
      </div>
    </motion.div>
  );
}

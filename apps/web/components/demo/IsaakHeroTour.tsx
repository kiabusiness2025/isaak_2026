'use client';

// Tour animado — reutilizable en el hero de la landing y en /demo.
// Muestra 8 escenarios con datos de ejemplo (empresa ficticia). Auto-ciclo
// cada 7 segundos. Sin título ni CTAs: el componente padre los proporciona.

import { useEffect, useRef, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

type ArtifactKind =
  | 'bar'
  | 'pie'
  | 'line'
  | 'dashboard'
  | 'excel'
  | 'pdf-fiscal'
  | 'pdf-presupuesto'
  | 'table'
  // Personal (particulares): calculadoras deterministas + trámites
  | 'calc-irpf'
  | 'calc-isd'
  | 'calc-itp'
  | 'tramite';

type Segment = 'personal' | 'profesional';

interface Scenario {
  label: string;
  emoji: string;
  userMsg: string;
  isaakMsg: string;
  kind: ArtifactKind;
  artifactTitle: string;
}

// ── Dataset ───────────────────────────────────────────────────────────────────

const MONTHLY = [
  { m: 'Ene', v: 5840 },
  { m: 'Feb', v: 6230 },
  { m: 'Mar', v: 7180 },
  { m: 'Abr', v: 6920 },
  { m: 'May', v: 8440 },
  { m: 'Jun', v: 7660 },
  { m: 'Jul', v: 5320 },
  { m: 'Ago', v: 4190 },
  { m: 'Sep', v: 7840 },
  { m: 'Oct', v: 8920 },
  { m: 'Nov', v: 9340 },
  { m: 'Dic', v: 10140 },
];
const EXPENSES = [
  { name: 'Alquiler', pct: 34, color: '#2F5E9E' },
  { name: 'Telefónica', pct: 22, color: '#5b8fde' },
  { name: 'Repsol', pct: 17, color: '#93bbe9' },
  { name: 'Suministros', pct: 12, color: '#c4d9f5' },
  { name: 'Otros', pct: 15, color: '#dde9f9' },
];
const CASHFLOW = [
  { m: 'E', i: 5840, g: 2800 },
  { m: 'F', i: 6230, g: 2400 },
  { m: 'M', i: 7180, g: 3100 },
  { m: 'A', i: 6920, g: 2600 },
  { m: 'M', i: 8440, g: 3200 },
  { m: 'J', i: 7660, g: 2900 },
  { m: 'J', i: 5320, g: 2400 },
  { m: 'A', i: 4190, g: 2100 },
  { m: 'S', i: 7840, g: 3000 },
  { m: 'O', i: 8920, g: 3400 },
  { m: 'N', i: 9340, g: 3700 },
  { m: 'D', i: 10140, g: 3915 },
];
const BALANCE = [
  { label: 'ACTIVO', value: '', head: true },
  { label: 'Caja y bancos', value: '32.840 €', head: false },
  { label: 'Clientes pendientes', value: '18.240 €', head: false },
  { label: 'Inmovilizado neto', value: '28.600 €', head: false },
  { label: 'TOTAL ACTIVO', value: '83.800 €', head: true },
  { label: 'PASIVO + PN', value: '', head: true },
  { label: 'Proveedores', value: '9.840 €', head: false },
  { label: 'Deuda bancaria', value: '5.540 €', head: false },
  { label: 'Patrimonio neto', value: '68.420 €', head: false },
  { label: 'TOTAL P+PN', value: '83.800 €', head: true },
];

const PROFESIONAL_SCENARIOS: Scenario[] = [
  {
    label: 'Ventas del año',
    emoji: '📊',
    userMsg: '¿Cuánto hemos vendido en 2025?',
    isaakMsg:
      'En 2025 facturasteis 88.240 € en 199 facturas. El Q4 fue el más fuerte con 28.400 € — el 32% del total. Mejor mes: diciembre con 10.140 €.',
    kind: 'bar',
    artifactTitle: 'Ventas por mes — 2025',
  },
  {
    label: 'Gastos por proveedor',
    emoji: '🥧',
    userMsg: '¿Cuáles son mis principales proveedores?',
    isaakMsg:
      'El alquiler concentra el 34% del gasto. Telefónica y Repsol suman otro 39%. En total 19 proveedores activos y 37.115 € en compras anuales.',
    kind: 'pie',
    artifactTitle: 'Gastos por proveedor — 2025',
  },
  {
    label: 'Cash flow mensual',
    emoji: '📈',
    userMsg: 'Muéstrame cómo evoluciona el cash flow',
    isaakMsg:
      'El margen operativo promedio fue del 67%. Solo agosto muestra tensión por vacaciones, recuperado en septiembre. Año cerrado con 78.332 € netos.',
    kind: 'line',
    artifactTitle: 'Cash flow mensual — 2025',
  },
  {
    label: 'Resumen empresa',
    emoji: '🏢',
    userMsg: 'Dame un resumen del estado general de la empresa',
    isaakMsg:
      'Dashboard generado. Ventas con crecimiento del 18% vs 2024. IVA al día. Beneficio neto del 67% sobre facturación. Liquidez sólida con ratio de 2,3.',
    kind: 'dashboard',
    artifactTitle: 'Estado empresa — 2025',
  },
  {
    label: 'Libro IVA Excel',
    emoji: '📗',
    userMsg: 'Prepárame el libro IVA del 1T 2026 en Excel',
    isaakMsg:
      'Libro IVA 1T 2026 listo. 47 facturas emitidas + 28 recibidas. IVA devengado 3.234 €, soportado 1.045 €. A ingresar en modelo 303: 2.189 €.',
    kind: 'excel',
    artifactTitle: 'Libro IVA 1T 2026.xlsx',
  },
  {
    label: 'Informe fiscal PDF',
    emoji: '📄',
    userMsg: 'Genera el resumen fiscal del ejercicio 2025 en PDF',
    isaakMsg:
      'Informe fiscal 2025 generado: 4 declaraciones de IVA, 4 pagos fraccionados IRPF y resumen del ejercicio. Total ingresado a AEAT: 20.036 €.',
    kind: 'pdf-fiscal',
    artifactTitle: 'Resumen fiscal 2025.pdf',
  },
  {
    label: 'Presupuesto PDF',
    emoji: '📋',
    userMsg: 'Genera el presupuesto #PRE-2026-047 para Cliente Demo',
    isaakMsg:
      'Presupuesto #PRE-2026-047 listo para Cliente Demo SL: 4.800 € + IVA. Servicios de consultoría 2T 2026. Validez 30 días. Pago a 30 días.',
    kind: 'pdf-presupuesto',
    artifactTitle: 'Presupuesto #PRE-2026-047.pdf',
  },
  {
    label: 'Balance de situación',
    emoji: '⚖️',
    userMsg: 'Balance de situación a cierre del ejercicio 2025',
    isaakMsg:
      'Balance al 31/12/2025: activo total 83.800 €, patrimonio neto 68.420 €. Empresa saneada, ratio de endeudamiento del 18%. Liquidez corriente 2,3.',
    kind: 'table',
    artifactTitle: 'Balance de situación — 31/12/2025',
  },
];

// ── Personal (particulares): escenarios de vida + calculadoras deterministas ───

const PERSONAL_SCENARIOS: Scenario[] = [
  {
    label: 'Renta / IRPF',
    emoji: '🧾',
    userMsg: '¿Cuánto me sale la declaración de la renta este año?',
    isaakMsg:
      'Con tus datos te sale a devolver. Cobraste 24.800 € y te retuvieron 3.180 €; con tus deducciones, Hacienda te devuelve 612 €. Te explico cada línea y te guío para presentarla.',
    kind: 'calc-irpf',
    artifactTitle: 'Resultado · Renta 2025',
  },
  {
    label: 'Herencia (ISD)',
    emoji: '📜',
    userMsg: 'He heredado el piso de mi madre en Valencia, ¿cuánto pago?',
    isaakMsg:
      'Como hijo/a, en la Comunitat Valenciana se aplica una reducción de 100.000 € y una bonificación del 99% en la cuota. Por una vivienda de 180.000 € pagarías 0 €. Sí debes presentar el modelo 650.',
    kind: 'calc-isd',
    artifactTitle: 'Impuesto de Sucesiones',
  },
  {
    label: 'Compra de vivienda',
    emoji: '🏠',
    userMsg: 'Voy a comprar un piso de segunda mano de 150.000 €',
    isaakMsg:
      'En vivienda usada se paga ITP, no IVA. En la Comunitat Valenciana el tipo general es del 10%: 15.000 €. Si tienes menos de 35 años o es vivienda habitual protegida, hay tipos reducidos — lo comprobamos.',
    kind: 'calc-itp',
    artifactTitle: 'ITP — compra de vivienda',
  },
  {
    label: 'Cambio de titularidad',
    emoji: '🚗',
    userMsg: 'Quiero poner a mi nombre el coche que me han vendido',
    isaakMsg:
      'Es un trámite en la DGT. La tasa es de 55,70 € y necesitas contrato de compraventa, DNI, permiso de circulación y ficha técnica al día. Te preparo la cita y la lista de documentos.',
    kind: 'tramite',
    artifactTitle: 'Cambio de titularidad — DGT',
  },
];

// Filas de las calculadoras personales (deterministas, no estimaciones del modelo)
const IRPF_ROWS = [
  { l: 'Rendimientos del trabajo', v: '24.800 €' },
  { l: 'Retenciones soportadas', v: '3.180 €' },
  { l: 'Cuota resultante', v: '2.568 €' },
  { l: 'Deducciones aplicadas', v: '−420 €' },
];
const ISD_ROWS = [
  { l: 'Valor heredado (vivienda)', v: '180.000 €' },
  { l: 'Reducción por parentesco', v: '−100.000 €' },
  { l: 'Base liquidable', v: '80.000 €' },
  { l: 'Bonificación autonómica', v: '−99%' },
];
const ITP_ROWS = [
  { l: 'Precio de compra', v: '150.000 €' },
  { l: 'Tipo ITP (vivienda usada)', v: '10%' },
  { l: 'Comunidad', v: 'C. Valenciana' },
];
const TRAMITE_STEPS = [
  'Reúne contrato de compraventa, DNI y permiso de circulación',
  'Paga la tasa DGT (modelo 620): 55,70 €',
  'Pide cita previa en Tráfico o hazlo online con cl@ve',
  'Recibe el nuevo permiso a tu nombre',
];

// ── SVG Charts ────────────────────────────────────────────────────────────────

function BarChart() {
  const max = Math.max(...MONTHLY.map((d) => d.v));
  const W = 260,
    H = 90,
    bT = 4,
    bB = 14;
  const bW = W / 12 - 3;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      {MONTHLY.map((d, i) => {
        const bH = (d.v / max) * (H - bT - bB);
        const x = i * (W / 12) + 1.5;
        return (
          <g key={d.m}>
            <rect
              x={x}
              y={H - bB - bH}
              width={bW}
              height={bH}
              rx={2}
              fill="#2F5E9E"
              opacity={0.5 + 0.5 * (d.v / max)}
            />
            {(i === 0 || i === 3 || i === 6 || i === 9 || i === 11) && (
              <text x={x + bW / 2} y={H - 2} textAnchor="middle" fontSize={7} fill="#94a3b8">
                {d.m}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function PieChart() {
  const total = EXPENSES.reduce((s, d) => s + d.pct, 0);
  const cx = 44,
    cy = 44,
    r = 38;
  let angle = -Math.PI / 2;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 88 88" className="h-24 w-24 flex-shrink-0" aria-hidden="true">
        {EXPENSES.map((d) => {
          const a = (d.pct / total) * 2 * Math.PI;
          const x1 = cx + r * Math.cos(angle);
          const y1 = cy + r * Math.sin(angle);
          const x2 = cx + r * Math.cos(angle + a);
          const y2 = cy + r * Math.sin(angle + a);
          const large = a > Math.PI ? 1 : 0;
          const path = `M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`;
          angle += a;
          return <path key={d.name} d={path} fill={d.color} stroke="white" strokeWidth={1.5} />;
        })}
      </svg>
      <div className="space-y-1.5">
        {EXPENSES.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5 text-[10px] text-slate-600">
            <span
              className="inline-block h-2 w-2 flex-shrink-0 rounded-sm"
              style={{ background: d.color }}
            />
            {d.name}
            <span className="ml-auto font-semibold text-slate-800">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart() {
  const max = Math.max(...CASHFLOW.flatMap((d) => [d.i, d.g]));
  const W = 260,
    H = 90;
  const pad = { l: 4, r: 4, t: 6, b: 14 };
  const iW = W - pad.l - pad.r,
    iH = H - pad.t - pad.b,
    n = CASHFLOW.length;
  const toX = (idx: number) => pad.l + (idx / (n - 1)) * iW;
  const toY = (v: number) => pad.t + iH - (v / max) * iH;
  const ingPts = CASHFLOW.map((d, i) => `${toX(i).toFixed(1)},${toY(d.i).toFixed(1)}`).join(' ');
  const gasPts = CASHFLOW.map((d, i) => `${toX(i).toFixed(1)},${toY(d.g).toFixed(1)}`).join(' ');
  const areaClose = `${toX(n - 1).toFixed(1)},${(pad.t + iH).toFixed(1)} ${toX(0).toFixed(1)},${(pad.t + iH).toFixed(1)}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      <polygon points={`${ingPts} ${areaClose}`} fill="#2F5E9E" opacity={0.08} />
      <polyline
        points={ingPts}
        fill="none"
        stroke="#2F5E9E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={gasPts}
        fill="none"
        stroke="#f87171"
        strokeWidth={1.5}
        strokeDasharray="4,2"
        strokeLinecap="round"
      />
      {CASHFLOW.map((d, i) => (
        <text
          key={i}
          x={toX(i).toFixed(1)}
          y={H - 2}
          textAnchor="middle"
          fontSize={6}
          fill="#94a3b8"
        >
          {d.m}
        </text>
      ))}
      <rect x={W - 82} y={5} width={6} height={6} rx={1} fill="#2F5E9E" />
      <text x={W - 73} y={11} fontSize={7} fill="#475569">
        Ingresos
      </text>
      <rect x={W - 82} y={17} width={6} height={3} ry={1} rx={1} fill="#f87171" />
      <text x={W - 73} y={23} fontSize={7} fill="#475569">
        Gastos
      </text>
    </svg>
  );
}

function Dashboard() {
  const kpis = [
    { label: 'Ventas', value: '88.240 €', trend: '▲ +18%', color: 'text-emerald-600' },
    { label: 'Gastos', value: '37.115 €', trend: '▼ -4%', color: 'text-rose-500' },
    { label: 'Neto', value: '78.332 €', trend: '▲ +22%', color: 'text-emerald-600' },
    { label: 'IVA neto', value: '15.291 €', trend: '', color: '' },
  ];
  const max = Math.max(...MONTHLY.map((d) => d.v));
  const W = 260,
    H = 56;
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-4 gap-1.5">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg bg-slate-50 p-2">
            <div className="text-[9px] font-medium text-slate-500">{k.label}</div>
            <div className="mt-0.5 text-[11px] font-bold text-chocolate">{k.value}</div>
            {k.trend && <div className={`text-[9px] font-medium ${k.color}`}>{k.trend}</div>}
          </div>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
        {MONTHLY.map((d, i) => {
          const bH = (d.v / max) * (H - 4);
          const bW = W / 12 - 3;
          return (
            <rect
              key={d.m}
              x={i * (W / 12) + 1.5}
              y={H - bH}
              width={bW}
              height={bH}
              rx={2}
              fill="#2F5E9E"
              opacity={0.45 + 0.55 * (d.v / max)}
            />
          );
        })}
      </svg>
    </div>
  );
}

function BalanceTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-100 text-[10px]">
      {BALANCE.map((row, i) => (
        <div
          key={i}
          className={`flex justify-between px-2.5 py-1 ${row.head ? 'bg-chocolate font-semibold text-cream' : i % 2 === 0 ? 'bg-white text-slate-700' : 'bg-slate-50 text-slate-700'}`}
        >
          <span>{row.label}</span>
          {row.value && (
            <span className={row.head ? 'font-bold' : 'font-medium text-slate-800'}>
              {row.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const DL_PILLS = ['📗 Excel', '📄 PDF', '📝 Word'];
function DownloadPills() {
  return (
    <div className="flex flex-wrap gap-1.5 pt-1">
      {DL_PILLS.map((f) => (
        <span
          key={f}
          className="cursor-default rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] text-slate-600"
        >
          {f}
        </span>
      ))}
    </div>
  );
}

// Tarjeta de resultado para calculadoras personales (IRPF, ISD, ITP).
function CalcResultCard({
  big,
  bigSub,
  bigColor,
  badge,
  badgeColor,
  rows,
  note,
}: {
  big: string;
  bigSub: string;
  bigColor: string;
  badge: string;
  badgeColor: string;
  rows: { l: string; v: string }[];
  note: string;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3">
        <div className="min-w-0">
          <div className={`text-xl font-black sm:text-2xl ${bigColor}`}>{big}</div>
          <div className="text-[10px] font-medium leading-tight text-slate-500">{bigSub}</div>
        </div>
        <span
          className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ${badgeColor}`}
        >
          {badge}
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-100 text-[10px]">
        {rows.map((r, i) => (
          <div
            key={r.l}
            className={`flex justify-between px-2.5 py-1.5 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
          >
            <span className="text-slate-600">{r.l}</span>
            <span className="font-semibold text-slate-800 tabular-nums">{r.v}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] leading-4 text-slate-500">{note}</p>
    </div>
  );
}

// Tarjeta de trámite guiado (pasos + tasa oficial).
function StepsCard({ steps, fee }: { steps: string[]; fee: string }) {
  return (
    <div className="space-y-2.5">
      <ol className="space-y-1.5">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-2 text-[10px] leading-4 text-slate-700">
            <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-isaak-blue text-[8px] font-bold text-white">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <div className="flex items-center justify-between rounded-lg border border-isaak-blue/15 bg-isaak-blue/5 px-3 py-2">
        <span className="text-[10px] font-medium text-slate-600">Tasa oficial</span>
        <span className="text-[11px] font-bold text-chocolate">{fee}</span>
      </div>
    </div>
  );
}

function ArtifactBody({ kind, title }: { kind: ArtifactKind; title: string }) {
  if (kind === 'calc-irpf')
    return (
      <CalcResultCard
        big="612 €"
        bigSub="A devolver en tu declaración"
        bigColor="text-emerald-600"
        badge="A devolver"
        badgeColor="bg-emerald-50 text-emerald-700"
        rows={IRPF_ROWS}
        note="Cálculo con tus datos reales (no una estimación). Borrador listo para revisar y presentar."
      />
    );
  if (kind === 'calc-isd')
    return (
      <CalcResultCard
        big="0 €"
        bigSub="A pagar por la herencia"
        bigColor="text-emerald-600"
        badge="Bonificado 99%"
        badgeColor="bg-emerald-50 text-emerald-700"
        rows={ISD_ROWS}
        note="Comunitat Valenciana · heredero hijo/a. Hay que presentar el modelo 650 aunque salga 0 €."
      />
    );
  if (kind === 'calc-itp')
    return (
      <CalcResultCard
        big="15.000 €"
        bigSub="ITP a pagar (modelo 600)"
        bigColor="text-amber-600"
        badge="A pagar"
        badgeColor="bg-amber-50 text-amber-700"
        rows={ITP_ROWS}
        note="Vivienda usada. Si tienes menos de 35 años o es vivienda protegida, revisamos tipos reducidos."
      />
    );
  if (kind === 'tramite') return <StepsCard steps={TRAMITE_STEPS} fee="55,70 €" />;
  if (kind === 'bar')
    return (
      <div className="space-y-2">
        <BarChart />
        <div className="flex gap-3 text-[10px]">
          <span className="text-slate-500">Total anual</span>
          <span className="font-semibold text-chocolate">88.240 €</span>
          <span className="ml-auto text-slate-500">199 facturas</span>
        </div>
        <DownloadPills />
      </div>
    );
  if (kind === 'pie')
    return (
      <div className="space-y-2">
        <PieChart />
        <div className="flex gap-3 text-[10px]">
          <span className="text-slate-500">Total gastos</span>
          <span className="font-semibold text-chocolate">37.115 €</span>
          <span className="ml-auto text-slate-500">19 proveedores</span>
        </div>
        <DownloadPills />
      </div>
    );
  if (kind === 'line')
    return (
      <div className="space-y-2">
        <LineChart />
        <div className="flex gap-3 text-[10px]">
          <span className="text-slate-500">Margen operativo</span>
          <span className="font-semibold text-emerald-600">67%</span>
          <span className="ml-auto text-slate-500">Neto 78.332 €</span>
        </div>
        <DownloadPills />
      </div>
    );
  if (kind === 'dashboard')
    return (
      <div className="space-y-2">
        <Dashboard />
        <DownloadPills />
      </div>
    );
  if (kind === 'excel')
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-4xl">
          📗
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-chocolate">{title}</div>
          <div className="mt-1 text-[11px] text-slate-500">
            75 filas · 8 columnas · IVA desglosado
          </div>
        </div>
        <div className="flex cursor-default items-center gap-2 rounded-full bg-emerald-600 px-5 py-1.5 text-[11px] font-semibold text-white">
          ⬇ Descargar Excel
        </div>
      </div>
    );
  if (kind === 'pdf-fiscal' || kind === 'pdf-presupuesto')
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-4xl">
          📄
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-chocolate">{title}</div>
          <div className="mt-1 text-[11px] text-slate-500">
            {kind === 'pdf-presupuesto'
              ? '4.800 € + IVA · Válido 30 días'
              : '12 páginas · Ejercicio 2025 completo'}
          </div>
        </div>
        <div className="flex cursor-default items-center gap-2 rounded-full bg-red-500 px-5 py-1.5 text-[11px] font-semibold text-white">
          ⬇ Descargar PDF
        </div>
      </div>
    );
  if (kind === 'table')
    return (
      <div className="space-y-2">
        <BalanceTable />
        <div className="flex gap-3 text-[10px]">
          <span className="text-slate-500">Patrimonio neto</span>
          <span className="font-semibold text-emerald-600">68.420 €</span>
          <span className="ml-auto text-slate-500">Liquidez 2,3</span>
        </div>
        <DownloadPills />
      </div>
    );
  return null;
}

// ── Browser Mockup ────────────────────────────────────────────────────────────

function BrowserMockup({
  scenario,
  visible,
  domain,
}: {
  scenario: Scenario;
  visible: boolean;
  domain: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-1">
          <span className="text-[11px] text-slate-400">{domain}</span>
        </div>
        <div className="w-10" />
      </div>
      <div className="flex h-[360px] sm:h-[370px]">
        {/* Chat */}
        <div className="flex w-[38%] flex-col border-r border-slate-100 bg-slate-50/60 sm:w-[40%]">
          <div className="flex-1 space-y-3 overflow-hidden p-3">
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-isaak-blue px-3 py-2 text-[11px] leading-relaxed text-white">
                {scenario.userMsg}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-isaak-blue text-[10px] font-bold text-white">
                I
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-3 py-2 text-[11px] leading-relaxed text-slate-700 shadow-sm">
                {scenario.isaakMsg}
              </div>
            </div>
            <div className="ml-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-700">
                {scenario.emoji} {scenario.label}
              </span>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-white p-2">
            <div className="flex h-7 items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-[10px] text-slate-400">
              Escribe a Isaak...
            </div>
          </div>
        </div>
        {/* Artifact panel */}
        <div className="flex w-[62%] flex-col bg-white sm:w-[60%]">
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-sm">{scenario.emoji}</span>
              <span className="truncate text-[11px] font-semibold text-chocolate">
                {scenario.artifactTitle}
              </span>
            </div>
            <span className="flex h-5 w-5 cursor-default items-center justify-center rounded-full text-[10px] text-slate-400 hover:bg-slate-100">
              ✕
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <ArtifactBody kind={scenario.kind} title={scenario.artifactTitle} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

const CYCLE_MS = 7000;

const SEGMENTS: { id: Segment; label: string }[] = [
  { id: 'profesional', label: 'Para tu empresa' },
  { id: 'personal', label: 'Para tu vida' },
];

export default function IsaakHeroTour() {
  const [segment, setSegment] = useState<Segment>('profesional');
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Timer de la transición de opacidad (200ms). Si el componente se desmonta a
  // media transición, hay que limpiarlo para no hacer setState tras desmontar.
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenarios = segment === 'personal' ? PERSONAL_SCENARIOS : PROFESIONAL_SCENARIOS;

  function goTo(idx: number) {
    if (idx === current) return;
    setVisible(false);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      setCurrent(idx);
      setVisible(true);
    }, 200);
  }

  function switchSegment(s: Segment) {
    if (s === segment) return;
    setVisible(false);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      setSegment(s);
      setCurrent(0);
      setVisible(true);
    }, 200);
  }

  // Auto-avance: reprograma el siguiente cambio cuando cambia el escenario o el
  // segmento (deps intencionales: current y nº de escenarios; goTo es estable).
  useEffect(() => {
    timer.current = setTimeout(() => goTo((current + 1) % scenarios.length), CYCLE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps intencionales (ver comentario)
  }, [current, scenarios.length]);

  // Limpieza del timer de transición al desmontar.
  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  // scenarios[current] siempre existe: current se mantiene en [0, scenarios.length) por goTo/switchSegment.
  const scenario = scenarios[current]!;

  return (
    <div>
      {/* Conmutador de segmento Personal ↔ Profesional */}
      <div className="mb-5 flex justify-center">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => switchSegment(s.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                segment === s.id
                  ? 'bg-isaak-blue text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <BrowserMockup
        scenario={scenario}
        visible={visible}
        domain={segment === 'personal' ? 'isaak.es' : 'app.isaak.es'}
      />

      {/* Scenario pills */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {scenarios.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              i === current
                ? 'bg-isaak-blue text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-isaak-blue/40 hover:text-isaak-blue'
            }`}
          >
            <span>{s.emoji}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {scenarios.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Escenario ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === current ? 'h-2 w-5 bg-isaak-blue' : 'h-2 w-2 bg-slate-300 hover:bg-slate-400'}`}
          />
        ))}
      </div>
    </div>
  );
}

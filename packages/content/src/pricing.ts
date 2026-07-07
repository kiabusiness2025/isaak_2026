export type BillingCadence = 'monthly' | 'annual';

export type PricingPlan = {
  id: string;
  name: string;
  audience: 'personal' | 'profesional';
  tagline: string;
  monthlyPrice: number | null;
  annualMonthlyEquivalent: number | null;
  trialDays: number | null;
  badge?: 'proximamente' | 'popular';
  features: string[];
};

export const pricingHeader = {
  title: 'Empieza gratis. Sube cuando Isaak te ahorre tiempo real.',
  subtitle: 'No pagas por otro programa. Pagas por dejar de perseguir información.',
  cadenceCopy: {
    monthly: 'Mensual',
    annual: 'Anual · 2 meses gratis',
  },
  trialCopy: '14 días de prueba en todos los planes de pago. Sin tarjeta para empezar.',
};

export const pricingPlans: PricingPlan[] = [
  {
    id: 'chat',
    name: 'Chat',
    audience: 'personal',
    tagline: 'Para preguntar y entender.',
    monthlyPrice: 0,
    annualMonthlyEquivalent: 0,
    trialDays: null,
    features: ['Chat básico', 'Dudas fiscales y administrativas', 'Guías generales', 'Sin tarjeta'],
  },
  {
    id: 'personal',
    name: 'Personal',
    audience: 'personal',
    tagline: 'Para documentos, avisos y trámites personales.',
    monthlyPrice: 15,
    annualMonthlyEquivalent: 12.5,
    trialDays: 14,
    features: ['Todo lo de Chat', 'Documentos', 'Calendario', 'Avisos', 'Trámites personales'],
  },
  {
    id: 'profesional',
    name: 'Profesional',
    audience: 'profesional',
    tagline: 'Para autónomos y empresas.',
    monthlyPrice: 29,
    annualMonthlyEquivalent: 24.17,
    trialDays: 14,
    badge: 'popular',
    features: [
      'Todo lo de Personal',
      'Facturas',
      'Bancos',
      'Programas',
      'IVA / IRPF / Sociedades',
      'Informes',
      'Conectores',
    ],
  },
  {
    id: 'profesional-total',
    name: 'Profesional Total',
    audience: 'profesional',
    tagline: 'Para gestión avanzada con sedes, notificaciones y certificado.',
    monthlyPrice: 49,
    annualMonthlyEquivalent: 40.83,
    trialDays: 14,
    badge: 'proximamente',
    features: [
      'Todo lo de Profesional',
      'Sedes electrónicas',
      'Certificado digital',
      'DEHú',
      'Presentación guiada',
      'Confirmación reforzada',
    ],
  },
];

export const pricingFootnotes = [
  'Empieza gratis. Conecta cuando lo necesites. Confirma solo cuando estés listo.',
  'Precios sin IVA en comunicaciones B2B.',
];

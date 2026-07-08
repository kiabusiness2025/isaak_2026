/**
 * Modelo de precios de Isaak Retro.
 * Fuente: docs/product/ISAAK_RETRO_PRICING_POLICY_2026.md (repo isaak, commit b7745e5).
 */

export type BillingCadence = 'monthly' | 'annual';
export type UsageTab = 'personal' | 'profesional' | 'asesorias';
export type PlanStatus = 'activo' | 'proximamente' | 'beta';

export type Plan = {
  id: string;
  tab: UsageTab;
  name: string;
  status: PlanStatus;
  tagline: string;
  /** Precio mensual en €, sin IVA. null = "Por definir" / no aplica. */
  monthlyPrice: number | null;
  /** Precio anual total en €, sin IVA (no es el equivalente mensual). */
  annualPrice: number | null;
  aiCreditsPerMonth: string;
  usersIncluded: string;
  companiesIncluded: string;
  veriFactuInvoicesPerMonth?: string;
  featuresIncluded: string[];
  featuresExcluded: string[];
  cta: string;
  recommended?: boolean;
};

export const pricingHeader = {
  title: 'Empieza gratis. Sube cuando Isaak te ahorre tiempo real.',
  subtitle:
    'Elige según tu uso: personal, profesional o asesoría. Todos los planes mantienen la misma regla: Isaak prepara, tú confirmas.',
  tabs: {
    personal: 'Uso personal',
    profesional: 'Profesional',
    asesorias: 'Asesorías',
  } satisfies Record<UsageTab, string>,
  cadenceCopy: {
    monthly: 'Mensual',
    annual: 'Anual · 2 meses gratis',
  } satisfies Record<BillingCadence, string>,
  closing: ['No pagas por otro programa.', 'Pagas por dejar de perseguir información.'],
};

export const pricingPageHero = {
  title: 'Precios claros para ordenar tu vida administrativa.',
  subtitle:
    'Empieza gratis. Añade documentos, facturas VeriFactu, bancos, empresas, usuarios y, próximamente, sedes electrónicas y notificaciones oficiales.',
  cta: 'Empezar gratis',
  microcopy: 'Precios sin IVA · Sin permanencia · Cancela cuando quieras',
};

export const plans: Plan[] = [
  // Uso personal
  {
    id: 'chat',
    tab: 'personal',
    name: 'Chat',
    status: 'activo',
    tagline: 'Pregunta y entiende.',
    monthlyPrice: 0,
    annualPrice: 0,
    aiCreditsPerMonth: '100 / mes',
    usersIncluded: '1',
    companiesIncluded: 'No',
    featuresIncluded: [
      'Chat fiscal y administrativo',
      'Guías generales de trámites',
      'Orientación básica sobre renta / IRPF',
    ],
    featuresExcluded: ['Documentos', 'Calendario de avisos', 'Sedes electrónicas'],
    cta: 'Empezar gratis',
  },
  {
    id: 'personal',
    tab: 'personal',
    name: 'Personal',
    status: 'activo',
    tagline: 'Documentos, avisos y trámites personales.',
    monthlyPrice: 15,
    annualPrice: 150,
    aiCreditsPerMonth: '500 / mes',
    usersIncluded: '1',
    companiesIncluded: 'No',
    featuresIncluded: [
      'Todo lo de Chat',
      'Vivienda, coche, herencias y documentos personales',
      'Revisión de documentos',
      'Calendario de avisos personales',
      'Subida de documentos',
      'Informes descargables básicos',
    ],
    featuresExcluded: ['Sedes electrónicas', 'Notificaciones oficiales', 'Certificado digital'],
    cta: 'Empezar prueba',
  },
  {
    id: 'personal-total',
    tab: 'personal',
    name: 'Personal Total',
    status: 'proximamente',
    tagline: 'Sedes, notificaciones y documentos legales personales.',
    monthlyPrice: null,
    annualPrice: null,
    aiCreditsPerMonth: 'Por definir',
    usersIncluded: '1',
    companiesIncluded: 'No',
    featuresIncluded: [
      'Todo lo de Personal',
      'Sedes electrónicas personales',
      'Notificaciones oficiales',
      'Certificado digital',
      'Documentos legales personales',
    ],
    featuresExcluded: [],
    cta: 'Unirme a la lista',
  },
  // Uso profesional
  {
    id: 'profesional',
    tab: 'profesional',
    name: 'Profesional',
    status: 'activo',
    tagline: 'Empresa, bancos, documentos, impuestos y facturas VeriFactu.',
    monthlyPrice: 29,
    annualPrice: 290,
    aiCreditsPerMonth: '1.000 / mes',
    usersIncluded: '1',
    companiesIncluded: '1',
    veriFactuInvoicesPerMonth: 'Hasta 50 / mes',
    featuresIncluded: [
      'Facturación VeriFactu',
      'Clientes y proveedores',
      'IVA, IRPF y modelos básicos',
      'Bancos y tesorería',
      'Documentos y PDFs',
      'Conectores de programas',
      'Informes Excel / PDF / Word',
      'Calendario fiscal profesional',
    ],
    featuresExcluded: ['Sedes electrónicas', 'DEHú', 'Certificado digital'],
    cta: 'Probar Profesional',
    recommended: true,
  },
  {
    id: 'profesional-avanzado',
    tab: 'profesional',
    name: 'Profesional Avanzado',
    status: 'activo',
    tagline: 'Más volumen, más usuarios, más empresas y más facturas VeriFactu.',
    monthlyPrice: 49,
    annualPrice: 490,
    aiCreditsPerMonth: '2.500 / mes',
    usersIncluded: '3',
    companiesIncluded: '2',
    veriFactuInvoicesPerMonth: 'Hasta 250 / mes',
    featuresIncluded: [
      'Todo lo de Profesional',
      'Impuesto de Sociedades',
      'Soporte prioritario',
      'Confirmación reforzada avanzada',
    ],
    featuresExcluded: ['Sedes electrónicas', 'DEHú', 'Certificado digital'],
    cta: 'Probar Profesional Avanzado',
  },
  {
    id: 'profesional-total',
    tab: 'profesional',
    name: 'Profesional Total',
    status: 'proximamente',
    tagline: 'Sedes electrónicas, DEHú, certificado y presentación guiada.',
    monthlyPrice: null,
    annualPrice: null,
    aiCreditsPerMonth: 'Por definir',
    usersIncluded: 'Por definir',
    companiesIncluded: 'Por definir',
    featuresIncluded: [
      'Todo lo de Profesional Avanzado',
      'Sedes electrónicas',
      'DEHú / notificaciones oficiales',
      'Certificado digital',
      'Documentos legales profesionales',
      'Presentación guiada',
    ],
    featuresExcluded: [],
    cta: 'Unirme a la lista',
  },
  // Asesorías
  {
    id: 'asesoria-beta-inicio',
    tab: 'asesorias',
    name: 'Asesoría Beta Inicio',
    status: 'beta',
    tagline: 'Para despachos pequeños que quieren probar Isaak con pocos clientes.',
    monthlyPrice: null,
    annualPrice: null,
    aiCreditsPerMonth: 'Bolsa beta',
    usersIncluded: 'Por definir',
    companiesIncluded: 'Por definir',
    featuresIncluded: [
      'Cola de documentación (beta)',
      'Revisión documental (beta)',
      'Alertas y vencimientos por cliente (beta)',
      'Resúmenes para revisión humana (beta)',
    ],
    featuresExcluded: ['Panel de clientes', 'Sedes y notificaciones', 'Marca blanca'],
    cta: 'Solicitar acceso a la beta',
  },
  {
    id: 'asesoria-beta-despacho',
    tab: 'asesorias',
    name: 'Asesoría Beta Despacho',
    status: 'beta',
    tagline: 'Para asesorías con cartera recurrente de autónomos y pymes.',
    monthlyPrice: null,
    annualPrice: null,
    aiCreditsPerMonth: 'Bolsa beta',
    usersIncluded: 'Por definir',
    companiesIncluded: 'Por definir',
    featuresIncluded: [
      'Todo lo de Beta Inicio',
      'Marca blanca (opcional)',
      'Onboarding con reunión beta',
    ],
    featuresExcluded: ['Sedes y notificaciones'],
    cta: 'Solicitar acceso a la beta',
  },
  {
    id: 'asesoria-beta-red',
    tab: 'asesorias',
    name: 'Asesoría Beta Red',
    status: 'beta',
    tagline: 'Para redes, franquicias, partners o despachos con varios equipos.',
    monthlyPrice: null,
    annualPrice: null,
    aiCreditsPerMonth: 'Bolsa beta',
    usersIncluded: 'Por definir',
    companiesIncluded: 'Por definir',
    featuresIncluded: ['Todo lo de Beta Despacho', 'Co-branding', 'Onboarding con reunión beta'],
    featuresExcluded: ['Sedes y notificaciones'],
    cta: 'Solicitar acceso a la beta',
  },
];

export type ComparisonRow = {
  label: string;
  values: string[];
};

export type ComparisonTable = {
  tab: UsageTab;
  planNames: string[];
  rows: ComparisonRow[];
};

export const comparisonTables: ComparisonTable[] = [
  {
    tab: 'personal',
    planNames: ['Chat', 'Personal', 'Personal Total'],
    rows: [
      { label: 'Precio mensual', values: ['0 €', '15 € + IVA', 'Por definir'] },
      { label: 'Créditos IA / mes', values: ['100', '500', 'Por definir'] },
      { label: 'Chat fiscal y administrativo', values: ['Sí', 'Sí', 'Sí'] },
      { label: 'Orientación renta / IRPF', values: ['Básica', 'Sí', 'Sí'] },
      { label: 'Revisión de documentos', values: ['No', 'Sí', 'Sí'] },
      { label: 'Calendario de avisos personales', values: ['No', 'Sí', 'Sí'] },
      { label: 'Subida de documentos', values: ['No', 'Sí', 'Sí'] },
      { label: 'Sedes electrónicas personales', values: ['No', 'No', 'Próximamente'] },
      { label: 'Notificaciones oficiales', values: ['No', 'No', 'Próximamente'] },
      { label: 'Certificado digital', values: ['No', 'No', 'Próximamente'] },
      { label: 'Soporte', values: ['Base', 'Email', 'Prioritario'] },
    ],
  },
  {
    tab: 'profesional',
    planNames: ['Profesional', 'Profesional Avanzado', 'Profesional Total'],
    rows: [
      { label: 'Precio mensual', values: ['29 € + IVA', '49 € + IVA', 'Por definir'] },
      { label: 'Usuarios incluidos', values: ['1', '3', 'Por definir'] },
      { label: 'Empresas/autónomos incluidos', values: ['1', '2', 'Por definir'] },
      { label: 'Créditos IA / mes', values: ['1.000', '2.500', 'Por definir'] },
      { label: 'Facturación VeriFactu', values: ['Sí', 'Sí', 'Sí'] },
      { label: 'Límite de facturas VeriFactu / mes', values: ['50', '250', 'Por definir'] },
      {
        label: 'Impuesto de Sociedades',
        values: ['Orientativo / preparación', 'Sí', 'Sí'],
      },
      { label: 'Bancos y tesorería', values: ['Sí', 'Sí', 'Sí'] },
      { label: 'Conectores de programas', values: ['Sí', 'Sí', 'Sí'] },
      { label: 'Sedes electrónicas', values: ['No', 'No', 'Próximamente'] },
      { label: 'DEHú / notificaciones oficiales', values: ['No', 'No', 'Próximamente'] },
      { label: 'Certificado digital', values: ['No', 'No', 'Próximamente'] },
      { label: 'Presentación guiada', values: ['No', 'No', 'Próximamente'] },
      { label: 'Soporte', values: ['Email', 'Prioritario', 'Prioritario / onboarding'] },
    ],
  },
  {
    tab: 'asesorias',
    planNames: ['Beta Inicio', 'Beta Despacho', 'Beta Red'],
    rows: [
      { label: 'Precio', values: ['Próximamente', 'Próximamente', 'Próximamente'] },
      { label: 'Cola de documentación', values: ['Beta', 'Beta', 'Beta'] },
      { label: 'Revisión documental', values: ['Beta', 'Beta', 'Beta'] },
      { label: 'Alertas y vencimientos por cliente', values: ['Beta', 'Beta', 'Beta'] },
      { label: 'Resúmenes para revisión humana', values: ['Beta', 'Beta', 'Beta'] },
      { label: 'Sedes y notificaciones', values: ['Próximamente', 'Próximamente', 'Próximamente'] },
      { label: 'Marca blanca', values: ['No', 'Opcional', 'Por definir'] },
      { label: 'Co-branding', values: ['No', 'Opcional', 'Sí / por definir'] },
      { label: 'Onboarding', values: ['Formulario beta', 'Reunión beta', 'Reunión beta'] },
    ],
  },
];

export type CreditPack = {
  id: string;
  label: string;
  price: string;
  recommendedFor: string;
};

export const creditsSection = {
  title: 'Créditos IA: usa más cuando lo necesites.',
  body: 'Cada plan incluye una bolsa mensual de créditos IA. Las consultas simples consumen poco. Revisar documentos, generar informes o cruzar datos consume más. Si necesitas más, puedes comprar packs adicionales.',
  usageExamples: [
    { action: 'Pregunta corta de chat', credits: '1 crédito' },
    { action: 'Respuesta con contexto del usuario', credits: '2–3 créditos' },
    { action: 'Revisión simple de documento', credits: '5–10 créditos' },
    { action: 'Resumen de notificación', credits: '5–15 créditos' },
    { action: 'Informe con tablas', credits: '10–25 créditos' },
    { action: 'Cruce banco + factura + modelo', credits: '15–30 créditos' },
  ],
  packs: [
    { id: '100', label: '100 créditos', price: '9,99 € + IVA', recommendedFor: 'Consultas puntuales' },
    { id: '500', label: '500 créditos', price: '39,99 € + IVA', recommendedFor: 'Uso frecuente' },
    { id: '2000', label: '2.000 créditos', price: '129,99 € + IVA', recommendedFor: 'Uso intensivo' },
    {
      id: 'custom',
      label: 'Importe personalizado',
      price: 'Desde 50 créditos',
      recommendedFor: 'Casos especiales',
    },
  ] satisfies CreditPack[],
  notes: [
    'Los créditos incluidos se renuevan mensualmente y no se acumulan de un mes a otro.',
    'Los créditos comprados se usan después de agotar los incluidos.',
    'Comprar créditos no desbloquea funciones de planes superiores.',
  ],
};

export const addOns = [
  { id: 'usuario', label: 'Usuario adicional', price: '9 € + IVA / mes', appliesTo: 'Profesional y Profesional Avanzado' },
  { id: 'empresa', label: 'Empresa adicional', price: '12 € + IVA / mes', appliesTo: 'Profesional y Profesional Avanzado' },
];

export const planSelectorQuiz = {
  title: '¿Qué quieres gestionar?',
  options: [
    {
      id: 'personal',
      label: 'Mi vida personal',
      answer: [
        'Empieza con Chat si solo quieres preguntar.',
        'Elige Personal si quieres documentos y avisos.',
        'Espera Personal Total si necesitas sedes y documentos legales.',
      ],
    },
    {
      id: 'profesional',
      label: 'Mi negocio',
      answer: [
        'Elige Profesional si tienes una empresa o eres autónomo.',
        'Elige Profesional Avanzado si tienes más usuarios, más facturas o más volumen.',
        'Espera Profesional Total si necesitas sedes, certificado y notificaciones oficiales.',
      ],
    },
    {
      id: 'asesoria',
      label: 'Mi asesoría',
      answer: ['Solicita acceso a la beta para despachos.'],
    },
  ],
};

export const pricingConditions = {
  title: 'Condiciones claras.',
  bullets: [
    'Precios sin IVA.',
    'Sin permanencia.',
    'Cancela cuando quieras.',
    'Los planes anuales se facturan por adelantado.',
    'Las acciones sensibles requieren confirmación.',
    'La beta de asesorías es por invitación.',
    'Los créditos no desbloquean funciones superiores.',
  ],
  cta: 'Ver términos completos',
};

export const advisorBetaForm = {
  title: 'Solicitar acceso a la beta de asesorías',
  fields: {
    painOptions: [
      'Documentación incompleta',
      'Consultas repetidas',
      'Vencimientos',
      'Notificaciones',
      'Facturación',
      'Modelos fiscales',
      'Comunicación con clientes',
      'Revisión de documentos',
      'Otro',
    ],
  },
  successMessage:
    'Solicitud recibida. Estamos preparando la beta de Isaak para asesorías. Revisaremos tu caso y te contactaremos cuando abramos nuevas plazas.',
};

export const pricingFaqItems = [
  {
    question: '¿Los precios incluyen IVA?',
    answer: 'No. Los precios de pago se muestran sin IVA. El IVA se calcula en el checkout según corresponda.',
  },
  {
    question: '¿Qué pasa si agoto los créditos?',
    answer:
      'Puedes comprar packs adicionales o subir de plan. Los créditos comprados se usan después de agotar los incluidos.',
  },
  {
    question: '¿Comprar créditos desbloquea sedes electrónicas?',
    answer: 'No. Los créditos amplían uso, pero no desbloquean funciones de planes superiores.',
  },
  {
    question: '¿Puedo cambiar de plan?',
    answer: 'Sí. Puedes subir de plan cuando quieras. Los downgrades se aplican al finalizar el periodo activo.',
  },
  {
    question: '¿Puedo cancelar?',
    answer: 'Sí. No hay permanencia. Puedes cancelar la renovación desde tu cuenta.',
  },
  {
    question: '¿La facturación VeriFactu está incluida?',
    answer: 'Sí, en los planes profesionales dentro de los límites de cada plan.',
  },
  {
    question: '¿Qué incluye Asesorías?',
    answer:
      'De momento será una beta privada para despachos. Puedes solicitar acceso y te contactaremos.',
  },
  {
    question: '¿Isaak presenta impuestos automáticamente?',
    answer: 'No sin confirmación. Isaak prepara, tú confirmas.',
  },
  {
    question: '¿El plan profesional incluye uso personal?',
    answer:
      'Sí. Los planes profesionales pueden cubrir también consultas personales del titular, siempre dentro de los límites del plan.',
  },
  {
    question: '¿Puedo añadir más empresas o usuarios?',
    answer: 'Sí. En planes profesionales se prevén add-ons de usuario adicional y empresa adicional.',
  },
];

export const pricingClosing = 'Elige por dónde empezar. Isaak irá creciendo contigo.';

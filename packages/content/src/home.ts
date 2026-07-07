export type FloatingCardSpec = {
  id: string;
  label: string;
  detail: string;
};

export const hero = {
  eyebrow: 'Isaak Retro',
  title: 'Isaak habla con tus programas y entiende las sedes electrónicas.',
  titleLine2: 'Tú solo hablas con Isaak.',
  subtitle:
    'Facturas, bancos, documentos, modelos, plazos y notificaciones oficiales en una sola conversación. Isaak busca, entiende y prepara. Tú confirmas.',
  ctaPrimary: 'Empezar gratis',
  ctaSecondary: 'Ver demo',
  microcopy: 'Sin tarjeta. Sin permanencia. Tú tienes siempre la última palabra.',
  demoPrompt: 'Isaak, ¿qué tengo pendiente esta semana?',
  demoAnswerLines: [
    '3 vencimientos detectados',
    '2 facturas pendientes',
    '1 notificación requiere revisión',
  ],
  seal: 'Menos caos. Más claridad.',
  floatingCards: [
    { id: 'factura', label: 'Factura pendiente', detail: 'Cliente Nova Ediciones · 21 días' },
    { id: 'banco', label: 'Banco actualizado', detail: 'Saldo cubre 21 días de gastos' },
    { id: 'modelo-303', label: 'Modelo 303', detail: 'Vence el 20 de este mes' },
    { id: 'notificacion-aeat', label: 'Notificación AEAT', detail: 'Requiere revisión' },
    { id: 'calendario', label: 'Calendario fiscal', detail: '1 plazo esta semana' },
    { id: 'cliente', label: 'Cliente pendiente de cobro', detail: '2 facturas sin cobrar' },
    { id: 'documento', label: 'Documento PDF', detail: 'Carta de Hacienda sin abrir' },
    { id: 'seg-social', label: 'Seguridad Social', detail: 'Cotización al día' },
  ] satisfies FloatingCardSpec[],
};

export const problem = {
  eyebrow: 'El punto de partida',
  scenario:
    'He empezado mi negocio. Tengo clientes, facturas, gastos, una cuenta bancaria, emails, documentos, plazos fiscales y dudas. Al principio pensé que podía gestionarlo todo con Excel, correo y mi asesoría. Pero cada semana aparece algo nuevo.',
  title: 'Empezar un proyecto ya es difícil. Gestionarlo no debería ser otro trabajo.',
  body: [
    'Un programa para facturas.',
    'Otro para el banco.',
    'Documentos en carpetas.',
    'Correos sin responder.',
    'Modelos que no entiendes.',
    'Notificaciones que dan miedo abrir.',
    'Plazos que aparecen justo cuando estás vendiendo, entregando o apagando fuegos.',
  ],
  resolution: ['Hasta ahora, tú eras el puente.', 'Ahora lo es Isaak.'],
};

export const solution = {
  eyebrow: 'La solución',
  title: 'No necesitas otro programa. Necesitas alguien que hable con los que ya usas.',
  body: 'Isaak conecta tus herramientas, interpreta documentos, entiende modelos oficiales y convierte todo en una conversación clara.',
  nodes: [
    'Programas de facturación',
    'Bancos',
    'Documentos',
    'Correo',
    'Calendario',
    'Sedes electrónicas',
    'Notificaciones',
    'Modelos fiscales',
  ],
};

export const journey = {
  eyebrow: 'Antes / Después',
  title: 'Antes: buscar. Después: preguntar.',
  before: [
    'Abrir ERP.',
    'Revisar banco.',
    'Buscar PDF.',
    'Preguntar al asesor.',
    'Mirar calendario fiscal.',
    'Entrar en una sede.',
    'Copiar datos en Excel.',
  ],
  after: ['Preguntas a Isaak.', 'Isaak cruza datos.', 'Isaak prepara.', 'Tú confirmas.'],
  body: [
    'La gestión tradicional empieza cuando tú reúnes la información.',
    'Isaak empieza antes: cuando detecta que algo falta.',
  ],
};

export const demoSection = {
  eyebrow: 'Demo conversacional',
  title: 'Pregúntale algo que normalmente mandarías a tu asesoría.',
  prompt: 'Isaak, acabo de empezar mi proyecto. ¿Qué debería tener controlado esta semana?',
  answerIntro: 'Te preparo un resumen claro:',
  answerItems: [
    { label: 'Facturas', detail: 'hay 2 pendientes de cobro.' },
    { label: 'Banco', detail: 'el saldo cubre gastos de los próximos 21 días.' },
    { label: 'Documentos', detail: 'falta subir 1 factura de proveedor.' },
    { label: 'Fiscalidad', detail: 'conviene revisar IVA estimado.' },
    { label: 'Plazos', detail: 'hay un vencimiento próximo en calendario.' },
  ],
  answerClosing: 'No haré nada sin tu confirmación.',
  actionButton: 'Ver acción preparada',
};

export const officialSitesSection = {
  eyebrow: 'Sedes electrónicas',
  title: 'Isaak también entiende la Administración.',
  body: 'Modelos, plazos, notificaciones, certificados, trámites y sedes oficiales. Isaak convierte lenguaje administrativo en instrucciones claras.',
};

export const connectorsSection = {
  eyebrow: 'Conectores',
  title: 'Tus programas hablan idiomas distintos. Isaak los traduce.',
  body: 'Conecta lo que ya usas. Isaak no te obliga a cambiar tu forma de trabajar: la entiende.',
  categories: [
    { id: 'facturacion', label: 'Facturación y ERP', actions: ['Lee datos', 'Prepara resumen'] },
    { id: 'bancos', label: 'Bancos', actions: ['Lee movimientos', 'Prepara resumen'] },
    { id: 'documentos', label: 'Documentos', actions: ['Lee documentos', 'Pide confirmación'] },
    { id: 'correo', label: 'Correo', actions: ['Lee avisos', 'Prepara resumen'] },
    { id: 'calendario', label: 'Calendario', actions: ['Lee plazos', 'Prepara aviso'] },
    { id: 'sedes', label: 'Sedes electrónicas', actions: ['Lee notificaciones', 'Pide confirmación'] },
    { id: 'notificaciones', label: 'Notificaciones oficiales', actions: ['Lee y resume', 'Pide confirmación'] },
    { id: 'certificado', label: 'Certificado digital', actions: ['Verifica identidad', 'Pide confirmación'] },
    { id: 'mensajeria', label: 'WhatsApp y Telegram', actions: ['Envía avisos', 'Prepara resumen'] },
  ],
};

export const useCasesSection = {
  eyebrow: 'Casos de uso',
  columns: [
    {
      id: 'personal',
      title: 'Tu vida administrativa, sin lenguaje imposible.',
      href: '/personal',
      questions: [
        '¿Tengo algo pendiente con Hacienda?',
        '¿Qué significa esta notificación?',
        '¿Qué documentos necesito para este trámite?',
        '¿Cuándo vence este pago?',
        '¿Qué afecta a mi vivienda o coche?',
      ],
    },
    {
      id: 'profesional',
      title: 'Tu empresa en una conversación.',
      href: '/profesional',
      questions: [
        '¿Cuánto IVA llevo acumulado?',
        '¿Qué clientes me deben dinero?',
        '¿Qué gasto ha subido este mes?',
        '¿Qué factura falta?',
        '¿Qué modelos me afectan?',
      ],
    },
    {
      id: 'asesorias',
      title: 'Menos ruido operativo. Más criterio.',
      href: '/profesional',
      questions: [
        '¿Qué clientes tienen documentación incompleta?',
        '¿Qué vencimientos están en riesgo?',
        '¿Qué resumen puedo revisar antes de contactar?',
        '¿Qué tareas repetitivas puede preparar Isaak?',
      ],
    },
  ],
};

export const securitySection = {
  eyebrow: 'Seguridad',
  title: 'Isaak prepara. Tú confirmas.',
  body: 'Isaak puede ordenar, explicar, calcular, redactar y preparar. Pero no presenta, paga, envía ni modifica nada sensible sin tu visto bueno.',
  cards: [
    { title: 'Datos usados', detail: 'Ves exactamente qué información se ha consultado.' },
    { title: 'Fuente consultada', detail: 'Cada dato lleva su origen: programa, banco o sede oficial.' },
    { title: 'Acción preparada', detail: 'Isaak deja lista la acción, nunca la ejecuta solo.' },
    { title: 'Confirmación humana', detail: 'Nada sensible ocurre sin tu aprobación explícita.' },
  ],
  readyLabel: 'Listo para revisar',
  confirmLabel: 'Confirmar',
};

export const pricingPreview = {
  eyebrow: 'Precios',
  title: 'Empieza gratis. Sube cuando Isaak te ahorre tiempo real.',
};

export const finalCta = {
  title: 'La próxima vez que no sepas dónde mirar, pregúntale a Isaak.',
  subtitle:
    'Tus programas, documentos, bancos y trámites oficiales empiezan a tener sentido cuando alguien los conecta.',
  ctaPrimary: 'Empezar gratis',
  ctaSecondary: 'Ver demo',
};

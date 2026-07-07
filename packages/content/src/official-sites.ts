export type OfficialSite = {
  id: string;
  name: string;
  understands: string;
  prepares: string;
  requiresConfirmation: string;
};

export const officialSites: OfficialSite[] = [
  {
    id: 'aeat',
    name: 'Agencia Tributaria',
    understands: 'Modelos, calendario, notificaciones, pagos y trámites.',
    prepares: 'Resúmenes de modelos, borradores y explicaciones de notificaciones.',
    requiresConfirmation: 'Presentación, pago o respuesta a una notificación.',
  },
  {
    id: 'seguridad-social',
    name: 'Seguridad Social',
    understands: 'Vida laboral, cotización, deudas, informes.',
    prepares: 'Resumen de situación y alertas de cotización.',
    requiresConfirmation: 'Trámites y solicitudes ante la Seguridad Social.',
  },
  {
    id: 'importass',
    name: 'Importass',
    understands: 'Datos personales de autónomos, informes, pagos y deudas.',
    prepares: 'Resumen de estado y próximos vencimientos.',
    requiresConfirmation: 'Cambios de base de cotización o pagos.',
  },
  {
    id: 'dehu',
    name: 'DEHú',
    understands: 'Notificaciones electrónicas y plazos de respuesta.',
    prepares: 'Alertas priorizadas por urgencia y plazo.',
    requiresConfirmation: 'Cotejo o respuesta a una notificación.',
  },
  {
    id: 'pag',
    name: 'Punto de Acceso General',
    understands: 'Registros, apoderamientos, CSV y acceso a sedes.',
    prepares: 'Localización del trámite correcto y requisitos.',
    requiresConfirmation: 'Registro de escritos o apoderamientos.',
  },
  {
    id: 'carpeta-ciudadana',
    name: 'Mi Carpeta Ciudadana',
    understands: 'Expedientes, datos personales, citas y alertas.',
    prepares: 'Vista unificada de expedientes activos.',
    requiresConfirmation: 'Solicitud de citas o gestiones personales.',
  },
  {
    id: 'dgt',
    name: 'DGT',
    understands: 'Vehículos, multas, puntos, tasas.',
    prepares: 'Resumen de estado del vehículo y multas pendientes.',
    requiresConfirmation: 'Pago de multas o trámites de vehículo.',
  },
  {
    id: 'catastro',
    name: 'Catastro',
    understands: 'Inmuebles, referencias, expedientes y certificados.',
    prepares: 'Resumen de inmuebles y valor de referencia.',
    requiresConfirmation: 'Solicitud de certificados o modificaciones.',
  },
  {
    id: 'registradores',
    name: 'Registradores',
    understands: 'Registro mercantil, propiedad y bienes muebles.',
    prepares: 'Localización de información registral relevante.',
    requiresConfirmation: 'Solicitud de nota simple o certificación.',
  },
  {
    id: 'sepe',
    name: 'SEPE',
    understands: 'Empleo, prestaciones y contratos.',
    prepares: 'Resumen de estado de prestación o contrato.',
    requiresConfirmation: 'Solicitudes y trámites de prestación.',
  },
  {
    id: 'ccaa',
    name: 'Comunidades Autónomas',
    understands: 'Tributos cedidos: ITP, AJD, sucesiones, donaciones.',
    prepares: 'Explicación de qué tributo aplica y cuándo.',
    requiresConfirmation: 'Presentación de tributos autonómicos.',
  },
  {
    id: 'ayuntamientos',
    name: 'Ayuntamientos',
    understands: 'IBI, IAE, plusvalía, padrón, tasas y multas locales.',
    prepares: 'Resumen de obligaciones municipales.',
    requiresConfirmation: 'Pago o alegación ante el ayuntamiento.',
  },
];

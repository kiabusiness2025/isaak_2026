export type ConnectorCategory = {
  id: string;
  label: string;
  description: string;
  examples: string[];
};

export const connectorCategories: ConnectorCategory[] = [
  {
    id: 'programas',
    label: 'Facturación y ERP',
    description: 'Isaak lee tus facturas, gastos e inventario sin que cambies de programa.',
    examples: ['Holded', 'Sage', 'A3', 'Odoo', 'Excel'],
  },
  {
    id: 'bancos',
    label: 'Bancos',
    description: 'Movimientos, saldos y conciliación cruzados con tus facturas.',
    examples: ['Open banking (PSD2)', 'Bancos principales de España'],
  },
  {
    id: 'documentos',
    label: 'Documentos',
    description: 'Contratos, facturas y cartas oficiales, entendidos automáticamente.',
    examples: ['Google Drive', 'Microsoft 365', 'PDF', 'Fotos de documentos'],
  },
  {
    id: 'correo',
    label: 'Correo',
    description: 'Isaak detecta avisos importantes entre el ruido de la bandeja.',
    examples: ['Gmail', 'Microsoft Outlook'],
  },
  {
    id: 'calendario',
    label: 'Calendario',
    description: 'Plazos fiscales y citas administrativas, en el mismo calendario que ya usas.',
    examples: ['Google Calendar', 'Microsoft Calendar'],
  },
  {
    id: 'sedes',
    label: 'Sedes electrónicas',
    description: 'Lectura de notificaciones y trámites oficiales, con confirmación humana.',
    examples: ['AEAT', 'Seguridad Social', 'DEHú'],
  },
  {
    id: 'notificaciones',
    label: 'Notificaciones',
    description: 'Resumen priorizado de lo que de verdad importa esta semana.',
    examples: ['DEHú', 'Notificaciones AEAT'],
  },
  {
    id: 'certificado',
    label: 'Certificado digital',
    description: 'Acceso autenticado a sedes cuando el trámite lo requiere.',
    examples: ['Certificado FNMT', 'DNIe'],
  },
  {
    id: 'mensajeria',
    label: 'WhatsApp y Telegram',
    description: 'Avisos y resúmenes por el canal que ya usas cada día.',
    examples: ['WhatsApp Business', 'Telegram', 'Email'],
  },
];

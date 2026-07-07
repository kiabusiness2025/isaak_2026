/**
 * Reglas de claims para toda la web. Ver docs/product/ISAAK_RETRO_ROADMAP_2026.md §3, §20.
 */
export const copyGuardrails = {
  allowed: [
    'Isaak habla con tus programas y entiende las sedes electrónicas.',
    'Isaak prepara. Tú confirmas.',
    'Menos caos. Más claridad.',
    'Isaak sabe dónde mirar.',
    'No abras diez pestañas. Abre una conversación.',
  ],
  avoid: [
    'Isaak sustituye a tu asesor.',
    'Olvídate de tu gestoría.',
    'Isaak presenta todo automáticamente.',
    'Ahorra miles de euros con Isaak.',
  ],
  requiresLegalReview: [
    'Cualquier claim sobre presentación automática de impuestos.',
    'Cualquier claim sobre responsabilidad legal de Isaak ante notificaciones oficiales.',
    'Cualquier comparativa directa con asesorías o gestorías nombradas.',
  ],
} as const;

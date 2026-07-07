export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: '¿Isaak sustituye a una asesoría?',
    answer:
      'Isaak resuelve y prepara muchas tareas del día a día, pero no elimina tu criterio ni la revisión profesional cuando haga falta. Su objetivo es que llegues con todo claro, ordenado y preparado.',
  },
  {
    question: '¿Isaak presenta impuestos automáticamente?',
    answer:
      'No sin tu confirmación. Isaak puede preparar, explicar y guiar. Las acciones sensibles requieren aprobación expresa.',
  },
  {
    question: '¿Tengo que cambiar de programa?',
    answer: 'No. Isaak está pensado para hablar con las herramientas que ya usas.',
  },
  {
    question: '¿Holded es obligatorio?',
    answer: 'No. Holded es solo uno de muchos conectores posibles.',
  },
  {
    question: '¿Qué significa que Isaak entiende sedes electrónicas?',
    answer:
      'Que puede trabajar con información oficial, modelos, plazos, trámites y notificaciones para explicarte qué aplica y qué paso preparar.',
  },
  {
    question: '¿Puedo usarlo si estoy empezando?',
    answer:
      'Sí. De hecho, Isaak es especialmente útil cuando todavía no tienes todo ordenado.',
  },
];

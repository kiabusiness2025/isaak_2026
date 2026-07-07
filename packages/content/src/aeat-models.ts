export type AeatModel = {
  code: string;
  name: string;
  area: 'IVA' | 'IRPF' | 'Retenciones' | 'Resúmenes' | 'Censos' | 'Terceros' | 'Sociedades';
  periodicity: 'Mensual' | 'Trimestral' | 'Anual' | 'Según evento';
};

export const aeatModels: AeatModel[] = [
  { code: '303', name: 'IVA — autoliquidación', area: 'IVA', periodicity: 'Trimestral' },
  { code: '390', name: 'IVA — resumen anual', area: 'IVA', periodicity: 'Anual' },
  { code: '349', name: 'Operaciones intracomunitarias', area: 'IVA', periodicity: 'Trimestral' },
  { code: '100', name: 'IRPF — Declaración de la Renta', area: 'IRPF', periodicity: 'Anual' },
  { code: '130', name: 'IRPF — pago fraccionado (estimación directa)', area: 'IRPF', periodicity: 'Trimestral' },
  { code: '131', name: 'IRPF — pago fraccionado (módulos)', area: 'IRPF', periodicity: 'Trimestral' },
  { code: '111', name: 'Retenciones — trabajadores y profesionales', area: 'Retenciones', periodicity: 'Trimestral' },
  { code: '115', name: 'Retenciones — alquileres', area: 'Retenciones', periodicity: 'Trimestral' },
  { code: '123', name: 'Retenciones — capital mobiliario', area: 'Retenciones', periodicity: 'Trimestral' },
  { code: '180', name: 'Resumen anual — alquileres', area: 'Resúmenes', periodicity: 'Anual' },
  { code: '190', name: 'Resumen anual — retenciones trabajo', area: 'Resúmenes', periodicity: 'Anual' },
  { code: '193', name: 'Resumen anual — capital mobiliario', area: 'Resúmenes', periodicity: 'Anual' },
  { code: '030', name: 'Censo — alta/modificación datos personales', area: 'Censos', periodicity: 'Según evento' },
  { code: '036', name: 'Censo — declaración general', area: 'Censos', periodicity: 'Según evento' },
  { code: '037', name: 'Censo — declaración simplificada', area: 'Censos', periodicity: 'Según evento' },
  { code: '347', name: 'Operaciones con terceros', area: 'Terceros', periodicity: 'Anual' },
  { code: '200', name: 'Impuesto sobre Sociedades', area: 'Sociedades', periodicity: 'Anual' },
  { code: '202', name: 'Sociedades — pago fraccionado', area: 'Sociedades', periodicity: 'Según evento' },
];

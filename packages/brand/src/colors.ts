/**
 * Isaak Retro — paleta de marca.
 * Regla visual: 70% crema/beige, 15% chocolate, 10% cobre/camel, 5% azul Isaak.
 */
export const colors = {
  cream: '#F7F1E7',
  beige: '#E8D8BF',
  camel: '#C89B61',
  chocolate: '#3D2A1F',
  copper: '#B87333',
  isaakBlue: '#2F5E9E',
} as const;

export type BrandColor = keyof typeof colors;

import type { MetadataRoute } from 'next';
import { siteMeta } from '@isaak/content';

const routes = [
  '',
  '/personal',
  '/profesional',
  '/precios',
  '/demo',
  '/conectores',
  '/conectores/programas',
  '/conectores/bancos',
  '/conectores/documentos',
  '/conectores/sedes-electronicas',
  '/sedes-electronicas',
  '/modelos',
  '/modelos/aeat',
  '/calendario-fiscal',
  '/seguridad',
  '/faq',
  '/legal/privacidad',
  '/legal/terminos',
  '/legal/cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteMeta.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.6,
  }));
}

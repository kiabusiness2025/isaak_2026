import type { MetadataRoute } from 'next';
import { siteMeta } from '@isaak/content';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMeta.siteUrl}/sitemap.xml`,
  };
}

import type { MetadataRoute } from 'next';
import { guides, siteUrl, reviewedOn } from '@/lib/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...guides.map(guide => guide.href), '/about/', '/privacy/', '/contact/'].map(path => ({
    url: siteUrl + path,
    lastModified: reviewedOn,
  }));
}


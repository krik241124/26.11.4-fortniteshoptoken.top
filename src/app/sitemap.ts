import type { MetadataRoute } from 'next';
import { guides, siteUrl, pageUpdatedOn } from '@/lib/site';
import shopSnapshot from '@/data/item-shop.json';
import { shopModifiedAt } from '@/lib/shop';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...guides.map(guide => guide.href), '/fortnite-item-shop-today/', '/about/', '/editorial-policy/', '/privacy/', '/contact/'].map(path => ({
    url: siteUrl + path,
    lastModified: path === '/fortnite-item-shop-today/' ? shopModifiedAt(shopSnapshot.fetchedAt) : pageUpdatedOn(path),
  }));
}

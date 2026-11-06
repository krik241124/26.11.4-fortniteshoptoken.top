export type ShopItem = { name: string; type: string; rarity: string; artist: string | null };
export type ShopEntry = {
  id: string; name: string; section: string; sectionRank: number; sectionIndex: number;
  finalPrice: number; regularPrice: number; inDate: string | null; outDate: string | null;
  image: string | null; isBundle: boolean; types: string[]; rarities: string[]; items: ShopItem[];
};
export type ShopSnapshot = { version: number; source: string; sourceDate: string; fetchedAt: string; sourceHash: string | null; entries: ShopEntry[] };
export const shopPublishedAt = '2026-11-07T00:00:00+08:00';
export function shopModifiedAt(fetchedAt: string) { return new Date(Math.max(Date.parse(shopPublishedAt), Date.parse(fetchedAt))).toISOString(); }
export type ShopFilters = { query: string; section: string; type: string; rarity: string; budget: string; discounted: boolean; sort: string };
export const emptyShopFilters: ShopFilters = { query: '', section: '', type: '', rarity: '', budget: '', discounted: false, sort: 'section' };
export const formatShopDate = (value: string) => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
export function formatShopTime(value: string) { return `${value.slice(0, 10)} ${value.slice(11, 16)} UTC`; }
export function snapshotIsStale(sourceDate: string, now: number) {
  return !Number.isFinite(Date.parse(sourceDate)) || new Date(now).toISOString().slice(0, 10) !== sourceDate.slice(0, 10);
}
export function nextUtcReset(now: number) {
  const date = new Date(now); return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1);
}
export function filterShop(entries: ShopEntry[], filters: ShopFilters) {
  const query = filters.query.trim().toLowerCase();
  const result = entries.filter(entry => (!query || [entry.name, entry.section, ...entry.items.map(item => `${item.name} ${item.artist ?? ''}`)].join(' ').toLowerCase().includes(query)) && (!filters.section || entry.section === filters.section) && (!filters.type || (filters.type === 'Bundle' ? entry.isBundle : entry.types.includes(filters.type))) && (!filters.rarity || entry.rarities.includes(filters.rarity)) && (!filters.budget || entry.finalPrice <= Number(filters.budget)) && (!filters.discounted || entry.regularPrice > entry.finalPrice));
  return result.sort((a, b) => filters.sort === 'price-asc' ? a.finalPrice - b.finalPrice || a.name.localeCompare(b.name) : filters.sort === 'price-desc' ? b.finalPrice - a.finalPrice || a.name.localeCompare(b.name) : filters.sort === 'name' ? a.name.localeCompare(b.name) : b.sectionRank - a.sectionRank || a.sectionIndex - b.sectionIndex || a.name.localeCompare(b.name));
}
export function offerTiming(entry: ShopEntry, now: number | null) {
  if (!entry.outDate) return 'No removal time supplied';
  if (now === null) return `Listed until ${formatShopTime(entry.outDate)}`;
  if (entry.inDate && Date.parse(entry.inDate) > now) return `Listed from ${formatShopTime(entry.inDate)}`;
  const remaining = Date.parse(entry.outDate) - now;
  if (remaining <= 0) return 'Listed removal time has passed';
  const minutes = Math.ceil(remaining / 60000);
  const days = Math.floor(minutes / 1440); const hours = Math.floor(minutes % 1440 / 60);
  return days > 0 ? `${days}d ${hours}h until listed removal` : `${hours}h ${minutes % 60}m until listed removal`;
}

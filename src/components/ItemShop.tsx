'use client';

import { useEffect, useMemo, useState } from 'react';
import { emptyShopFilters, filterShop, formatShopDate, formatShopTime, nextUtcReset, offerTiming, snapshotIsStale, type ShopEntry, type ShopFilters, type ShopSnapshot } from '@/lib/shop';

function OfferCard({ entry, now, eager }: { entry: ShopEntry; now: number | null; eager: boolean }) {
  const discounted = entry.regularPrice > entry.finalPrice;
  return <article className="shop-card" id={`offer-${entry.id}`}>
    <div className="shop-card-image">
      {entry.image ? <img src={entry.image} alt={entry.name} width={400} height={400} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement?.setAttribute('data-image-error', 'true'); }} /> : null}
      <span className={`shop-image-fallback ${entry.image ? 'has-source' : ''}`}>Image unavailable<br /><small>{entry.name}</small></span>
      {discounted && <span className="shop-discount">−{(entry.regularPrice - entry.finalPrice).toLocaleString('en-US')} V-Bucks</span>}
    </div>
    <div className="shop-card-copy">
      <p className="shop-card-kind">{entry.isBundle ? 'Multi-item offer' : entry.types.join(' / ') || 'Offer'}</p>
      <h3>{entry.name}</h3>
      <p className="shop-rarity">{entry.rarities.join(' / ') || 'Rarity not supplied'}</p>
      <p className="shop-price"><strong>{entry.finalPrice.toLocaleString('en-US')}</strong> <span>V-Bucks</span>{discounted && <del aria-label={`Regular price ${entry.regularPrice} V-Bucks`}>{entry.regularPrice.toLocaleString('en-US')}</del>}</p>
      <p className="shop-timing">{offerTiming(entry, now)}</p>
      {entry.outDate && <p className="shop-exact-date"><time dateTime={entry.outDate}>{formatShopTime(entry.outDate)}</time></p>}
      {entry.items.length > 1 ? <details className="shop-contents"><summary>{entry.items.length} listed contents</summary><ul>{entry.items.map((item, index) => <li key={`${item.name}-${index}`}>{item.name}{item.artist ? ` — ${item.artist}` : ''}<small>{item.type}</small></li>)}</ul></details> : entry.items[0]?.artist ? <p className="shop-artist">{entry.items[0].artist}</p> : null}
    </div>
  </article>;
}

export default function ItemShop({ snapshot }: { snapshot: ShopSnapshot }) {
  const [filters, setFilters] = useState<ShopFilters>(emptyShopFilters);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const timer = window.setInterval(() => setNow(Date.now()), 60000); return () => window.clearInterval(timer); }, []);
  const filtered = useMemo(() => filterShop(snapshot.entries, filters), [snapshot.entries, filters]);
  const sections = [...new Set(snapshot.entries.map(entry => entry.section))].sort();
  const types = [...new Set(snapshot.entries.flatMap(entry => [...entry.types, ...(entry.isBundle ? ['Bundle'] : [])]))].sort();
  const rarities = [...new Set(snapshot.entries.flatMap(entry => entry.rarities))].sort();
  const grouped = filters.sort === 'section' ? [...new Set(filtered.map(entry => entry.section))].map(section => ({ section, entries: filtered.filter(entry => entry.section === section) })) : [{ section: 'Matching offers', entries: filtered }];
  const stale = now !== null && snapshotIsStale(snapshot.sourceDate, now);
  const countdown = now === null ? null : Math.ceil((nextUtcReset(now) - now) / 60000);
  function update<K extends keyof ShopFilters>(key: K, value: ShopFilters[K]) { setFilters(current => ({ ...current, [key]: value })); }
  return <section className="shop-browser" aria-labelledby="shop-browser-title">
    <div className={`shop-freshness ${stale ? 'is-stale' : ''}`} role="status">
      <div><strong>{stale ? 'Snapshot needs a refresh' : 'Dated shop snapshot'}</strong><span>{stale ? `The available data is from ${formatShopDate(snapshot.sourceDate)}. Offers may have changed. Check the official shop before purchasing.` : `Source shop date: ${formatShopDate(snapshot.sourceDate)} (UTC). This page is a saved snapshot, not a live account connection.`}</span></div>
      <div className="shop-clock"><small>Next 00:00 UTC</small><strong>{countdown === null ? 'Daily reset' : `${Math.floor(countdown / 60)}h ${countdown % 60}m`}</strong><span>Items can have their own removal times</span></div>
    </div>
    <h2 id="shop-browser-title">Find your next locker addition.</h2>
    <p className="shop-intro">Search names or artists, set a V-Bucks budget, or narrow the list by section and type. Prices describe each complete offer.</p>
    <div className="shop-filters">
      <div className="shop-search"><label htmlFor="shop-search">Search items or artists</label><input id="shop-search" type="search" value={filters.query} placeholder="Try Harley Quinn or Billie Eilish" onChange={event => update('query', event.target.value)} /></div>
      <div><label htmlFor="shop-section">Shop section</label><select id="shop-section" value={filters.section} onChange={event => update('section', event.target.value)}><option value="">All sections</option>{sections.map(section => <option key={section}>{section}</option>)}</select></div>
      <div><label htmlFor="shop-type">Item type</label><select id="shop-type" value={filters.type} onChange={event => update('type', event.target.value)}><option value="">All types</option>{types.map(type => <option key={type}>{type}</option>)}</select></div>
      <div><label htmlFor="shop-rarity">API rarity / series</label><select id="shop-rarity" value={filters.rarity} onChange={event => update('rarity', event.target.value)}><option value="">All labels</option>{rarities.map(rarity => <option key={rarity}>{rarity}</option>)}</select></div>
      <div><label htmlFor="shop-budget">Maximum V-Bucks</label><select id="shop-budget" value={filters.budget} onChange={event => update('budget', event.target.value)}><option value="">Any price</option>{[500, 800, 1000, 1500, 2000, 3000].map(price => <option key={price} value={price}>{price.toLocaleString('en-US')} or less</option>)}</select></div>
      <div><label htmlFor="shop-sort">Sort by</label><select id="shop-sort" value={filters.sort} onChange={event => update('sort', event.target.value)}><option value="section">Shop section</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A to Z</option></select></div>
      <label className="shop-check"><input type="checkbox" checked={filters.discounted} onChange={event => update('discounted', event.target.checked)} />Discounted offers only</label>
      <button className="button button-secondary shop-reset" type="button" onClick={() => setFilters(emptyShopFilters)}>Reset filters</button>
    </div>
    <div className="shop-result-line"><p aria-live="polite" aria-atomic="true"><strong>{filtered.length}</strong> of {snapshot.entries.length} offers</p><a href="https://www.fortnite.com/item-shop">Check the official shop ↗</a></div>
    <noscript><p className="callout">All saved offers are shown below. Enable JavaScript to filter the list and show countdowns.</p></noscript>
    {filtered.length === 0 ? <div className="shop-empty"><h3>No offers match these filters.</h3><p>Try a broader name, increase your budget, or reset the filters.</p><button className="button button-primary" type="button" onClick={() => setFilters(emptyShopFilters)}>Show all offers</button></div> : grouped.map((group, groupIndex) => <section className="shop-section" key={group.section} aria-labelledby={`shop-group-${groupIndex}`}>
      <div className="shop-section-heading"><h3 id={`shop-group-${groupIndex}`}>{group.section}</h3><span>{group.entries.length} offers</span></div>
      <div className="shop-grid">{group.entries.map((entry, index) => <OfferCard key={entry.id} entry={entry} now={now} eager={groupIndex === 0 && index < 4} />)}</div>
    </section>)}
    <p className="source-note shop-end-note">Rarity and series labels are supplied by the API. They are not a price forecast or a recommendation to buy. Bundle ownership, platform and region can affect what your account displays.</p>
  </section>;
}

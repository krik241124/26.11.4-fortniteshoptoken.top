/* Public Fortnite-API snapshot. Run with Node 20+; no API key is required. */
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const ENDPOINT = 'https://fortnite-api.com/v2/shop?language=en';
const TARGET = path.resolve(__dirname, '../src/data/item-shop.json');
const families = { brItems: 'Cosmetic', tracks: 'Jam Track', cars: 'Vehicle', instruments: 'Instrument', legoKits: 'LEGO Kit', beans: 'Bean', legoItems: 'LEGO Item' };
const text = value => typeof value === 'string' ? value.trim() : '';
function imageUrl(value) {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === 'https:' && (url.hostname === 'fortnite-api.com' || url.hostname.endsWith('.fortnite-api.com')) ? url.href : null; } catch { return null; }
}
function iso(value) { return typeof value === 'string' && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null; }
function normalizeShop(payload, fetchedAt = new Date().toISOString()) {
  if (payload.status !== 200 || !payload.data || !Array.isArray(payload.data.entries)) throw new Error('Unexpected shop API response. Keeping the existing snapshot.');
  const data = payload.data;
  const sourceDate = iso(data.date);
  if (!sourceDate || !iso(fetchedAt) || Date.parse(sourceDate) > Date.parse(fetchedAt) + 5 * 60 * 1000) throw new Error('Missing or future shop timestamp.');
  if (data.entries.length < 1 || data.entries.length > 5000) throw new Error('Empty or unexpectedly large shop response.');
  const seen = new Set();
  const entries = data.entries.map((entry, index) => {
    if (!text(entry.offerId) || seen.has(entry.offerId)) throw new Error('Missing or duplicate offer identifier.');
    seen.add(entry.offerId);
    const unknownArrays = Object.entries(entry).filter(([key, value]) => Array.isArray(value) && !Object.hasOwn(families, key));
    if (unknownArrays.length) throw new Error(`Unrecognized offer array: ${unknownArrays.map(([key]) => key).join(', ')}. Update the normalizer before publishing.`);
    for (const key of ['finalPrice', 'regularPrice']) if (!Number.isSafeInteger(entry[key]) || entry[key] < 0 || entry[key] > 1000000) throw new Error(`Invalid ${key}.`);
    const items = Object.entries(families).flatMap(([family, fallback]) => (Array.isArray(entry[family]) ? entry[family] : []).map(item => {
      const name = text(item.name) || text(item.title);
      if (!name) throw new Error(`Unnamed ${family} item.`);
      return { name, type: family === 'tracks' ? 'Jam Track' : text(item.type?.displayValue) || fallback, rarity: text(item.rarity?.displayValue) || 'Not specified', image: imageUrl(item.images?.icon) || imageUrl(item.images?.large) || imageUrl(item.albumArt) || imageUrl(item.images?.smallIcon), artist: text(item.artist) || null };
    }));
    if (!items.length && !text(entry.bundle?.name)) throw new Error('Unrecognized offer family; update the normalizer before publishing.');
    const name = text(entry.bundle?.name) || (items.length > 1 ? `${items[0].name} + ${items.length - 1} included item${items.length === 2 ? '' : 's'}` : items[0].name);
    const image = imageUrl(entry.bundle?.image) || (items.length === 1 ? items[0].image : null) || (entry.newDisplayAsset?.renderImages || []).map(item => imageUrl(item.image)).find(Boolean) || items.find(item => item.image)?.image || null;
    const inDate = iso(entry.inDate); const outDate = iso(entry.outDate);
    if (inDate && outDate && Date.parse(inDate) >= Date.parse(outDate)) throw new Error('Invalid offer availability interval.');
    return { id: createHash('sha256').update(entry.offerId).digest('hex').slice(0, 20), name, section: text(entry.layout?.name) || (items[0]?.type === 'Jam Track' ? 'Jam Tracks' : 'Other offers'), sectionRank: Number.isFinite(entry.layout?.rank) ? entry.layout.rank : -1, sectionIndex: Number.isFinite(entry.layout?.index) ? entry.layout.index : index, finalPrice: entry.finalPrice, regularPrice: entry.regularPrice, inDate, outDate, image, isBundle: Boolean(entry.bundle) || items.length > 1, types: [...new Set(items.map(item => item.type))], rarities: [...new Set(items.map(item => item.rarity))], items: items.map(({ image: _image, ...item }) => item) };
  });
  return { version: 1, source: ENDPOINT, sourceDate, fetchedAt: iso(fetchedAt), sourceHash: text(data.hash) || null, entries };
}
async function fetchSnapshot() {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(ENDPOINT, { signal: AbortSignal.timeout(25000), headers: { Accept: 'application/json', 'User-Agent': 'ShopTokenGuide/1.0 (+https://fortniteshoptoken.top/about/)' } });
      if (!response.ok) throw new Error(`Shop endpoint returned HTTP ${response.status}.`);
      if (Number(response.headers.get('content-length')) > 20 * 1024 * 1024) throw new Error('Shop response exceeds the 20 MB safety limit.');
      const body = await response.text();
      if (Buffer.byteLength(body) > 20 * 1024 * 1024) throw new Error('Shop response exceeds the 20 MB safety limit.');
      return normalizeShop(JSON.parse(body));
    } catch (error) { lastError = error; if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 1500 * (attempt + 1))); }
  }
  throw lastError;
}
async function main() {
  const next = await fetchSnapshot();
  const previous = fs.existsSync(TARGET) ? JSON.parse(fs.readFileSync(TARGET, 'utf8').replace(/^\uFEFF/, '')) : null;
  if (!shouldReplaceSnapshot(previous, next)) { console.log('Shop data unchanged; no timestamp-only commit.'); return; }
  fs.mkdirSync(path.dirname(TARGET), { recursive: true });
  const temp = `${TARGET}.${process.pid}.tmp`;
  try { fs.writeFileSync(temp, JSON.stringify(next, null, 2) + '\n'); fs.renameSync(temp, TARGET); }
  finally { if (fs.existsSync(temp)) fs.unlinkSync(temp); }
  console.log(`Saved ${next.entries.length} offers for ${next.sourceDate}; fetched ${next.fetchedAt}.`);
}
function shouldReplaceSnapshot(previous, next) {
  if (previous && Date.parse(next.sourceDate) < Date.parse(previous.sourceDate)) throw new Error('API returned an older shop snapshot; refusing to replace the current data.');
  return !previous || previous.sourceDate !== next.sourceDate || JSON.stringify(previous.entries) !== JSON.stringify(next.entries);
}
module.exports = { normalizeShop, imageUrl, shouldReplaceSnapshot };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });

import type { Metadata } from 'next';

export const siteUrl = 'https://fortniteshoptoken.top';
export const reviewedOn = '2026-11-04';
export const sources = {
  epic: 'https://www.fortnite.com/news/fortnite-treasure-hunters-the-greatest-adventure-of-all-time?lang=en-US',
  gamesradar: 'https://www.gamesradar.com/games/fortnite/fortnite-pirate-shop-token/',
  forbes: 'https://www.forbes.com/sites/paultassi/2026/11/02/the-best-spot-to-farm-fortnites-pirate-shop-token/',
  vice: 'https://www.vice.com/en/article/fortnite-pirate-shop-token-chances-drop-rate/',
  esports: 'https://esports.gg/guides/fortnite/fortnite-pirate-shop/',
  beebom: 'https://static.beebom.com/wp-content/uploads/2026/11/fn-activate-pirate-shop.jpg?w=1024',
};

export const guides = [
  { href: '/how-to-get-pirate-shop-token/', title: 'How to get the token', description: 'Chest drops, squad sharing, and what happens when you find one.', label: '01 / ACQUISITION' },
  { href: '/pirate-shop-token-drop-rate/', title: 'Drop rates & odds', description: 'Compare the claims. Calculate what each assumption really means.', label: '02 / PROBABILITY' },
  { href: '/best-farming-spots/', title: 'Where to look', description: 'Reported locations and a practical way to plan a chest route.', label: '03 / FIELD NOTES' },
  { href: '/what-is-pirate-shop-token/', title: 'What the token unlocks', description: 'The 2026 and 2027 activations, eligible items, and limitations.', label: '04 / THE REWARD' },
  { href: '/how-to-activate-pirate-shop-access/', title: 'Activate your access', description: 'Find the shop banner and choose when to start your 14 days.', label: '05 / ACTIVATION' },
];

export function metadataFor(title: string, description: string, path: string): Metadata {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/$/, '') + '/';
  return {
    title: { absolute: title }, description,
    alternates: { canonical: canonicalPath },
    openGraph: { title, description, url: canonicalPath, type: 'website', siteName: 'Shop Token — Fortnite Field Guide', images: [{ url: '/social-card.png', width: 1200, height: 630, alt: 'Fortnite Shop Token field guide' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/social-card.png'] },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

import type { Metadata } from 'next';

export const siteUrl = 'https://fortniteshoptoken.top';
export const reviewedOn = '2026-11-04';
export const contentUpdatedOn = '2026-11-06';

type Illustration = { src: string; alt: string; caption: string; width: 1200; height: 675 };
export const illustrations: Record<string, Illustration> = {
  '/': {
    src: '/images/pirate-shop-token-overview.webp', width: 1200, height: 675,
    alt: 'Original diagram connecting a random chest reward, activation, and a 14-day eligible-item claim window.',
    caption: 'The three separate stages: finding access, choosing when to activate, and using the 14-day window. Original explanatory artwork; confirm eligibility in Fortnite.',
  },
  '/how-to-get-pirate-shop-token/': {
    src: '/images/pirate-shop-token-steps.webp', width: 1200, height: 675,
    alt: 'Four-step guide to checking the event, following a chest route, looking for the reward notification, and reviewing access before activation.',
    caption: 'A visual checklist for the reported acquisition flow. Opening chests creates opportunities; no route guarantees a token. Illustration based on the reporting cited below.',
  },
  '/pirate-shop-token-drop-rate/': {
    src: '/images/pirate-shop-token-odds.webp', width: 1200, height: 675,
    alt: 'Probability comparison showing how cumulative chances differ under the unconfirmed 1-in-700,000 and 1-in-2,000 assumptions.',
    caption: 'Calculated probabilities under two unconfirmed assumptions. The chart explains the model, not a measured Fortnite drop rate. See the interactive chart and HTML table for the underlying values.',
  },
  '/best-farming-spots/': {
    src: '/images/pirate-shop-token-route-checklist.webp', width: 1200, height: 675,
    alt: 'Route-planning checklist comparing completed chest openings, travel time, and survival rather than unverified map markers.',
    caption: 'Compare the chests you actually reach, time spent moving, and whether you survive the route. This is a planning diagram, not a map or a verified chest-spawn guide.',
  },
  '/what-is-pirate-shop-token/': {
    src: '/images/pirate-shop-token-access.webp', width: 1200, height: 675,
    alt: 'Pirate Shop Access diagram showing separate 14-day activations in 2026 and 2027 and excluding cash purchases and gifts.',
    caption: 'Access applies to eligible items under the terms shown on your account. The illustration summarizes the reported exclusions; it does not make every Item Shop entry eligible.',
  },
  '/how-to-activate-pirate-shop-access/': {
    src: '/images/pirate-shop-token-timeline.webp', width: 1200, height: 675,
    alt: 'Timeline separating the reported 2026 activation deadline from the 336-hour access window that starts when access is activated.',
    caption: 'The activation deadline controls when you can begin. The 14-day window is measured from your activation time. Reported 2026 cutoff: December 16 at 00:00 UTC; your in-game terms take priority.',
  },
};

export function isGuidePath(path: string) {
  return path !== '/' && Object.prototype.hasOwnProperty.call(illustrations, path);
}

export function pageUpdatedOn(path: string) {
  return illustrations[path] || ['/about/', '/editorial-policy/', '/privacy/'].includes(path) ? contentUpdatedOn : reviewedOn;
}
export const sources = {
  epic: 'https://www.fortnite.com/news/fortnite-treasure-hunters-the-greatest-adventure-of-all-time?lang=en-US',
  gamesradar: 'https://www.gamesradar.com/games/fortnite/fortnite-pirate-shop-token/',
  forbes: 'https://www.forbes.com/sites/paultassi/2026/11/02/the-best-spot-to-farm-fortnites-pirate-shop-token/',
  vice: 'https://www.vice.com/en/article/fortnite-pirate-shop-token-chances-drop-rate/',
  esports: 'https://esports.gg/guides/fortnite/fortnite-pirate-shop/',
  beebom: 'https://beebom.com/fortnite-pirate-shop-guide/',
};

export const guides = [
  { href: '/how-to-get-pirate-shop-token/', title: 'How to get the token', description: 'Chest drops, squad sharing, and what happens when you find one.', label: '01 / ACQUISITION' },
  { href: '/pirate-shop-token-drop-rate/', title: 'Odds calculator & curves', description: 'Use your own chest count, compare assumptions, and plan future sessions.', label: '02 / PROBABILITY' },
  { href: '/best-farming-spots/', title: 'Where to look', description: 'Reported locations and a practical way to plan a chest route.', label: '03 / FIELD NOTES' },
  { href: '/what-is-pirate-shop-token/', title: 'What the token unlocks', description: 'The 2026 and 2027 activations, eligible items, and limitations.', label: '04 / THE REWARD' },
  { href: '/how-to-activate-pirate-shop-access/', title: 'Activation date planner', description: 'Calculate your 14-day window and check the reported deadline.', label: '05 / ACTIVATION' },
];

export function metadataFor(title: string, description: string, path: string): Metadata {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/$/, '') + '/';
  const illustration = illustrations[canonicalPath];
  const image = illustration
    ? { url: illustration.src, width: illustration.width, height: illustration.height, alt: illustration.alt }
    : { url: '/social-card.png', width: 1200, height: 630, alt: 'Fortnite Shop Token field guide' };
  const article = isGuidePath(canonicalPath);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title, description, url: canonicalPath, siteName: 'Shop Token — Fortnite Field Guide', images: [image],
      ...(article
        ? { type: 'article' as const, publishedTime: reviewedOn, modifiedTime: pageUpdatedOn(canonicalPath), authors: [siteUrl + '/about/'] }
        : { type: 'website' as const }),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

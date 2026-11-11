import ItemShop from '@/components/ItemShop';
import snapshot from '@/data/item-shop.json';
import { formatShopDate, formatShopTime, shopPublishedAt, shopModifiedAt } from '@/lib/shop';
import { jsonLd, metadataFor, siteUrl } from '@/lib/site';
import './shop.css';

const pagePath = '/fortnite-item-shop-today/';
const title = 'Fortnite Item Shop Today: Items, V-Bucks Prices & Reset';
const description = 'Browse the latest saved Fortnite Item Shop snapshot. Search outfits, bundles and Jam Tracks; filter by price, type and section, and check listed removal times.';
const baseMetadata = metadataFor(title, description, pagePath);
export const metadata = { ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, images: [{ url: '/images/item-shop-reading-guide.webp', width: 1200, height: 675, alt: 'How to read a Fortnite Item Shop offer' }] },
  twitter: { ...baseMetadata.twitter, images: ['/images/item-shop-reading-guide.webp'] },
};
const questions = [
  { question: 'What is in the Fortnite Item Shop today?', answer: `This page shows ${snapshot.entries.length} offers in the Fortnite-API snapshot dated ${formatShopDate(snapshot.sourceDate)} UTC. Use the filters to browse the supplied outfits, multi-item offers, music and other cosmetics. Confirm availability in Epic’s official shop or in your game before buying.` },
  { question: 'When does the Fortnite Item Shop reset?', answer: 'The daily shop boundary used here is 00:00 UTC. The countdown targets the next UTC midnight; it does not mean every item leaves then. Each card shows its own removal time when the data source provides one.' },
  { question: 'Are these prices in dollars or V-Bucks?', answer: 'All prices on the cards are in V-Bucks. We do not convert them into a cash price because V-Bucks pack prices, location and your existing balance can change the comparison. Real-money packs are outside this snapshot’s scope.' },
  { question: 'Why can an offer price differ from my account?', answer: 'This is an independent snapshot of the API’s listed prices. Owned bundle items, regional availability and later shop changes may affect your account. The price and terms displayed by Epic at checkout take priority.' },
  { question: 'Does an item here qualify for Pirate Shop Access?', answer: 'Appearing in this list does not establish Pirate Shop eligibility. Check the activation terms and the item in your own account; exclusions apply. Our activation guide explains the reported access window, but this tool cannot check your entitlement.' },
];

export default function ItemShopPage() {
  const discounts = snapshot.entries.filter(entry => entry.finalPrice < entry.regularPrice).length;
  const sections = new Set(snapshot.entries.map(entry => entry.section)).size;
  const listedToday = snapshot.entries.filter(entry => entry.inDate?.slice(0, 10) === snapshot.sourceDate.slice(0, 10)).length;
  const previews = snapshot.entries.filter(entry => entry.image && !entry.isBundle && entry.types.includes('Outfit')).slice(0, 3);
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': siteUrl + pagePath + '#webpage', url: siteUrl + pagePath, name: title, description, inLanguage: 'en', isPartOf: { '@id': siteUrl + '/#website' }, publisher: { '@id': siteUrl + '/#organization' }, datePublished: shopPublishedAt, dateModified: shopModifiedAt(snapshot.fetchedAt), image: siteUrl + '/images/item-shop-reading-guide.webp', mainEntity: { '@id': siteUrl + pagePath + '#offers' }, citation: ['https://www.fortnite.com/item-shop', 'https://fortnite-api.com/'] },
    { '@type': 'ItemList', '@id': siteUrl + pagePath + '#offers', name: `Shop offers in the ${formatShopDate(snapshot.sourceDate)} UTC snapshot`, numberOfItems: snapshot.entries.length, itemListElement: snapshot.entries.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, name: entry.name, url: siteUrl + pagePath + '#offer-' + entry.id })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' }, { '@type': 'ListItem', position: 2, name: 'Item Shop Today', item: siteUrl + pagePath }] },
    { '@type': 'FAQPage', mainEntity: questions.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ] };
  return <main id="main-content" className="container shop-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Field guide</a><span aria-hidden="true">/</span><span>Item Shop Today</span></nav>
    <header className="shop-hero">
      <div><p className="eyebrow">THE DAILY SHOP / INDEPENDENT BROWSER</p><h1>Fortnite Item Shop Today<span>Find it. Compare it. Check the clock.</span></h1><p className="shop-lead">Browse item artwork, V-Bucks prices and listed removal times. Search for a favorite or see what fits your budget.</p><a className="button button-primary" href="#shop-browser-title">Browse {snapshot.entries.length} offers ↓</a><p className="meta-line">Shop date: <time dateTime={snapshot.sourceDate}>{formatShopDate(snapshot.sourceDate)} UTC</time><br />Data fetched: <time dateTime={snapshot.fetchedAt}>{formatShopTime(snapshot.fetchedAt)}</time></p></div>
      <div className="shop-hero-board"><div className="shop-preview-strip">{previews.map((entry, index) => <figure key={entry.id}><a href={`#offer-${entry.id}`}><img src={entry.image!} alt={entry.name} width={180} height={180} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" /><figcaption>{entry.name}<span>{entry.finalPrice.toLocaleString('en-US')} V-Bucks</span></figcaption></a></figure>)}</div><p className="shop-preview-label">OUTFITS IN THIS SNAPSHOT</p><dl className="shop-stats"><div><dt>Offers</dt><dd>{snapshot.entries.length}</dd></div><div><dt>Sections</dt><dd>{sections}</dd></div><div><dt>Discounted</dt><dd>{discounts}</dd></div></dl></div>
    </header>
    <div className="shop-snapshot-note"><span className="tag">Third-party data</span><p>In this snapshot, <strong>{listedToday} offers</strong> have a listed start date of {formatShopDate(snapshot.sourceDate)}, and <strong>{discounts} offers</strong> are below the API’s regular price. A start date is not proof of a cosmetic’s first-ever release. <a href="#shop-method">How this page is updated</a></p></div>
    <ItemShop snapshot={snapshot} />
    <section className="shop-explainer" id="shop-method">
      <div><p className="section-kicker">READ THE SHOP</p><h2>A useful price needs context.</h2><p>A card represents an offer, which may include several items. Compare the total V-Bucks price, expand its contents, then check the listed removal time. Your in-game purchase screen is the final check.</p><p>Our scheduled refresh requests a new snapshot daily after 00:00 UTC. An API or deployment failure leaves the previous snapshot visible with its original date; the browser flags an older UTC shop date. A saved snapshot can also miss changes later in the day.</p><p className="source-note"><span className="tag">Official</span> <a href="https://www.fortnite.com/item-shop">Epic’s Fortnite Item Shop</a> is the authority for purchases. <span className="tag">Data provider</span> Inventory and artwork come from <a href="https://fortnite-api.com/">Fortnite-API</a> via its <a href="https://fortnite-api.com/v2/shop?language=en">public shop endpoint</a>. Fortnite-API and this site are independent of Epic Games.</p></div>
      <figure><a href="/images/item-shop-reading-guide.webp" aria-label="Open the shop offer checklist at full size"><img src="/images/item-shop-reading-guide.webp" width={1200} height={675} loading="lazy" decoding="async" alt="Shop offer checklist: check the snapshot date, compare the V-Bucks price and confirm the offer in your game." /></a><figcaption>An offer checklist. Illustration by Shop Token; it is not an in-game shop screenshot. Select the image to view it at full size.</figcaption></figure>
    </section>
    <section className="shop-faq"><p className="section-kicker">BEFORE YOU BUY</p><h2>Item Shop questions</h2><div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div><p className="source-note">For access rules, read <a href="/how-to-activate-pirate-shop-access/">how to activate Pirate Shop Access</a> and <a href="/what-is-pirate-shop-token/">what the token includes</a>. To report an incorrect listing, <a href="/contact/">contact the editorial team</a>.</p></section>
    <section className="related-guides article" aria-labelledby="shop-related-heading">
      <p className="section-kicker">KEEP EXPLORING</p><h2 id="shop-related-heading">Your next field note</h2>
      <div className="guide-list">
        <a className="guide-link" href="/"><span>Return to the Pirate Shop Token guide</span><span aria-hidden="true">↗</span></a>
        <a className="guide-link" href="/pirate-shop-token-drop-rate/"><span>Explore token probabilities with the odds calculator</span><span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </main>;
}

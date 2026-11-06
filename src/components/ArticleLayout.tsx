import type { ReactNode } from 'react';
import { guides, illustrations, isGuidePath, jsonLd, pageUpdatedOn, reviewedOn, siteUrl } from '@/lib/site';

type Props = {
  title: string; intro: string; path: string; category: string;
  sections: { id: string; label: string }[];
  related?: { href: string; title: string }[];
  children: ReactNode;
};

export default function ArticleLayout({ title, intro, path, category, sections, related, children }: Props) {
  const links = related ?? guides.filter(guide => guide.href !== path).slice(0, 3);
  const illustration = illustrations[path];
  const isGuide = isGuidePath(path);
  const modified = pageUpdatedOn(path);
  const published = path === '/editorial-policy/' ? modified : reviewedOn;
  const pageId = siteUrl + path + '#webpage';
  const figureAfterContent = ['/pirate-shop-token-drop-rate/', '/how-to-activate-pirate-shop-access/'].includes(path);
  const figure = illustration && <figure className="editorial-figure">
    <a href={illustration.src} aria-label="Open the full-size explanatory diagram"><img src={illustration.src} alt={illustration.alt} width={illustration.width} height={illustration.height} loading="lazy" decoding="async" /></a>
    <figcaption>{illustration.caption} <a href={illustration.src}>View full-size diagram</a>.</figcaption>
  </figure>;
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'BreadcrumbList', '@id': siteUrl + path + '#breadcrumbs', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
        { '@type': 'ListItem', position: 2, name: title, item: siteUrl + path },
      ] },
      { '@type': path === '/about/' ? 'AboutPage' : path === '/contact/' ? 'ContactPage' : 'WebPage',
        '@id': pageId, url: siteUrl + path, name: title, description: intro, inLanguage: 'en',
        isPartOf: { '@id': siteUrl + '/#website' }, breadcrumb: { '@id': siteUrl + path + '#breadcrumbs' },
        datePublished: published, dateModified: modified,
        ...(isGuide ? { mainEntity: { '@id': siteUrl + path + '#article' } } : {}),
        ...(illustration ? { primaryImageOfPage: { '@type': 'ImageObject', url: siteUrl + illustration.src, width: illustration.width, height: illustration.height } } : {}),
      },
      ...(isGuide && illustration ? [{ '@type': 'Article', '@id': siteUrl + path + '#article', headline: title, description: intro,
        mainEntityOfPage: { '@id': pageId }, inLanguage: 'en', image: [siteUrl + illustration.src],
        datePublished: published, dateModified: modified,
        author: { '@id': siteUrl + '/#editorial' }, publisher: { '@id': siteUrl + '/#organization' },
      }] : []),
    ],
  };
  return <main id="main-content" className="container">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Field guide</a><span aria-hidden="true">/</span><span>{category}</span></nav>
    <header className="article-header">
      <p className="eyebrow">FORTNITE FIELD GUIDE <span aria-hidden="true">/</span> {category}</p>
      <h1>{title}</h1><p className="article-lead">{intro}</p>
      <p className="meta-line">By <a href="/about/">Shop Token editorial</a><span aria-hidden="true">·</span>Updated <time dateTime={modified}>{modified === '2026-11-06' ? 'November 6, 2026' : 'November 4, 2026'}</time><span aria-hidden="true">·</span><a href="/editorial-policy/">Editorial policy</a></p>
      {isGuide && <p className="source-note">Diagrams and presentation updated November 6. Game-mechanics sources last reviewed <time dateTime={reviewedOn}>November 4, 2026</time>; check your in-game terms for changes.</p>}
    </header>
    <div className="guide-layout">
      <aside className="toc" aria-label="On this page"><details open><summary>ON THIS PAGE</summary><nav>{sections.map(section => <a key={section.id} href={'#' + section.id}>{section.label}</a>)}</nav></details></aside>
      <article className="article">{!figureAfterContent && figure}{children}{figureAfterContent && figure}
        <section className="related-guides" aria-labelledby="related-heading"><p className="section-kicker">KEEP EXPLORING</p><h2 id="related-heading">Your next field note</h2><div className="guide-list">{links.map(link => <a className="guide-link" key={link.href} href={link.href}><span>{link.title}</span><span aria-hidden="true">↗</span></a>)}</div></section>
      </article>
    </div>
  </main>;
}

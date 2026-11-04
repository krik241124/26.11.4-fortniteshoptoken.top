import type { ReactNode } from 'react';
import { guides, jsonLd, reviewedOn, siteUrl } from '@/lib/site';

type Props = {
  title: string; intro: string; path: string; category: string;
  sections: { id: string; label: string }[];
  related?: { href: string; title: string }[];
  children: ReactNode;
};

export default function ArticleLayout({ title, intro, path, category, sections, related, children }: Props) {
  const links = related ?? guides.filter(guide => guide.href !== path).slice(0, 3);
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
        { '@type': 'ListItem', position: 2, name: title, item: siteUrl + path },
      ] },
      { '@type': 'Article', headline: title, description: intro, mainEntityOfPage: siteUrl + path,
        datePublished: reviewedOn, dateModified: reviewedOn,
        author: { '@type': 'Organization', name: 'Shop Token editorial', url: siteUrl + '/about/' },
        publisher: { '@type': 'Organization', name: 'Shop Token', url: siteUrl } },
    ],
  };
  return <main id="main-content" className="container">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Field guide</a><span aria-hidden="true">/</span><span>{category}</span></nav>
    <header className="article-header">
      <p className="eyebrow">FORTNITE FIELD GUIDE <span aria-hidden="true">/</span> {category}</p>
      <h1>{title}</h1><p className="article-lead">{intro}</p>
      <p className="meta-line">By <a href="/about/">Shop Token editorial</a><span aria-hidden="true">·</span>Reviewed <time dateTime={reviewedOn}>November 4, 2026</time></p>
    </header>
    <div className="guide-layout">
      <aside className="toc" aria-label="On this page"><details open><summary>ON THIS PAGE</summary><nav>{sections.map(section => <a key={section.id} href={'#' + section.id}>{section.label}</a>)}</nav></details></aside>
      <article className="article">{children}
        <section className="related-guides" aria-labelledby="related-heading"><p className="section-kicker">KEEP EXPLORING</p><h2 id="related-heading">Your next field note</h2><div className="guide-list">{links.map(link => <a className="guide-link" key={link.href} href={link.href}><span>{link.title}</span><span aria-hidden="true">↗</span></a>)}</div></section>
      </article>
    </div>
  </main>;
}

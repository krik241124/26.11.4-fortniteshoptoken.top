import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jsonLd, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Fortnite Pirate Shop Token — Field Guide', template: '%s | Shop Token' },
  description: 'A practical, independent guide to Fortnite Pirate Shop Tokens, reported drop rates, chest routes, and activation.',
  icons: { icon: '/token-mark.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebSite', '@id': siteUrl + '/#website', url: siteUrl + '/', name: 'Shop Token — Fortnite Field Guide',
          description: 'Independent Fortnite guides and tools for Pirate Shop Access, probability, activation timing, and Item Shop listings.',
          inLanguage: 'en', publisher: { '@id': siteUrl + '/#organization' } },
        { '@type': 'Organization', '@id': siteUrl + '/#organization', name: 'Shop Token', url: siteUrl + '/',
          logo: { '@type': 'ImageObject', '@id': siteUrl + '/#logo', url: siteUrl + '/logo-512.png', contentUrl: siteUrl + '/logo-512.png', width: 512, height: 512 },
          publishingPrinciples: siteUrl + '/editorial-policy/' },
        { '@type': 'Organization', '@id': siteUrl + '/#editorial', name: 'Shop Token editorial', url: siteUrl + '/about/',
          parentOrganization: { '@id': siteUrl + '/#organization' } },
      ],
    }) }} />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />{children}<Footer />
    <Script id="microsoft-clarity-bootstrap" strategy="afterInteractive">{`
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "z8aax1xzlf");
    `}</Script>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-N1HG4MNBJ2" strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N1HG4MNBJ2');
    `}</Script>
  </body></html>;
}

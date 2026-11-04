import ArticleLayout from '@/components/ArticleLayout';
import { metadataFor } from '@/lib/site';
export const metadata = metadataFor('Contact Shop Token — Corrections & Questions', 'Send source-backed corrections and editorial questions about the Fortnite Shop Token guide.', '/contact/');
export default function Contact() {
  return <ArticleLayout title="Send a field note." intro="Found an outdated rule or a better source? Help us keep the guide useful." path="/contact/" category="Contact" sections={[{ id: 'contact', label: 'Email the editor' }, { id: 'help', label: 'Game account help' }]}>
    <section id="contact"><h2>Email the editor</h2><p><a className="text-link" href="mailto:support@fortniteshoptoken.top">support@fortniteshoptoken.top</a></p><p>For a correction, include the page URL, the relevant statement, and a link to supporting evidence. If you share an in-game screenshot, remove account identifiers and other private details first.</p><p>This address is for this independent website. We cannot issue tokens, change shop eligibility, or restore game accounts.</p></section>
    <section id="help"><h2>Need help with your Fortnite account?</h2><p>Use the support options available through Fortnite or your Epic Games account. Never send us a password, authentication code, or payment information.</p></section>
  </ArticleLayout>;
}

import ArticleLayout from '@/components/ArticleLayout';
import ContactEmail from '@/components/ContactEmail';
import { metadataFor } from '@/lib/site';

export const metadata = metadataFor('Editorial Policy — Sources, Diagrams & Corrections', 'How Shop Token labels official sources, reporting, estimates and calculated results, dates its updates, and handles corrections.', '/editorial-policy/');

export default function EditorialPolicy() {
  return <ArticleLayout
    title="Know where each claim comes from."
    intro="Our guides separate published evidence, unconfirmed claims, and calculations. The terms inside Fortnite remain the final reference for your account."
    path="/editorial-policy/" category="Editorial policy"
    sections={[{ id: 'labels', label: 'Evidence labels' }, { id: 'tools', label: 'Tools and images' }, { id: 'dates', label: 'Dates and corrections' }, { id: 'independence', label: 'Independence' }]}
    related={[{ href: '/about/', title: 'About the publishing byline' }, { href: '/contact/', title: 'Report a correction' }, { href: '/fortnite-item-shop-today/', title: 'Browse the latest saved shop snapshot' }]}
  >
    <section id="labels"><h2>Read the label with the source.</h2>
      <p>A source is evidence for the specific statement beside it, not a guarantee that everything on that website is correct. When sources disagree, we describe the disagreement.</p>
      <div className="table-scroll" role="region" aria-label="Evidence labels" tabIndex={0}><table><caption>How to interpret evidence on Shop Token</caption><thead><tr><th scope="col">Label</th><th scope="col">What it means</th><th scope="col">What it does not establish</th></tr></thead><tbody>
        <tr><th scope="row">Official</th><td>A directly linked Epic Games statement or official shop page.</td><td>Rules beyond the announcement’s wording or a guarantee that an older statement is still current.</td></tr>
        <tr><th scope="row">Reported</th><td>A named publication describes the mechanic or reproduces an in-game screen.</td><td>Independent verification by this website or official confirmation of every detail.</td></tr>
        <tr><th scope="row">Community estimate / unconfirmed</th><td>A circulated number or theory without verified underlying drop data.</td><td>A measured drop rate, confidence interval, or guaranteed strategy.</td></tr>
        <tr><th scope="row">Calculated</th><td>A mathematical result produced from the assumptions shown with a tool or chart.</td><td>Evidence that the assumed probability matches the game.</td></tr>
        <tr><th scope="row">Third-party data</th><td>A saved Item Shop response from the linked data provider, with its own timestamps.</td><td>Real-time availability, account eligibility, or an offer to buy from this website.</td></tr>
      </tbody></table></div>
      <p>We prefer the <a href="https://www.fortnite.com/news">official Fortnite news site</a> for announcements and the <a href="https://www.fortnite.com/item-shop">official Item Shop</a> for current listings. Secondary reporting is linked where it supplies a detail not established in the official material we reviewed.</p>
    </section>
    <section id="tools"><h2>What our tools and illustrations can tell you</h2>
      <p>The odds tools assume independent attempts with a fixed chance per chest. Past misses do not improve the next attempt or reduce the model’s mean additional wait. The activation planner calculates a 336-hour interval using explicit UTC inputs; it does not activate rewards or create reminders.</p>
      <p>Our WebP diagrams are original explanatory graphics. They summarize the text and calculations on the page and are labelled as diagrams rather than screenshots. We do not invent map coordinates, chest-spawn counts, gameplay tests, or drop-study sample sizes.</p>
      <p>The shop browser uses <a href="https://fortnite-api.com/">Fortnite-API</a>, a third-party provider. Source and fetch timestamps are distinct. A failed refresh must not turn an older snapshot into a claim that the data is current. Images in that feed are game assets credited to their respective owners, separate from our original diagrams.</p>
    </section>
    <section id="dates"><h2>Update dates and corrections</h2>
      <p>We change an editorial update date when the page meaningfully changes, such as adding a diagram, clarifying a calculation, or correcting a statement. A separately displayed source-review date does not advance simply because the page layout changes. We do not refresh dates solely to make older reporting appear newly checked.</p>
      <p>If an error is confirmed, we correct the relevant statement and its source or limitation. To request a correction, send the page URL, the claim, and public supporting evidence to <ContactEmail />. Remove private account information from any screenshot; never send login credentials.</p>
      <p>We do not promise a response time or use unsupported reports as evidence of a new game rule. When information cannot be established, the page should say so.</p>
    </section>
    <section id="independence"><h2>Independent publishing</h2>
      <p>Shop Token is an independent website, not an Epic Games service. <a href="/about/">Shop Token editorial</a> is our organizational byline; it does not imply a named player, journalist, or Epic employee. We do not issue tokens, provide account access, or sell the shop items listed here.</p>
      <p>A link is a citation, not an endorsement or a partnership claim. Structured data describes visible content; it does not add ratings, reviews, videos, or first-hand testing that are absent from the page.</p>
    </section>
  </ArticleLayout>;
}

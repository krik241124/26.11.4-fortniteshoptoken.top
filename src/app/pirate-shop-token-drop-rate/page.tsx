import { metadataFor, sources } from '@/lib/site';
import ArticleLayout from '@/components/ArticleLayout';
import OddsCalculator from '@/components/OddsCalculator';

const path = '/pirate-shop-token-drop-rate/';
export const metadata = metadataFor(
  'Pirate Shop Token Drop Rate: Reported Odds Compared',
  'Compare the unconfirmed 1 in 700,000 and 1 in 2,000 Pirate Shop Token estimates. Explore hypothetical chest odds and understand what remains unknown.',
  path,
);

export default function DropRatePage() {
  return (
    <ArticleLayout
      title="Pirate Shop Token drop rate & odds"
      intro="There is no official drop rate in the sources reviewed. The two widely repeated numbers are unconfirmed estimates, not a measured range of your real chances."
      path={path}
      category="Odds explained"
      sections={[
        { id: 'reported-odds', label: 'Compare the claims' },
        { id: 'why-different', label: 'Why the numbers differ' },
        { id: 'calculator', label: 'Explore hypothetical odds' },
        { id: 'read-results', label: 'Read the results correctly' },
        { id: 'evidence', label: 'What better evidence needs' },
      ]}
      related={[
        { href: '/how-to-get-pirate-shop-token/', title: 'How to get the token' },
        { href: '/best-farming-spots/', title: 'Choose a practical chest route' },
        { href: '/what-is-pirate-shop-token/', title: 'What Pirate Shop Access includes' },
      ]}
    >
      <section id="reported-odds">
        <h2>Compare the reported odds</h2>
        <div className="callout"><strong>Official drop rate: unknown.</strong> Neither number below is a guarantee, an Epic announcement or a measurement made by this site.</div>
        <div className="table-scroll">
          <table className="odds-table">
            <caption>Reported estimates, checked November 4, 2026</caption>
            <thead><tr><th scope="col">Claim</th><th scope="col">Equivalent</th><th scope="col">Evidence status</th></tr></thead>
            <tbody>
              <tr><th scope="row">1 in 700,000</th><td>About 0.000143%</td><td>Viral claim; <a href={sources.forbes}>Forbes calls it unconfirmed</a>.</td></tr>
              <tr><th scope="row">1 in 2,000</th><td>0.05%</td><td><a href={sources.vice}>VICE attributes this estimate to Blortzen</a>; it is not an official rate.</td></tr>
              <tr><th scope="row">Epic-confirmed rate</th><td>Not available</td><td>No exact figure in the sources reviewed.</td></tr>
            </tbody>
          </table>
        </div>
        <p>The larger estimated probability is 350 times the smaller one. That gap shows how uncertain the claims are; it does not tell us that the true rate must fall somewhere between them.</p>
      </section>

      <section id="why-different">
        <h2>Why do the numbers differ so much?</h2>
        <p>The 1-in-700,000 claim circulates without a verified measurement behind it. The 1-in-2,000 scenario comes from assumptions about a chest triggering a treasure reward, that reward being Supreme tier, and the selected Supreme reward being Pirate Shop Access.</p>
        <p>Using assumed probabilities of 1%, 10% and 50% gives <code>0.01 × 0.10 × 0.50 = 0.0005</code>, or 0.05%. That multiplication is correct. Whether those inputs describe the game is a separate, unresolved question.</p>
        <p className="source-note">Blortzen describes the model as a guess that could be wrong in the <a href="https://x.com/blortzen/status/2117356157417177155">original estimate</a>. It assumes neither of the two available Supreme rewards is already owned. Do not present it as a verified data-mined probability.</p>
      </section>

      <section id="calculator">
        <h2>Explore hypothetical chest odds</h2>
        <p>Use this calculator to understand what an assumed rate would mean over multiple openings. It does not predict Fortnite&apos;s actual loot system or inspect your account.</p>
        <OddsCalculator />
      </section>

      <section id="read-results">
        <h2>What the result means</h2>
        <p>For a fixed chance <code>p</code> and <code>n</code> independent attempts, the probability of at least one success is <code>1 − (1 − p)<sup>n</sup></code>. These assumptions are essential: a changing loot pool or account-dependent rules could make this model unsuitable.</p>
        <p>At an assumed 1-in-2,000 rate, 2,000 openings produce about a 63.22% chance of at least one token—not 100%. At an assumed 1-in-700,000 rate, 1,000 openings produce about a 0.1428% chance. These are mathematical examples, not measured game results.</p>
        <p>If attempts are independent, earlier misses do not make the next chest overdue. A collection of successful videos also cannot establish the rate: it leaves out everyone who opened chests and found nothing.</p>
      </section>

      <section id="evidence">
        <h2>What would make a better estimate?</h2>
        <p>A useful study needs both successes and total eligible openings, with a consistent counting method. It should record the mode, date, chest category and relevant reward ownership, avoid duplicate reports, and include unsuccessful sessions. A few lucky drops alone cannot provide that denominator.</p>
        <p>Until stronger evidence is available, choose a <a href="/best-farming-spots/">route that makes efficient use of your time</a> and follow the <a href="/how-to-get-pirate-shop-token/">reported acquisition steps</a>. We do not publish invented chest-specific rates or a live drop-rate counter.</p>
      </section>
    </ArticleLayout>
  );
}


import { metadataFor, sources } from '@/lib/site';
import ArticleLayout from '@/components/ArticleLayout';

const path = '/best-farming-spots/';
export const metadata = metadataFor(
  'Best Pirate Shop Token Farming Spots: Route Planning Guide',
  'Start with the reported Lantern Landing route, compare chest openings per minute, and understand why no Fortnite location guarantees Pirate Shop Access.',
  path,
);

export default function FarmingPage() {
  return (
    <ArticleLayout
      title="Best places to farm the Pirate Shop Token"
      intro="Lantern Landing is a reported starting point. The best route for you is one where you can open chests consistently, survive the landing and avoid wasting time between attempts."
      path={path}
      category="Farming routes"
      sections={[
        { id: 'starting-route', label: 'A reported starting route' },
        { id: 'route-comparison', label: 'Compare routes fairly' },
        { id: 'squad-plan', label: 'Coordinate your squad' },
        { id: 'chest-types', label: 'Which chests to prioritize' },
        { id: 'expectations', label: 'Set useful expectations' },
      ]}
      related={[
        { href: '/how-to-get-pirate-shop-token/', title: 'How the token is obtained' },
        { href: '/pirate-shop-token-drop-rate/', title: 'Compare unconfirmed drop rates' },
        { href: '/how-to-activate-pirate-shop-access/', title: 'What to do after a drop' },
      ]}
    >
      <section id="starting-route">
        <h2>A reported starting route</h2>
        <p>Forbes recommends Lantern Landing for its concentration of chests, with Cursed Cavern and SS Rocky as possible follow-up stops. The same article warns that the location can attract competition and that digging exposes you to opponents.</p>
        <p className="source-note">This is a recommendation reported by <a href={sources.forbes}>Paul Tassi at Forbes</a>, not a route we have timed or a location Epic has confirmed as having better token odds.</p>
        <ol className="steps">
          <li><strong>Assess the landing.</strong> If several players are contesting the same buildings or chest area, secure equipment before committing to a long search.</li>
          <li><strong>Clear the accessible chests.</strong> Prefer a continuous path to repeatedly crossing exposed ground for isolated openings.</li>
          <li><strong>Choose the next stop based on the match.</strong> Consider nearby remaining loot, enemies, travel time and the storm before extending your route.</li>
        </ol>
        <div className="callout"><strong>A route creates opportunities.</strong> It does not give a confirmed token bonus. No guaranteed Pirate Shop spawn location has been established in the sources reviewed.</div>
      </section>

      <section id="route-comparison">
        <h2>Compare routes by openings per minute</h2>
        <p>Instead of trusting a headline chest count, keep a small personal log. Use the same time window for each route and count only chests you actually open. Include failed landings and travel; dropping those runs would make the route look better than it performs.</p>
        <div className="table-scroll">
          <table className="odds-table">
            <caption>What to record when comparing routes</caption>
            <thead><tr><th scope="col">Measure</th><th scope="col">Why it matters</th></tr></thead>
            <tbody>
              <tr><th scope="row">Actual chest openings</th><td>Map markers are not the same as completed attempts.</td></tr>
              <tr><th scope="row">Total elapsed minutes</th><td>Includes queues, travelling and interruptions.</td></tr>
              <tr><th scope="row">Contested landings</th><td>Shows how often a crowded route breaks down.</td></tr>
              <tr><th scope="row">Mode and date</th><td>Keeps comparisons meaningful as the event changes.</td></tr>
            </tbody>
          </table>
        </div>
        <p>Divide completed openings by elapsed minutes. For example, 24 openings in 12 minutes is 2 per minute; 30 in 20 minutes is 1.5. These are illustrative numbers, not measured Fortnite routes. Compare several sessions before deciding which route is more dependable.</p>
      </section>

      <section id="squad-plan">
        <h2>Coordinate the search with your squad</h2>
        <p>Agree on who searches each part of the landing area so you do not all run toward the same chest. Keep a fallback meeting point and enough equipment to help one another if the landing becomes contested.</p>
        <p>Coverage reports that a token discovery is shared with the finder&apos;s party. That makes coordinated searches useful, but does not prove that grouping up increases an individual chest&apos;s drop probability. Read the <a href="/how-to-get-pirate-shop-token/">acquisition and squad-sharing guide</a> for the distinction.</p>
      </section>

      <section id="chest-types">
        <h2>Do you need special chests?</h2>
        <p><a href={sources.gamesradar}>GamesRadar reports that standard chests can award the token</a>. There is no verified chest-by-chest probability table available in the sources we reviewed. We therefore do not attach precise token rates to ordinary, rare or Sprite chests.</p>
        <p>A chest may be worth pursuing for its other loot. That is a separate reason from claiming it has superior Pirate Shop odds. Keep those decisions separate when planning a route.</p>
      </section>

      <section id="expectations">
        <h2>Set expectations before a long session</h2>
        <p>Choose a session length that suits you and judge a route by completed openings, not whether one run happened to award the token. There is no established number of attempts after which a reward becomes guaranteed.</p>
        <p>The <a href="/pirate-shop-token-drop-rate/">odds explainer and scenario calculator</a> show why a random reward can remain elusive. If you do receive access, review the <a href="/how-to-activate-pirate-shop-access/">14-day activation window</a> before starting it.</p>
      </section>
    </ArticleLayout>
  );
}

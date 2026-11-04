import { metadataFor, sources } from '@/lib/site';
import ArticleLayout from '@/components/ArticleLayout';

const path = '/how-to-get-pirate-shop-token/';
export const metadata = metadataFor(
  'How to Get the Pirate Shop Token in Fortnite',
  'Learn how Pirate Shop Access drops, what happens when your squad finds it, and how to plan a chest route without relying on unverified tricks.',
  path,
);

export default function HowToGetPage() {
  return (
    <ArticleLayout
      title="How to get the Pirate Shop Token in Fortnite"
      intro="Search chests during Treasure Hunters. Pirate Shop Access is a random reward, so a good route creates more opportunities without guaranteeing a token."
      path={path}
      category="Getting started"
      sections={[
        { id: 'quick-answer', label: 'The short answer' },
        { id: 'find-a-token', label: 'What to do in a match' },
        { id: 'squad-sharing', label: 'How squad sharing works' },
        { id: 'better-routine', label: 'Build a useful routine' },
        { id: 'after-finding', label: 'After you find one' },
      ]}
      related={[
        { href: '/best-farming-spots/', title: 'Plan a chest farming route' },
        { href: '/pirate-shop-token-drop-rate/', title: 'Understand the reported odds' },
        { href: '/how-to-activate-pirate-shop-access/', title: 'Activate Pirate Shop Access' },
      ]}
    >
      <section id="quick-answer">
        <h2>The short answer</h2>
        <p>Pirate Shop Access can appear while opening chests. You do not need to buy a skin or enter a code to make the reported chest reward possible. GamesRadar reports that ordinary chests can award it, so searching only for rare chests is not a requirement.</p>
        <p className="source-note">Source: <a href={sources.gamesradar}>GamesRadar&apos;s Pirate Shop Token guide</a>. The exact chance per chest remains unconfirmed.</p>
        <div className="callout"><strong>No guaranteed method.</strong> More chest openings give you more opportunities. They do not create a promised drop after a certain number of attempts.</div>
      </section>

      <section id="find-a-token">
        <h2>What to do in a match</h2>
        <ol className="steps">
          <li><strong>Enter Battle Royale during Treasure Hunters.</strong> Check the current in-game event information before choosing a mode; do not assume every Creative island or other playlist has the same rewards.</li>
          <li><strong>Choose a route you can survive.</strong> Land with a plan for nearby chests, equipment and an exit. A crowded location can end a promising run before you open much.</li>
          <li><strong>Open the chests along that route.</strong> The token is reported as a random reward, not an item waiting at a fixed, guaranteed spawn.</li>
          <li><strong>Watch for the reward notification.</strong> Reports describe a chest glowing and shaking before a Pirate Shop Access message appears. Check your rewards when you return to the lobby.</li>
        </ol>
      </section>

      <section id="squad-sharing">
        <h2>How squad sharing works</h2>
        <p>Published coverage says that when one member of a duo, trio or squad finds Pirate Shop Access, the other members of that group receive it too. Coordinate chest searches and stay in the same match rather than treating a teammate&apos;s discovery as something they must gift afterward.</p>
        <p>Receiving the party reward and transferring an owned token are different things. Pirate Shop Access itself is non-transferable. You cannot use its free claims to send gifts to friends.</p>
        <p className="source-note">See <a href={sources.gamesradar}>GamesRadar</a> and <a href={sources.esports}>Esports.gg&apos;s explanation of party rewards</a>. Group play does not establish a higher drop chance for each individual chest.</p>
      </section>

      <section id="better-routine">
        <h2>Build a useful routine</h2>
        <p>Pick two possible landing routes and compare how many chests you actually open over the same amount of time. Include time spent queuing, travelling and recovering from contested landings. The route with more map markers is not automatically the route that works better for you.</p>
        <p>Our <a href="/best-farming-spots/">farming spots guide</a> gives you a starting point and a simple way to compare runs. Treat any claim about a special skin, a secret action or a specific chest having better token odds as unverified unless it comes with reliable evidence.</p>
        <p>A run without a token is not evidence that the route is broken. The <a href="/pirate-shop-token-drop-rate/">drop-rate comparison</a> explains why even a long series of attempts can end without a reward.</p>
      </section>

      <section id="after-finding">
        <h2>After you find one</h2>
        <p>Read the reward screen before activating. The free-claim window runs for 14 days from activation, so choosing when to begin matters. The reported 2026 activation deadline is December 15; the second activation belongs to 2027.</p>
        <p>Use the <a href="/how-to-activate-pirate-shop-access/">activation guide</a> to review the timing and exclusions, then confirm the exact terms shown in your own account. Finding access and starting its timer are separate steps.</p>
      </section>
    </ArticleLayout>
  );
}

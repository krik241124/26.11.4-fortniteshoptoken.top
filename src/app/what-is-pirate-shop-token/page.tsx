import { metadataFor, sources } from '@/lib/site';
import ArticleLayout from '@/components/ArticleLayout';

const path = '/what-is-pirate-shop-token/';
export const metadata = metadataFor(
  'What Is the Fortnite Pirate Shop Token? Access & Rules',
  'Understand Pirate Shop Access, the 2026 and 2027 activations, the 14-day claim window, eligible items and restrictions before using a token.',
  path,
);

export default function WhatIsPage() {
  return (
    <ArticleLayout
      title="What is the Fortnite Pirate Shop Token?"
      intro="Pirate Shop Token is the name players use for Pirate Shop Access: a rare in-game reward that unlocks a limited window of free claims on eligible Item Shop items."
      path={path}
      category="Token basics"
      sections={[
        { id: 'what-it-does', label: 'What the reward does' },
        { id: 'two-activations', label: '2026 and 2027 access' },
        { id: 'eligible-items', label: 'What is included' },
        { id: 'common-confusion', label: 'Common misunderstandings' },
        { id: 'next-step', label: 'Choose your next step' },
      ]}
      related={[
        { href: '/how-to-get-pirate-shop-token/', title: 'Find Pirate Shop Access' },
        { href: '/how-to-activate-pirate-shop-access/', title: 'Review activation steps' },
        { href: '/#faq', title: 'More Pirate Shop questions' },
      ]}
    >
      <section id="what-it-does">
        <h2>What does Pirate Shop Access do?</h2>
        <p>After you activate it, eligible items normally sold for V-Bucks in the Fortnite Item Shop can be claimed free for 14 days. Items you claim remain in your collection afterward, according to published coverage. The temporary part is the claim window, not a two-week rental of the cosmetics.</p>
        <p>This does not mean the entire catalogue of every Fortnite cosmetic becomes available. You still choose from the items offered in the shop during your active window, subject to the reward&apos;s exclusions.</p>
        <p className="source-note">See <a href={sources.esports}>Esports.gg&apos;s Pirate Shop overview</a> and the rules shown in <a href={sources.beebom}>Beebom&apos;s in-game screenshot</a>.</p>
      </section>

      <section id="two-activations">
        <h2>Why are there 2026 and 2027 tokens?</h2>
        <p>The reward provides two activations: one for 2026 and another for 2027. Each activation starts its own 14-day claim window. Receiving both does not mean you can combine them into an immediate 28-day period in 2026.</p>
        <div className="table-scroll">
          <table className="odds-table">
            <caption>Two activations, separate timing</caption>
            <thead><tr><th scope="col">Access</th><th scope="col">Timing</th><th scope="col">What to check</th></tr></thead>
            <tbody>
              <tr><th scope="row">2026</th><td>Reported activation deadline: December 15, 2026</td><td>Confirm the exact deadline and time zone in your account.</td></tr>
              <tr><th scope="row">2027</th><td>A separate activation in 2027</td><td>Read its availability dates when displayed in-game.</td></tr>
            </tbody>
          </table>
        </div>
        <p>The season schedule and the activation deadline are different. Epic announces a Chapter 7 end event on December 5; that is not the December 15 activation deadline shown for the 2026 reward.</p>
        <p className="source-note">Sources: <a href={sources.gamesradar}>GamesRadar on the two tokens</a>; <a href={sources.epic}>Epic&apos;s Treasure Hunters announcement</a>.</p>
      </section>

      <section id="eligible-items">
        <h2>What can you claim?</h2>
        <p>The central rule is eligibility for a V-Bucks purchase in the Item Shop while access is active. Do not assume that every offer visible somewhere in Fortnite is included.</p>
        <ul className="split-list">
          <li><strong>Eligible shop cosmetics:</strong> items offered for V-Bucks, subject to the rules shown in-game.</li>
          <li><strong>Real-money offers:</strong> excluded from the free-claim benefit.</li>
          <li><strong>Gifting:</strong> excluded; you cannot use access to send free gifts.</li>
          <li><strong>Pass levels and rewards:</strong> excluded by the activation terms.</li>
          <li><strong>Sidekicks:</strong> the displayed terms limit you to one free Sidekick you do not already own.</li>
        </ul>
        <p>Review the specific item&apos;s confirmation screen before claiming it. If an offer still shows a charge you do not expect, stop and check its eligibility rather than assuming the token will reimburse a purchase.</p>
      </section>

      <section id="common-confusion">
        <h2>Three common misunderstandings</h2>
        <p><strong>It is not a redeem code.</strong> The reported reward comes from in-game chest openings. This guide does not issue tokens or unlock your account.</p>
        <p><strong>Party sharing is not transferring.</strong> Reports say squad members benefit when someone in their group discovers access. An already-owned token is non-transferable.</p>
        <p><strong>Rarity is not a published percentage.</strong> The widely repeated numbers are unconfirmed. Our <a href="/pirate-shop-token-drop-rate/">drop-rate guide</a> separates those claims from the mathematics of an assumed probability.</p>
      </section>

      <section id="next-step">
        <h2>What should you do next?</h2>
        <p>If you are still searching, start with <a href="/how-to-get-pirate-shop-token/">how to get the token</a>. If it is already in your account, read the <a href="/how-to-activate-pirate-shop-access/">activation checklist</a> before starting the timer. The most useful decision at that point is when you can make use of the 14-day window.</p>
      </section>
    </ArticleLayout>
  );
}

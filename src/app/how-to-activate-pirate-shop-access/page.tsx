import { metadataFor, sources } from '@/lib/site';
import ArticleLayout from '@/components/ArticleLayout';

const path = '/how-to-activate-pirate-shop-access/';
export const metadata = metadataFor(
  'How to Activate Pirate Shop Access in Fortnite',
  'Find the Pirate Shop banner, review the activation terms, start the 14-day window and check restrictions. Includes the reported 2026 deadline.',
  path,
);

export default function ActivationPage() {
  return (
    <ArticleLayout
      title="How to activate Pirate Shop Access"
      intro="Once the reward is in your account, use the Pirate Shop banner in the Item Shop to review and activate it. The 14-day clock begins when you confirm activation."
      path={path}
      category="Activation guide"
      sections={[
        { id: 'before-activation', label: 'Before you start' },
        { id: 'activation-steps', label: 'Activation steps' },
        { id: 'timing', label: 'Dates and the 14-day clock' },
        { id: 'missing-banner', label: 'If access is missing' },
        { id: 'after-activation', label: 'After activation' },
      ]}
      related={[
        { href: '/what-is-pirate-shop-token/', title: 'Review eligible items and exclusions' },
        { href: '/how-to-get-pirate-shop-token/', title: 'How to obtain Pirate Shop Access' },
        { href: '/#faq', title: 'Read the frequently asked questions' },
      ]}
    >
      <section id="before-activation">
        <h2>Check these things before you start</h2>
        <p>First confirm that you actually received Pirate Shop Access. Opening the Item Shop or finding the banner does not itself award a token. If you are still searching, use the <a href="/how-to-get-pirate-shop-token/">acquisition guide</a> first.</p>
        <p>Decide whether you can use the next 14 days. Activating when you will be away may waste part of the claim window. Balance that choice against the activation deadline shown in your account; do not leave it until a deadline you have not checked.</p>
        <div className="callout"><strong>Read before confirming.</strong> The 14-day benefit starts at activation. Do not assume you can pause, undo or restart that window.</div>
      </section>

      <section id="activation-steps">
        <h2>Activate it from the Item Shop</h2>
        <ol className="steps">
          <li><strong>Return to the lobby.</strong> Review the reward notification and make sure you are using the account that received access.</li>
          <li><strong>Open the Item Shop.</strong> Look for the Pirate Shop or Plunder the Shop banner associated with your reward.</li>
          <li><strong>Open the activation panel.</strong> Check which year&apos;s access you are about to use and read the displayed dates and exclusions.</li>
          <li><strong>Choose Activate Now when ready.</strong> Confirm only when you intend to begin the 14-day period.</li>
          <li><strong>Check the active status.</strong> Review an eligible item&apos;s claim screen and confirm it is offered free before completing the claim.</li>
        </ol>
        <p>The banner&apos;s position and controller prompts may differ by platform or interface update. Follow the labels in your game rather than relying on a fixed screen corner or a specific controller button.</p>
        <p className="source-note">The activation panel and workflow are shown in <a href={sources.beebom}>Beebom&apos;s activation screenshot</a>. The in-game terms shown on your own account take priority if the interface changes.</p>
      </section>

      <section id="timing">
        <h2>Keep the deadline separate from the timer</h2>
        <p>The 2026 reward has a reported activation deadline of December 15, 2026. The game screenshot reviewed shows 6 PM GMT−6; check your account&apos;s displayed time rather than treating the date as midnight in your own region.</p>
        <p>The 14-day claim window is measured from activation. It is separate from the deadline for starting access and from the season&apos;s event schedule. Once active, the shop can change during that period, so check what is available when you play.</p>
        <p>A second activation is for 2027. Review its availability and deadline in-game when it becomes usable; do not assume the 2026 token&apos;s screen tells you every rule for next year.</p>
        <p className="source-note">See <a href={sources.gamesradar}>GamesRadar&apos;s dates and reward explanation</a> and the <a href={sources.beebom}>pictured activation terms</a>.</p>
      </section>

      <section id="missing-banner">
        <h2>What if you cannot see or activate it?</h2>
        <p>Start by checking the account, reward notification, access year and deadline. A future-year activation may not be usable yet. If the game offers a purchase instead of a free claim, verify whether that particular offer qualifies.</p>
        <p>For an unexplained missing reward or an account-specific error, use <a href="https://www.epicgames.com/help/en-US/fortnite-c5719335176219">Epic&apos;s Fortnite support</a>. Keep the time of the match and a screenshot of the error if available. This independent guide cannot inspect or modify your account.</p>
      </section>

      <section id="after-activation">
        <h2>Claim only eligible items</h2>
        <p>Real-money offers, gifting, and pass levels or rewards are excluded. The terms also limit free Sidekicks to one you do not already own. Read the <a href="/what-is-pirate-shop-token/">full overview of included items and restrictions</a> if you are unsure.</p>
        <p>The access period does not mean every Fortnite cosmetic is available at once. Choose from the eligible offers in the shop while your window is active, and verify each confirmation screen before completing a claim.</p>
      </section>
    </ArticleLayout>
  );
}


import OddsPreview from '@/components/OddsPreview';
import { guides, jsonLd, metadataFor, sources } from '@/lib/site';

export const metadata = metadataFor(
  'Fortnite Pirate Shop Token: Odds Calculator & Access Guide',
  'Calculate hypothetical Pirate Shop Token odds, compare reported drop rates, and plan your 14-day access. Independent Fortnite tools with sourced guides.',
  '/'
);

const questions = [
  { question: 'How do you get a Pirate Shop Token in Fortnite?', answer: 'Open chests during Treasure Hunters. Reports say ordinary chests can award Pirate Shop Access, and a find in a duo, trio, or squad is shared with teammates. There is no verified route that guarantees a token.' },
  { question: 'Is the Pirate Shop Token real?', answer: 'Yes. Pirate Shop Access is an in-game reward. Activate it through the Fortnite Item Shop after receiving it. This website is an independent guide and does not issue tokens or ask for your Epic account.' },
  { question: 'What is the actual drop rate?', answer: 'No official numerical drop rate has been confirmed in the sources reviewed here. The circulating 1 in 700,000 and 0.05% estimates are unverified claims, not a measured range of possible odds.' },
  { question: 'How long does Pirate Shop Access last?', answer: 'Each activation lasts 14 days. The 2026 access must be activated by the deadline shown in the game, reported as December 15. A second activation is for 2027; check the dates and terms on your account.' },
];
const contents = [
  ['quick-answer', 'The quick answer'], ['how-to-get', 'How to get a token'], ['drop-rates', 'The drop-rate debate'],
  ['farming', 'Where to look'], ['activation', 'Activate your access'], ['rewards', 'What you can claim'], ['faq', 'Common questions'],
];

export default function Home() {
  return <main id="main-content">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: questions.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
    }) }} />
    <div className="container">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" />TREASURE HUNTERS / FIELD GUIDE 001</p>
          <h1 id="hero-title" className="hero-title">Fortnite Pirate<br />Shop Token.<br /><span>Make sense of<br />the odds.</span></h1>
          <p className="hero-summary">Choose an assumed drop rate. See what your chest openings could mean. Then plan when to use your 14 days of shop access.</p>
          <div className="hero-actions"><a className="button button-primary" href="/pirate-shop-token-drop-rate/#calculator">Calculate your odds <span aria-hidden="true">↗</span></a></div>
          <p className="status-line">Independent guide <span aria-hidden="true">·</span> Reviewed <time dateTime="2026-11-04">Nov 4, 2026</time></p>
        </div>
        <div className="hero-art hero-data"><OddsPreview /></div>
      </section>
      <div className="guide-layout">
        <aside className="toc" aria-label="On this page"><details open><summary>THE FIELD NOTES</summary><nav>{contents.map(([id, label], index) => <a key={id} href={'#' + id}><span className="toc-number">0{index + 1}</span>{label}</a>)}</nav><p className="source-note">Game rules can change.<br />Your in-game terms take priority.</p></details></aside>
        <article className="article">
          <section id="quick-answer" className="answer-panel">
            <p className="section-kicker">01 / NEED TO KNOW</p><h2 className="section-heading">The quick answer</h2>
            <p>The <strong>Fortnite Pirate Shop Token</strong> is a rare chest reward in Treasure Hunters. After activation, it lets you claim eligible V-Bucks items from the Item Shop for 14 days. The exact drop rate has not been officially confirmed.</p>
            <dl className="quick-facts">
              <div><dt>Where it drops</dt><dd>Chests, including ordinary chests</dd></div>
              <div><dt>Your reward</dt><dd>2026 + 2027 shop activations</dd></div>
              <div><dt>Access duration</dt><dd>14 days per activation</dd></div>
              <div><dt>Squad sharing</dt><dd>A find rewards your teammates too</dd></div>
              <div><dt>2026 activation deadline</dt><dd>December 15 — check in-game terms</dd></div>
              <div><dt>Gifting</dt><dd>Not included</dd></div>
            </dl>
            <p className="source-note">Mechanics reported by <a href={sources.gamesradar}>GamesRadar</a>; limitations shown in the <a href={sources.beebom}>activation terms reproduced in Beebom’s guide</a>. The December 5 finale and the December 15 activation deadline are different dates.</p>
          </section>
          <section id="how-to-get">
            <p className="section-kicker">02 / ACQUISITION</p><h2 className="section-heading">Open chests. Watch for the access notification.</h2>
            <ol className="steps">
              <li><strong>Start with a repeatable chest route.</strong><p>Ordinary chests are reported to be eligible. You do not need to limit your search to rare chests.</p></li>
              <li><strong>Play with your squad.</strong><p>According to current reports, a teammate’s find also grants access to the rest of that duo, trio, or squad.</p></li>
              <li><strong>Check your reward before activating.</strong><p>A Pirate Shop Access notification announces the find. Head to the Item Shop when you are ready to review the terms.</p></li>
            </ol>
            <a className="text-link" href="/how-to-get-pirate-shop-token/">Read the complete getting-started guide <span aria-hidden="true">↗</span></a>
          </section>
          <section id="drop-rates">
            <p className="section-kicker">03 / THE BIG QUESTION</p><h2 className="section-heading">Two reported odds.<br />Neither is official.</h2>
            <p>Search results repeat very different numbers. Put them side by side before turning a claim into a farming plan.</p>
            <div className="table-scroll" role="region" aria-label="Reported token odds comparison" tabIndex={0}>
              <table className="odds-table"><caption>Circulating estimates, reviewed November 4, 2026</caption><thead><tr><th scope="col">Reported figure</th><th scope="col">Equivalent chance</th><th scope="col">Evidence</th></tr></thead><tbody>
                <tr><th scope="row">1 in 700,000</th><td>≈ 0.000143%</td><td><span className="tag tag-estimate">Unconfirmed</span><br /><a href={sources.forbes}>Discussed by Forbes</a></td></tr>
                <tr><th scope="row">0.05%</th><td>1 in 2,000</td><td><span className="tag tag-estimate">Community estimate</span><br /><a href={sources.vice}>Reported by VICE</a></td></tr>
              </tbody></table>
            </div>
            <div className="callout"><strong>A 350× difference in the claimed per-chest probability.</strong><p>These are competing assumptions, not a verified range. Neither establishes the true rate, a best chest type, or a guaranteed number of attempts.</p></div>
            <p>Even under the more generous 1-in-2,000 assumption, opening 2,000 independent chests gives about a <strong>63.2%</strong> chance of at least one success—not certainty.</p>
            <a className="button button-primary" href="/pirate-shop-token-drop-rate/#calculator">Try the odds calculator <span aria-hidden="true">↗</span></a>
          </section>
          <section id="farming">
            <p className="section-kicker">04 / FIELD NOTES</p><h2 className="section-heading">Find a route you can actually finish.</h2>
            <p>Lantern Landing is a reported farming suggestion, with Cursed Cavern and SS Rocky as possible rotation stops. That recommendation comes from <a href={sources.forbes}>Forbes</a>, not an official drop-rate table.</p>
            <p>A popular landing spot is only useful if you survive long enough to open its chests. Count completed chest openings and time spent travelling across a few matches. A quieter route can be a better fit than a contested destination with a bigger reputation.</p>
            <a className="text-link" href="/best-farming-spots/">Compare locations and plan a route <span aria-hidden="true">↗</span></a>
          </section>
          <section id="activation">
            <p className="section-kicker">05 / YOUR FOURTEEN DAYS</p><h2 className="section-heading">Found it? Choose when to activate.</h2>
            <ol className="steps">
              <li><strong>Open the Item Shop.</strong><p>Find the Pirate Shop / Plunder banner after receiving access.</p></li>
              <li><strong>Review the activation screen.</strong><p>Read the eligible items, exclusions, and the deadline displayed on your account.</p></li>
              <li><strong>Select Activate Now when ready.</strong><p>The 14-day period begins at activation. Do not assume time pauses when you log out.</p></li>
            </ol>
            <p className="source-note">Based on <a href={sources.esports}>the reported activation flow</a> and <a href={sources.beebom}>Beebom’s activation guide</a>.</p>
            <a className="text-link" href="/how-to-activate-pirate-shop-access/#planner">Plan your 14-day window <span aria-hidden="true">↗</span></a>
          </section>
          <section id="rewards">
            <p className="section-kicker">06 / THE REWARD</p><h2 className="section-heading">What access includes</h2>
            <div className="split-list">
              <div><h3>Eligible shop items</h3><ul><li>Eligible outfits and other V-Bucks cosmetics</li><li>Eligible emotes and Jam Tracks</li><li>One Sidekick you do not already own</li></ul></div>
              <div><h3>Outside the offer</h3><ul><li>Real-money purchases</li><li>Gifts to other players</li><li>Pass levels and pass rewards</li><li>Transferring the access reward</li></ul></div>
            </div>
            <p className="source-note">Always confirm eligibility on the <a href={sources.beebom}>activation terms in Beebom’s guide</a>. Access does not mean every item in Fortnite is included.</p>
            <a className="text-link" href="/what-is-pirate-shop-token/">Understand the two activations <span aria-hidden="true">↗</span></a>
          </section>
          <section id="faq">
            <p className="section-kicker">07 / QUICK CLARIFICATIONS</p><h2 className="section-heading">Before your next drop</h2>
            <div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
          </section>
          <section id="guides">
            <p className="section-kicker">THE COMPLETE FIELD GUIDE</p><h2 className="section-heading">Go deeper on your next question.</h2>
            <div className="guide-list">{guides.map(guide => <a className="guide-link" href={guide.href} key={guide.href}><span><small>{guide.label}</small><strong>{guide.title}</strong><span>{guide.description}</span></span><span aria-hidden="true">↗</span></a>)}</div>
          </section>
        </article>
      </div>
    </div>
  </main>;
}

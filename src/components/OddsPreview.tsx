'use client';

import { useId, useState } from 'react';
import { atLeastOneProbability, formatProbability, parseTrialInput } from '@/lib/probability';

export default function OddsPreview() {
  const id = useId();
  const [count, setCount] = useState('2000');
  const attempts = parseTrialInput(count, 10000000, 0);
  return <div className="odds-preview" aria-labelledby={id + '-title'}>
    <p className="section-kicker">QUICK ODDS CHECK / HYPOTHETICAL</p>
    <h2 id={id + '-title'}>Try your chest count.</h2>
    <div className="field preview-input">
      <label htmlFor={id + '-count'}>Chests opened</label>
      <input id={id + '-count'} type="number" min="0" max="10000000" step="1" value={count} aria-invalid={attempts === null} aria-describedby={id + '-hint'} onChange={event => setCount(event.target.value)} />
      <small id={id + '-hint'}>{attempts === null ? 'Enter a whole number from 0 to 10,000,000.' : 'Same chest count. Two unconfirmed assumptions.'}</small>
    </div>
    <div className="quick-counts" aria-label="Example chest counts">{[500, 1000, 2000].map(value => <button key={value} type="button" aria-pressed={count === String(value)} onClick={() => setCount(String(value))}>{value.toLocaleString('en-US')}</button>)}<button type="button" onClick={() => setCount('2000')}>Reset</button></div>
    <div aria-live="polite" aria-atomic="true">
      {attempts === null ? <p className="callout">A valid chest count will show both scenarios.</p> : [700000, 2000].map(denominator => {
        const chance = atLeastOneProbability(1 / denominator, attempts);
        return <div className="preview-scenario" key={denominator}><span>If the rate were 1 in {denominator.toLocaleString('en-US')}</span><strong>{formatProbability(chance)}</strong><div className="preview-meter" aria-hidden="true"><span style={{ width: `${chance * 100}%` }} /></div></div>;
      })}
    </div>
    <p className="source-note">Model probability of at least one success across that many independent chests. These are not verified game odds or a forecast after known misses.</p>
    <noscript><p>Enable JavaScript to change the count. The displayed example uses 2,000 chests.</p></noscript>
  </div>;
}

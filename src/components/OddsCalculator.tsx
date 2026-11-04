'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { atLeastOneProbability, expectedAdditionalTrials, formatProbability, parseChancePercent, parseTrialInput } from '@/lib/probability';
import { DEFAULT_PLANNING_TARGET, REVIEWED_DATE, calendarDayDifference, formatCalendarDate, localCalendarDate } from '@/lib/event-config';

export default function OddsCalculator() {
  const id = useId();
  const startEdited = useRef(false);
  const [preset, setPreset] = useState('700000');
  const [customPercent, setCustomPercent] = useState('0.01');
  const [opened, setOpened] = useState('2000');
  const [chests, setChests] = useState('30');
  const [matches, setMatches] = useState('5');
  const [start, setStart] = useState(REVIEWED_DATE);
  const [target, setTarget] = useState(DEFAULT_PLANNING_TARGET);

  useEffect(() => {
    if (!startEdited.current) setStart(localCalendarDate());
  }, []);

  const chance = preset === 'custom' ? parseChancePercent(customPercent) : 1 / Number(preset);
  const pastTrials = parseTrialInput(opened, 10000000, 0);
  const chestsPerMatch = parseTrialInput(chests, 1000);
  const matchesPerDay = parseTrialInput(matches, 1000);
  const days = calendarDayDifference(start, target);
  const validDays = days !== null && days >= 0 && days <= 366;
  const futureTrials = validDays && chestsPerMatch !== null && matchesPerDay !== null ? days * chestsPerMatch * matchesPerDay : null;
  const historicalProbability = chance !== null && pastTrials !== null ? atLeastOneProbability(chance, pastTrials) : null;
  const expected = chance === null ? null : expectedAdditionalTrials(chance);
  const futureProbability = chance !== null && futureTrials !== null ? atLeastOneProbability(chance, futureTrials) : null;
  const rateLabel = preset === 'custom' ? `${customPercent}% custom assumption` : `1 in ${Number(preset).toLocaleString('en-US')} — unconfirmed`;

  function reset() {
    setPreset('700000'); setCustomPercent('0.01'); setOpened('2000');
    setChests('30'); setMatches('5'); setStart(localCalendarDate()); setTarget(DEFAULT_PLANNING_TARGET);
    startEdited.current = false;
  }

  return <div className="calculator odds-calculator" aria-labelledby={id + '-title'}>
    <div className="tool-toolbar"><span className="tag tag-estimate">Hypothetical model</span><button type="button" className="reset-button" onClick={reset}>Reset inputs ↺</button></div>
    <h3 id={id + '-title'}>Put the reported odds into perspective.</h3>
    <p className="source-note" id={id + '-assumptions'}>No verified drop rate is available. This model assumes a fixed chance and independent chest openings. It does not read your Fortnite account.</p>
    <div className="form-grid">
      <div className="field">
        <label htmlFor={id + '-rate'}>Assumed drop rate</label>
        <select id={id + '-rate'} value={preset} onChange={event => setPreset(event.target.value)} aria-describedby={id + '-rate-hint'}>
          <option value="700000">1 in 700,000 — reported, unconfirmed</option>
          <option value="2000">0.05% / 1 in 2,000 — reported, unconfirmed</option>
          <option value="custom">Enter a custom percentage</option>
        </select>
        <small id={id + '-rate-hint'}>Choosing a number does not verify it.</small>
      </div>
      <div className="field">
        <label htmlFor={id + '-opened'}>Chests already opened</label>
        <input id={id + '-opened'} type="number" min="0" max="10000000" step="1" value={opened} aria-invalid={pastTrials === null} aria-describedby={id + '-opened-hint'} onChange={event => setOpened(event.target.value)} />
        <small id={id + '-opened-hint'}>{pastTrials === null ? 'Enter a whole number from 0 to 10,000,000.' : 'The model evaluates a run of this many chests.'}</small>
      </div>
      {preset === 'custom' && <div className="field">
        <label htmlFor={id + '-custom'}>Custom chance per chest (%)</label>
        <input id={id + '-custom'} type="number" min="0.000000001" max="100" step="any" value={customPercent} aria-invalid={chance === null} aria-describedby={id + '-custom-hint'} onChange={event => setCustomPercent(event.target.value)} />
        <small id={id + '-custom-hint'}>{chance === null ? 'Enter a percentage from 0.000000001 to 100.' : 'Example: 0.05 means 0.05%, not 5%.'}</small>
      </div>}
    </div>
    <div aria-live="polite" aria-atomic="true">
      {historicalProbability !== null && expected !== null ? <>
        <p className="model-state">MODEL INPUT <strong>{rateLabel}</strong></p>
        <div className="result-grid">
          <div className="result-card"><p>At least one success in {pastTrials!.toLocaleString('en-US')} chests</p><strong data-result="past">{formatProbability(historicalProbability)}</strong><p>Model probability over a run of that length</p></div>
          <div className="result-card"><p>Mean additional openings until success</p><strong data-result="expected">{expected.toLocaleString('en-US', { maximumFractionDigits: 2 })}</strong><p>From now, if you have not found one; not a guarantee</p></div>
        </div>
      </> : <p className="callout" role="status">Enter a valid drop rate and chest count to calculate the model.</p>}
    </div>
    <p className="source-note">If you already know those chests were all misses, that outcome is known. It does not make the next chest more likely to succeed. The mean additional count is <code>1 / p</code>, even after a long losing streak; it is never <code>1 / p − chests opened</code>.</p>

    <div className="tool-divider"><p className="section-kicker">PLAN FUTURE SESSIONS</p><h3>What could your next sessions add?</h3></div>
    <p className="source-note">The default target is the announced December 5 Chapter 7 finale. It is a planning date, not a verified last token-drop date. Change it to suit your own schedule.</p>
    <div className="form-grid">
      <div className="field"><label htmlFor={id + '-start'}>Plan starts on</label><input id={id + '-start'} type="date" value={start} aria-invalid={days === null} onChange={event => { startEdited.current = true; setStart(event.target.value); }} /><small>Defaults to your device’s current calendar date.</small></div>
      <div className="field"><label htmlFor={id + '-target'}>Planning target date</label><input id={id + '-target'} type="date" value={target} aria-invalid={!validDays} aria-describedby={id + '-target-hint'} onChange={event => setTarget(event.target.value)} /><small id={id + '-target-hint'}>{!validDays ? 'Choose a valid target from the start date through the next 366 days.' : 'Counts the start date, but excludes the target date.'}</small></div>
      <div className="field"><label htmlFor={id + '-matches'}>Matches per day</label><input id={id + '-matches'} type="number" min="1" max="1000" step="1" value={matches} aria-invalid={matchesPerDay === null} aria-describedby={id + '-matches-hint'} onChange={event => setMatches(event.target.value)} /><small id={id + '-matches-hint'}>{matchesPerDay === null ? 'Enter a whole number from 1 to 1,000.' : 'Your own plan, not a recommended play quota.'}</small></div>
      <div className="field"><label htmlFor={id + '-chests'}>Chests per match</label><input id={id + '-chests'} type="number" min="1" max="1000" step="1" value={chests} aria-invalid={chestsPerMatch === null} aria-describedby={id + '-chests-hint'} onChange={event => setChests(event.target.value)} /><small id={id + '-chests-hint'}>{chestsPerMatch === null ? 'Enter a whole number from 1 to 1,000.' : 'Use a realistic count from matches you have played.'}</small></div>
    </div>
    <div aria-live="polite" aria-atomic="true">
      {futureProbability !== null && futureTrials !== null ? <div className="future-result">
        <p><strong>{days} planned days</strong> before {formatCalendarDate(target)} × {matchesPerDay} matches × {chestsPerMatch} chests</p>
        <div className="result-grid"><div className="result-card"><p>Future chest openings</p><strong data-result="future-count">{futureTrials.toLocaleString('en-US')}</strong><p>Excludes the chests already opened</p></div><div className="result-card"><p>At least one success in those future chests</p><strong data-result="future">{formatProbability(futureProbability)}</strong><p>Using the same selected assumption</p></div></div>
        {days === 0 && <p className="source-note">This plan contains no remaining days, so it adds zero attempts.</p>}
      </div> : <p className="callout" role="status">Use a valid rate, dates and daily counts to calculate your future-session scenario.</p>}
    </div>
    <p className="source-note">Formula: <code>1 − (1 − p)<sup>n</sup></code>. A probability close to 100% is not a guarantee. Changing loot rules, reward ownership or dependencies between openings would change the model.</p>
    <noscript><p>Enable JavaScript to edit inputs. The static example starts on November 4, 2026; it is not a live countdown.</p></noscript>
  </div>;
}

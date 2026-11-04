'use client';

import { useId, useState } from 'react';
import {
  atLeastOneProbability,
  formatProbability,
  parseTrialInput,
} from '@/lib/probability';

const fields = [
  { key: 'chests', label: 'Chests per match', maximum: 1000 },
  { key: 'matches', label: 'Matches per day', maximum: 1000 },
  { key: 'days', label: 'Number of days', maximum: 366 },
] as const;

const scenarios = [
  { denominator: 700000, label: 'If the chance were 1 in 700,000' },
  { denominator: 2000, label: 'If the chance were 1 in 2,000' },
] as const;

export default function OddsCalculator() {
  const id = useId();
  const [values, setValues] = useState({ chests: '30', matches: '5', days: '35' });
  const parsed = fields.map((field) => parseTrialInput(values[field.key], field.maximum));
  const valid = parsed.every((value) => value !== null);
  const total = valid ? parsed.reduce<number>((product, value) => product * (value ?? 0), 1) : null;

  return (
    <div className="calculator" aria-labelledby={`${id}-title`}>
      <span className="tag tag-estimate">Hypothetical scenarios</span>
      <h3 id={`${id}-title`}>What would these odds mean for your sessions?</h3>
      <p id={`${id}-assumptions`} className="source-note">
        Neither drop rate is verified. This calculator compares mathematical scenarios,
        assuming each chest is an independent attempt with the same fixed chance.
        It does not predict your actual Fortnite rewards.
      </p>

      <div className="form-grid" aria-describedby={`${id}-assumptions`}>
        {fields.map((field, index) => {
          const inputId = `${id}-${field.key}`;
          const invalid = parsed[index] === null;
          return (
            <div className="field" key={field.key}>
              <label htmlFor={inputId}>{field.label}</label>
              <input
                id={inputId}
                name={field.key}
                type="number"
                inputMode="numeric"
                min={1}
                max={field.maximum}
                step={1}
                required
                value={values[field.key]}
                aria-invalid={invalid}
                aria-describedby={`${inputId}-hint`}
                onChange={(event) => setValues((previous) => ({
                  ...previous,
                  [field.key]: event.target.value,
                }))}
              />
              <small id={`${inputId}-hint`} className="muted">
                {invalid ? 'Enter a whole number' : 'Whole numbers'} from 1 to {field.maximum.toLocaleString('en-US')}.
              </small>
            </div>
          );
        })}
      </div>

      <div aria-live="polite" aria-atomic="true">
        {total === null ? (
          <p className="callout">Complete all three fields with whole numbers in the allowed ranges to see the comparison.</p>
        ) : (
          <>
            <p><strong>{total.toLocaleString('en-US')} chests</strong> across your selected sessions.</p>
            <div className="result-grid">
              {scenarios.map((scenario) => (
                <div className="result-card" key={scenario.denominator}>
                  <p>{scenario.label}</p>
                  <strong>{formatProbability(atLeastOneProbability(1 / scenario.denominator, total))}</strong>
                  <p className="muted">chance of at least one drop in this scenario</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <p className="source-note">
        Formula: <code>1 − (1 − p)<sup>n</sup></code>, where <var>p</var> is the assumed
        chance per chest and <var>n</var> is the number of chests. These figures are
        not a guarantee; previous misses do not improve the next attempt under this model.
      </p>
      <noscript><p>Enable JavaScript to change the inputs. The displayed results use 30 chests per match, 5 matches per day, and 35 days.</p></noscript>
    </div>
  );
}

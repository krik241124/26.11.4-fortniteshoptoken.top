'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  ACCESS_DURATION_HOURS,
  ACTIVATION_DEADLINE_MS,
  FIRST_REPORTED_EVENT_DATE,
  PLANNER_REVIEWED_DATE,
  formatUtcDateTime,
  planActivation,
  utcDateTimeInput,
} from '@/lib/activation';

export default function ActivationPlanner() {
  const id = useId();
  const edited = useRef(false);
  const [foundDate, setFoundDate] = useState(PLANNER_REVIEWED_DATE);
  const [activationDateTime, setActivationDateTime] = useState(`${PLANNER_REVIEWED_DATE}T12:00`);
  const [now, setNow] = useState(Date.parse(`${PLANNER_REVIEWED_DATE}T12:00:00Z`));

  useEffect(() => {
    const current = new Date();
    setNow(current.getTime());
    if (!edited.current) {
      const currentInput = utcDateTimeInput(current);
      setFoundDate(currentInput.slice(0, 10));
      setActivationDateTime(currentInput);
    }
  }, []);

  const { errors, window: accessWindow } = planActivation(foundDate, activationDateTime);
  const expired = now >= ACTIVATION_DEADLINE_MS;

  function reset() {
    const current = new Date();
    const input = utcDateTimeInput(current);
    edited.current = false;
    setNow(current.getTime());
    setFoundDate(input.slice(0, 10));
    setActivationDateTime(input);
  }

  return (
    <div className="calculator activation-planner" aria-labelledby={`${id}-title`}>
      <div className="tool-toolbar"><span className="tag">2026 activation planner</span><button type="button" className="reset-button" onClick={reset}>Reset dates ↺</button></div>
      <h3 id={`${id}-title`}>Choose when your 14 days begin.</h3>
      <p id={`${id}-timezone`} className="source-note">
        All inputs and results use <strong>UTC</strong>, not your device’s local time.
        The reported deadline is December 15, 2026 at 18:00 GMT−6, which is
        December 16 at 00:00 UTC. Confirm the deadline in your own game before activating.
      </p>
      {expired && <p className="callout" role="status"><strong>The reported 2026 activation deadline has passed.</strong> You can review a historical date below, but this does not reopen access. Check your account for the separate 2027 availability window.</p>}

      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${id}-found`}>Date you found the token (UTC)</label>
          <input
            id={`${id}-found`}
            name="date-found"
            type="date"
            min={FIRST_REPORTED_EVENT_DATE}
            required
            value={foundDate}
            aria-invalid={Boolean(errors.found)}
            aria-describedby={`${id}-found-hint ${id}-timezone`}
            onChange={(event) => { edited.current = true; setFoundDate(event.target.value); }}
          />
          <small id={`${id}-found-hint`} className="muted">{errors.found ?? 'If activating on this date, choose a time after you received access.'}</small>
        </div>
        <div className="field">
          <label htmlFor={`${id}-activation`}>Planned activation date and time (UTC)</label>
          <input
            id={`${id}-activation`}
            name="activation-date-time"
            type="datetime-local"
            step={60}
            required
            value={activationDateTime}
            aria-invalid={Boolean(errors.activation)}
            aria-describedby={`${id}-activation-hint ${id}-timezone`}
            onChange={(event) => { edited.current = true; setActivationDateTime(event.target.value); }}
          />
          <small id={`${id}-activation-hint`} className="muted">{errors.activation ?? 'Enter UTC here even if your browser formats the field in your regional style.'}</small>
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {accessWindow ? <>
          <div className="result-grid">
            <div className="result-card"><p>Planned activation</p><strong className="planner-date"><time dateTime={new Date(accessWindow.start).toISOString()}>{formatUtcDateTime(accessWindow.start)}</time></strong><p>Your selected start time</p></div>
            <div className="result-card"><p>14-day window ends</p><strong className="planner-date"><time dateTime={new Date(accessWindow.end).toISOString()}>{formatUtcDateTime(accessWindow.end)}</time></strong><p>Exactly {ACCESS_DURATION_HOURS} hours after the selected start</p></div>
          </div>
          <p className="source-note">The end time is the end of the calculated window, not an extra day to claim items. Your actual timer starts when you activate in Fortnite, so a different activation time changes the result.</p>
        </> : <p className="callout" role="status">{errors.activation ?? errors.found} The 14-day result appears when both inputs are valid.</p>}
      </div>

      <p className="source-note">This is a calendar calculation, not a shop schedule or a claim guarantee. It cannot predict which cosmetics will appear or establish eligibility. The activation deadline limits when you can start; it is separate from the 14-day duration. We have not assumed a 2027 activation deadline.</p>
      <noscript><p>Enable JavaScript to change the dates. The initial example starts on November 4, 2026 at 12:00 UTC and ends on November 18 at 12:00 UTC; it is not a live countdown.</p></noscript>
    </div>
  );
}

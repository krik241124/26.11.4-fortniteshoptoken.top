import { atLeastOneProbability, formatProbability, probabilityScenarios, probabilityTableRows } from '@/lib/probability';

const graph = { left: 64, right: 650, top: 24, bottom: 272, maximum: 0.7 };
const xPosition = (count: number) => graph.left + count / 2000 * (graph.right - graph.left);
const yPosition = (chance: number) => graph.bottom - chance / graph.maximum * (graph.bottom - graph.top);

export function CumulativeCurve() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 328" role="img" aria-labelledby="curve-title curve-description" className="probability-svg">
    <title id="curve-title">Chance of at least one success across zero to two thousand independent chests</title>
    <desc id="curve-description">{`Four hypothetical per-chest rates on a linear percentage scale. At 2,000 chests: ${probabilityScenarios.map(scenario => `${scenario.label} gives ${formatProbability(atLeastOneProbability(1 / scenario.denominator, 2000))}`).join('; ')}. The middle two rates are illustrations, not game reports.`}</desc>
    <rect width="680" height="328" rx="6" fill="#101c16" />
    {[0, 10, 20, 30, 40, 50, 60, 70].map(percent => <g key={percent}><line x1={graph.left} x2={graph.right} y1={yPosition(percent / 100)} y2={yPosition(percent / 100)} stroke="#2c3a2e" /><text x="52" y={yPosition(percent / 100) + 4} textAnchor="end" fill="#adbba5" fontSize="11" fontFamily="Arial, sans-serif">{percent}%</text></g>)}
    {[0, 500, 1000, 1500, 2000].map(count => <g key={count}><line x1={xPosition(count)} x2={xPosition(count)} y1={graph.top} y2={graph.bottom} stroke="#233025" strokeDasharray="3 5" /><text x={xPosition(count)} y="294" textAnchor="middle" fill="#adbba5" fontSize="11" fontFamily="Arial, sans-serif">{count.toLocaleString('en-US')}</text></g>)}
    {probabilityScenarios.map((scenario, index) => {
      const samples = Array.from({ length: 81 }, (_, sample) => {
        const count = sample * 25;
        return `${sample === 0 ? 'M' : 'L'}${xPosition(count).toFixed(2)},${yPosition(atLeastOneProbability(1 / scenario.denominator, count)).toFixed(2)}`;
      }).join(' ');
      return <g key={scenario.denominator}><path d={samples} fill="none" stroke={scenario.color} strokeWidth="2.4" strokeDasharray={scenario.dash} /><circle cx={graph.right} cy={yPosition(atLeastOneProbability(1 / scenario.denominator, 2000))} r="3" fill={scenario.color}><title>{`${String.fromCharCode(65 + index)}: ${scenario.label}`}</title></circle></g>;
    })}
    <text x="355" y="318" textAnchor="middle" fill="#adbba5" fontSize="11" fontFamily="Arial, sans-serif">Chest openings (independent attempts)</text>
  </svg>;
}

export function OddsComparison() {
  const width = 396;
  const ratio = 700000 / 2000;
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 214" role="img" aria-labelledby="ratio-title ratio-description" className="probability-svg">
    <title id="ratio-title">The two reported per-chest assumptions differ by 350 times</title>
    <desc id="ratio-description">The 1 in 2,000 assumption is 350 times the 1 in 700,000 assumption per chest. The bar lengths share a linear scale. Both rates are unconfirmed; this is not a comparison of measured game outcomes.</desc>
    <rect width="680" height="214" rx="6" fill="#101c16" />
    <g fontFamily="Arial, sans-serif" fontSize="13" fill="#f0f0e6">
      <text x="20" y="43">1 in 700,000</text><text x="20" y="62" fontSize="11" fill="#adbba5">0.000142857…%</text>
      <rect x="172" y="30" width={width / ratio} height="36" fill="#d1f378" /><text x="580" y="53">1×</text>
      <text x="20" y="119">1 in 2,000</text><text x="20" y="138" fontSize="11" fill="#adbba5">0.05%</text>
      <rect x="172" y="106" width={width} height="36" fill="#e7c27e" /><text x="580" y="129">350×</text>
      <text x="20" y="184" fill="#adbba5" fontSize="12">Relative per-chest probability · shared linear scale · both unconfirmed</text>
    </g>
  </svg>;
}

export default function ProbabilityCharts() {
  return <>
    <figure className="data-figure"><figcaption><h3>How cumulative probability changes</h3><p>Four assumptions, the same number of attempts. Solid lines are reported estimates; dashed lines are illustrative scenarios only.</p></figcaption>
      <div className="chart-scroll" tabIndex={0} role="region" aria-label="Cumulative probability chart"><CumulativeCurve /></div>
      <ul className="chart-legend">{probabilityScenarios.map((scenario, index) => <li key={scenario.denominator}><span className="legend-line" style={{ borderColor: scenario.color, borderTopStyle: scenario.dash ? 'dashed' : 'solid' }} aria-hidden="true" /><span><strong>{String.fromCharCode(65 + index)} / {scenario.label}</strong><small>{scenario.status}</small></span></li>)}</ul>
      <p className="source-note">The vertical axis is linear, so the smallest rates stay close to zero. The table below preserves the exact calculated differences. No line is a verified chest-type rate.</p>
    </figure>
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Cumulative probability values"><table className="odds-table probability-table"><caption>Same scenarios and formula as the curve; percentage chance of at least one success</caption><thead><tr><th scope="col">Chests</th>{probabilityScenarios.map((scenario, index) => <th scope="col" key={scenario.denominator}>{String.fromCharCode(65 + index)} / {scenario.label}<small>{scenario.status}</small></th>)}</tr></thead><tbody>{probabilityTableRows().map(row => <tr key={row.trials}><th scope="row">{row.trials.toLocaleString('en-US')}</th>{row.probabilities.map((chance, index) => <td key={probabilityScenarios[index].denominator}>{formatProbability(chance)}</td>)}</tr>)}</tbody></table></div>
    <figure className="data-figure"><figcaption><h3>Where the 350× difference comes from</h3><p>Divide the two assumed per-chest probabilities: <code>(1 / 2,000) ÷ (1 / 700,000) = 350</code>.</p></figcaption><div className="chart-scroll" tabIndex={0} role="region" aria-label="Per-chest probability ratio chart"><OddsComparison /></div><p className="source-note">The ratio applies to the per-chest assumptions. Cumulative probabilities are not 350× apart at every chest count, and these claims do not bound the real drop rate.</p></figure>
  </>;
}

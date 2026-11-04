/** Probability of at least one success, assuming independent, fixed-chance trials. */
export function atLeastOneProbability(chance: number, trials: number): number {
  if (!Number.isFinite(chance) || chance < 0 || chance > 1) {
    throw new RangeError('Chance must be a finite number between 0 and 1.');
  }
  if (!Number.isSafeInteger(trials) || trials < 0) {
    throw new RangeError('Trials must be a non-negative safe integer.');
  }
  if (trials === 0 || chance === 0) return 0;
  if (chance === 1) return 1;
  return -Math.expm1(trials * Math.log1p(-chance));
}

export function parseTrialInput(value: string, maximum: number, minimum = 1): number | null {
  if (!/^\d+$/.test(value.trim())) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= minimum && parsed <= maximum
    ? parsed
    : null;
}

/** Percentage input is intentionally bounded so expectations remain finite and readable. */
export function parseChancePercent(value: string): number | null {
  const trimmed = value.trim();
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(trimmed)) return null;
  const percentage = Number(trimmed);
  return Number.isFinite(percentage) && percentage >= 0.000000001 && percentage <= 100
    ? percentage / 100
    : null;
}

/** A geometric distribution is memoryless: prior failures do not reduce this mean. */
export function expectedAdditionalTrials(chance: number): number {
  if (!Number.isFinite(chance) || chance <= 0 || chance > 1 || !Number.isFinite(1 / chance)) {
    throw new RangeError('Chance must be positive, at most 1, and have a finite reciprocal.');
  }
  return 1 / chance;
}

export const probabilityScenarios = [
  { denominator: 700000, label: '1 in 700,000', status: 'Reported, unconfirmed', color: '#d1f378', dash: undefined },
  { denominator: 100000, label: '1 in 100,000', status: 'Illustrative only', color: '#a9a1f0', dash: '3 5' },
  { denominator: 10000, label: '1 in 10,000', status: 'Illustrative only', color: '#7cdbca', dash: '8 5' },
  { denominator: 2000, label: '1 in 2,000', status: 'Reported, unconfirmed', color: '#e7c27e', dash: undefined },
] as const;

export const probabilityTableCounts = [0, 100, 500, 1000, 1500, 2000] as const;

export function probabilityTableRows() {
  return probabilityTableCounts.map((trials) => ({
    trials,
    probabilities: probabilityScenarios.map((scenario) => atLeastOneProbability(1 / scenario.denominator, trials)),
  }));
}

/** Avoid suggesting certainty when a rounded floating-point result approaches 100%. */
export function formatProbability(probability: number): string {
  if (!Number.isFinite(probability) || probability < 0 || probability > 1) {
    throw new RangeError('Probability must be a finite number between 0 and 1.');
  }
  const percentage = probability * 100;
  if (percentage > 99.9999) return '>99.9999%';
  if (percentage > 0 && percentage < 0.0001) return '<0.0001%';
  return `${percentage.toFixed(4)}%`;
}

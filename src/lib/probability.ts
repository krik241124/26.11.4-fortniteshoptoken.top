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

export function parseTrialInput(value: string, maximum: number): number | null {
  if (!/^\d+$/.test(value.trim())) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 1 && parsed <= maximum
    ? parsed
    : null;
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

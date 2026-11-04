const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Use the existing TypeScript dependency, with no extra testing framework.
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, filename);
const lib = path.resolve(__dirname, '../src/lib');
const p = require(path.join(lib, 'probability.ts'));
const d = require(path.join(lib, 'event-config.ts'));
const a = require(path.join(lib, 'activation.ts'));
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} differs from ${expected}`);

near(p.atLeastOneProbability(0.5, 2), 0.75);
near(p.atLeastOneProbability(1 / 2000, 2000), 0.6322125478540299);
assert.equal(p.atLeastOneProbability(0.5, 0), 0);
assert.equal(p.atLeastOneProbability(0, 2000), 0);
assert.equal(p.atLeastOneProbability(1, 1), 1);
assert.equal(p.expectedAdditionalTrials(1 / 2000), 2000);
assert.equal(p.expectedAdditionalTrials(1 / 700000), 700000);
assert.throws(() => p.expectedAdditionalTrials(0), RangeError);
assert.throws(() => p.atLeastOneProbability(NaN, 10), RangeError);
assert.throws(() => p.atLeastOneProbability(0.1, -1), RangeError);
assert.throws(() => p.atLeastOneProbability(0.1, 1.5), RangeError);
assert.equal(p.parseChancePercent('0.05'), 0.0005);
for (const value of ['', '-1', '0', '101', 'NaN', 'Infinity']) assert.equal(p.parseChancePercent(value), null);
for (const value of ['', '-1', '1.5', '1001', 'Infinity']) assert.equal(p.parseTrialInput(value, 1000, 0), null);
assert.equal(p.parseTrialInput('0', 1000, 0), 0);
assert.equal(p.formatProbability(0.0000000001), '<0.0001%');
assert.equal(p.formatProbability(0.999999999), '>99.9999%');

assert.equal(d.calendarDayDifference('2026-11-04', '2026-12-05'), 31);
assert.equal(d.calendarDayDifference('2026-12-05', '2026-12-05'), 0);
assert.equal(d.calendarDayDifference('2026-12-31', '2027-01-01'), 1);
assert.equal(d.calendarDayDifference('2028-02-28', '2028-03-01'), 2);
assert.equal(d.calendarDayDifference('2026-02-30', '2026-03-01'), null);
assert.equal(a.parseUtcDateTime('2026-11-04T24:01'), null);
assert.equal(a.planActivation('2026-10-31', '2026-11-04T12:00').window, null);
assert.equal(a.planActivation('2026-11-04', '2026-11-03T23:59').window, null);
assert.equal(a.planActivation('2026-11-04', '2026-12-16T00:00').window, null);
const last = a.planActivation('2026-11-04', '2026-12-15T23:59').window;
assert.equal(new Date(last.end).toISOString(), '2026-12-29T23:59:00.000Z');
const yearCrossing = a.calculateAccessWindow(Date.parse('2026-12-25T12:00:00Z'));
assert.equal(new Date(yearCrossing.end).toISOString(), '2027-01-08T12:00:00.000Z');
assert.equal(yearCrossing.end - yearCrossing.start, 336 * 60 * 60 * 1000);
const clockChange = a.calculateAccessWindow(Date.parse('2026-03-01T12:00:00Z'));
assert.equal(new Date(clockChange.end).toISOString(), '2026-03-15T12:00:00.000Z');
console.log('Tool checks passed: probability, inputs, expectations, calendar boundaries and exact UTC windows.');

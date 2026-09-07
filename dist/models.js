'use strict';
// Deterministic teaching models. These functions do not parse or execute HDL.
window.IC_MODELS = Object.freeze({
  nextCounter(value, en, rst_n, width = 4) {
    if (!Number.isInteger(width) || width < 1 || width > 16) throw new RangeError('Unsupported teaching width');
    if (!rst_n) return 0;
    return en ? (value + 1) % (2 ** width) : value;
  },
  pipeline(a, d) { return {a: d, b: a}; },
  nextFSM(state, start, finish) {
    if (state === 'IDLE') return start ? 'RUN' : 'IDLE';
    if (state === 'RUN') return finish ? 'DONE' : 'RUN';
    return 'IDLE';
  },
  setupSlack(period) { return Math.round((period - 0.7 - 7.8) * 1e8) / 1e8; }
});

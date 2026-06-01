const { isValidLogLevel, normalizePagination } = require('../src');

describe('shared helpers', () => {
  it('validates levels', () => {
    expect(isValidLogLevel('INFO')).toBe(true);
    expect(isValidLogLevel('TRACE')).toBe(false);
  });

  it('normalizes pagination', () => {
    const result = normalizePagination({ page: 2, limit: 10 });
    expect(result.skip).toBe(10);
  });
});

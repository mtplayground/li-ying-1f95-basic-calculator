import { describe, expect, it } from 'vitest';
import { createInitialCalculatorState } from '.';

describe('engine unit test runner', () => {
  it('runs without a DOM environment', () => {
    expect('document' in globalThis).toBe(false);
  });

  it('loads the pure engine state model', () => {
    expect(createInitialCalculatorState()).toEqual({
      currentEntry: '0',
      storedOperand: null,
      pendingOperator: null,
      isResultCommitted: false,
      error: null,
    });
  });
});

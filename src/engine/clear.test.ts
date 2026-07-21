import { describe, expect, it } from 'vitest';
import { applyCalculatorAction, createInitialCalculatorState } from '.';
import type { CalculatorState } from './types';

function expectClearResets(state: CalculatorState): void {
  expect(applyCalculatorAction(state, { type: 'clear' })).toEqual(
    createInitialCalculatorState(),
  );
}

describe('calculator clear behavior', () => {
  it('resets an active entry to the initial state', () => {
    expectClearResets({
      currentEntry: '123',
      storedOperand: null,
      pendingOperator: null,
      isResultCommitted: false,
      error: null,
    });
  });

  it('resets a pending operation to the initial state', () => {
    expectClearResets({
      currentEntry: '4',
      storedOperand: 9,
      pendingOperator: 'multiply',
      isResultCommitted: false,
      error: null,
    });
  });

  it('resets a committed result to the initial state', () => {
    expectClearResets({
      currentEntry: '42',
      storedOperand: null,
      pendingOperator: null,
      isResultCommitted: true,
      error: null,
    });
  });

  it('resets an error state to the initial state', () => {
    expectClearResets({
      currentEntry: 'Error',
      storedOperand: null,
      pendingOperator: null,
      isResultCommitted: true,
      error: 'division-by-zero',
    });
  });
});

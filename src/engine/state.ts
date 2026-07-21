import type { CalculatorState } from './types';

const baseInitialState: CalculatorState = {
  currentEntry: '0',
  storedOperand: null,
  pendingOperator: null,
  isResultCommitted: false,
  error: null,
};

export const initialCalculatorState: Readonly<CalculatorState> =
  Object.freeze(baseInitialState);

export function createInitialCalculatorState(): CalculatorState {
  return { ...baseInitialState };
}

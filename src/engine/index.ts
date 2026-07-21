import type { CalculatorState } from './types';

export { applyCalculatorAction, enterDecimalPoint, enterDigit } from './entry';
export {
  calculate,
  evaluatePendingOperation,
  selectOperator,
} from './operations';
export type {
  CalculatorAction,
  CalculatorState,
  Digit,
  Operator,
} from './types';

const baseInitialState: CalculatorState = {
  currentEntry: '0',
  storedOperand: null,
  pendingOperator: null,
  isResultCommitted: false,
};

export const initialCalculatorState: Readonly<CalculatorState> =
  Object.freeze(baseInitialState);

export function createInitialCalculatorState(): CalculatorState {
  return { ...baseInitialState };
}

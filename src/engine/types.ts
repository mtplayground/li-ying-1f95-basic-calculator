export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Operator = 'add' | 'subtract' | 'multiply' | 'divide';

export interface CalculatorState {
  currentEntry: string;
  storedOperand: number | null;
  pendingOperator: Operator | null;
  isResultCommitted: boolean;
}

export type CalculatorAction =
  | { type: 'digit'; digit: Digit }
  | { type: 'decimal' }
  | { type: 'operator'; operator: Operator }
  | { type: 'equals' }
  | { type: 'clear' };

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Operator = 'add' | 'subtract' | 'multiply' | 'divide';

export type CalculatorError = 'division-by-zero' | 'invalid-number';

export interface CalculatorState {
  currentEntry: string;
  storedOperand: number | null;
  pendingOperator: Operator | null;
  isResultCommitted: boolean;
  error: CalculatorError | null;
}

export type CalculationResult =
  { status: 'ok'; value: number } | { status: 'error'; error: CalculatorError };

export type CalculatorAction =
  | { type: 'digit'; digit: Digit }
  | { type: 'decimal' }
  | { type: 'operator'; operator: Operator }
  | { type: 'equals' }
  | { type: 'clear' }
  | { type: 'backspace' };

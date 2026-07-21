import type { CalculatorState, Operator } from './types';

export function calculate(
  leftOperand: number,
  rightOperand: number,
  operator: Operator,
): number {
  switch (operator) {
    case 'add':
      return leftOperand + rightOperand;
    case 'subtract':
      return leftOperand - rightOperand;
    case 'multiply':
      return leftOperand * rightOperand;
    case 'divide':
      return leftOperand / rightOperand;
  }
}

function toEntryValue(value: number): string {
  return String(value);
}

export function selectOperator(
  state: CalculatorState,
  operator: Operator,
): CalculatorState {
  const currentOperand = Number(state.currentEntry);

  if (state.pendingOperator === null || state.storedOperand === null) {
    return {
      ...state,
      storedOperand: currentOperand,
      pendingOperator: operator,
      isResultCommitted: true,
    };
  }

  if (state.isResultCommitted) {
    return {
      ...state,
      pendingOperator: operator,
    };
  }

  const result = calculate(
    state.storedOperand,
    currentOperand,
    state.pendingOperator,
  );

  return {
    currentEntry: toEntryValue(result),
    storedOperand: result,
    pendingOperator: operator,
    isResultCommitted: true,
  };
}

export function evaluatePendingOperation(
  state: CalculatorState,
): CalculatorState {
  if (
    state.pendingOperator === null ||
    state.storedOperand === null ||
    state.isResultCommitted
  ) {
    return state;
  }

  const result = calculate(
    state.storedOperand,
    Number(state.currentEntry),
    state.pendingOperator,
  );

  return {
    currentEntry: toEntryValue(result),
    storedOperand: null,
    pendingOperator: null,
    isResultCommitted: true,
  };
}

import type {
  CalculationResult,
  CalculatorError,
  CalculatorState,
  Operator,
} from './types';

const RESULT_PRECISION = 12;

function normalizeFiniteResult(value: number): CalculationResult {
  if (!Number.isFinite(value)) {
    return { status: 'error', error: 'invalid-number' };
  }

  const normalizedValue = Number(value.toPrecision(RESULT_PRECISION));

  return {
    status: 'ok',
    value: Object.is(normalizedValue, -0) ? 0 : normalizedValue,
  };
}

export function calculate(
  leftOperand: number,
  rightOperand: number,
  operator: Operator,
): CalculationResult {
  switch (operator) {
    case 'add':
      return normalizeFiniteResult(leftOperand + rightOperand);
    case 'subtract':
      return normalizeFiniteResult(leftOperand - rightOperand);
    case 'multiply':
      return normalizeFiniteResult(leftOperand * rightOperand);
    case 'divide':
      if (rightOperand === 0) {
        return { status: 'error', error: 'division-by-zero' };
      }

      return normalizeFiniteResult(leftOperand / rightOperand);
  }
}

function toEntryValue(value: number): string {
  return String(value);
}

function toErrorState(error: CalculatorError): CalculatorState {
  return {
    currentEntry: 'Error',
    storedOperand: null,
    pendingOperator: null,
    isResultCommitted: true,
    error,
  };
}

export function selectOperator(
  state: CalculatorState,
  operator: Operator,
): CalculatorState {
  if (state.error !== null) {
    return state;
  }

  const currentOperand = Number(state.currentEntry);

  if (state.pendingOperator === null || state.storedOperand === null) {
    return {
      ...state,
      storedOperand: currentOperand,
      pendingOperator: operator,
      isResultCommitted: true,
      error: null,
    };
  }

  if (state.isResultCommitted) {
    return {
      ...state,
      pendingOperator: operator,
    };
  }

  const calculation = calculate(
    state.storedOperand,
    currentOperand,
    state.pendingOperator,
  );

  if (calculation.status === 'error') {
    return toErrorState(calculation.error);
  }

  return {
    currentEntry: toEntryValue(calculation.value),
    storedOperand: calculation.value,
    pendingOperator: operator,
    isResultCommitted: true,
    error: null,
  };
}

export function evaluatePendingOperation(
  state: CalculatorState,
): CalculatorState {
  if (
    state.error !== null ||
    state.pendingOperator === null ||
    state.storedOperand === null ||
    state.isResultCommitted
  ) {
    return state;
  }

  const calculation = calculate(
    state.storedOperand,
    Number(state.currentEntry),
    state.pendingOperator,
  );

  if (calculation.status === 'error') {
    return toErrorState(calculation.error);
  }

  return {
    currentEntry: toEntryValue(calculation.value),
    storedOperand: null,
    pendingOperator: null,
    isResultCommitted: true,
    error: null,
  };
}

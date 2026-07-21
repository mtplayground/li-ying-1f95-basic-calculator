import type { CalculatorAction, CalculatorState, Digit } from './types';
import { evaluatePendingOperation, selectOperator } from './operations';
import { createInitialCalculatorState } from './state';

function resetCommittedResult(state: CalculatorState): CalculatorState {
  if (state.error !== null) {
    return state;
  }

  if (!state.isResultCommitted) {
    return state;
  }

  if (state.pendingOperator !== null && state.storedOperand !== null) {
    return {
      ...state,
      isResultCommitted: false,
    };
  }

  return {
    ...state,
    storedOperand: null,
    pendingOperator: null,
    isResultCommitted: false,
  };
}

export function enterDigit(
  state: CalculatorState,
  digit: Digit,
): CalculatorState {
  if (state.error !== null) {
    return state;
  }

  const editableState = resetCommittedResult(state);
  const shouldReplaceEntry =
    state.isResultCommitted || editableState.currentEntry === '0';
  const currentEntry = shouldReplaceEntry
    ? digit
    : `${editableState.currentEntry}${digit}`;

  if (
    currentEntry === state.currentEntry &&
    editableState.isResultCommitted === state.isResultCommitted
  ) {
    return state;
  }

  return {
    ...editableState,
    currentEntry,
  };
}

export function enterDecimalPoint(state: CalculatorState): CalculatorState {
  if (state.error !== null) {
    return state;
  }

  if (state.isResultCommitted) {
    return {
      ...resetCommittedResult(state),
      currentEntry: '0.',
    };
  }

  if (state.currentEntry.includes('.')) {
    return state;
  }

  return {
    ...state,
    currentEntry: `${state.currentEntry}.`,
  };
}

export function applyCalculatorAction(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case 'digit':
      return enterDigit(state, action.digit);
    case 'decimal':
      return enterDecimalPoint(state);
    case 'operator':
      return selectOperator(state, action.operator);
    case 'equals':
      return evaluatePendingOperation(state);
    case 'clear':
      return createInitialCalculatorState();
  }
}

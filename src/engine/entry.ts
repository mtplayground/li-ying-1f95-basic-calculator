import type { CalculatorAction, CalculatorState, Digit } from './types';

function resetCommittedResult(state: CalculatorState): CalculatorState {
  if (!state.isResultCommitted) {
    return state;
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
    case 'equals':
    case 'clear':
      return state;
  }
}

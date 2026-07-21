import { useCallback, useMemo, useState } from 'react';

import {
  applyCalculatorAction,
  createInitialCalculatorState,
  formatDisplay,
  type CalculatorAction,
  type CalculatorState,
} from '../engine';

export interface UseCalculatorResult {
  state: CalculatorState;
  displayValue: string;
  isError: boolean;
  dispatch: (action: CalculatorAction) => void;
}

export function useCalculator(): UseCalculatorResult {
  const [state, setState] = useState<CalculatorState>(() =>
    createInitialCalculatorState(),
  );

  const dispatch = useCallback((action: CalculatorAction) => {
    setState((currentState) => applyCalculatorAction(currentState, action));
  }, []);

  const displayValue = useMemo(() => formatDisplay(state), [state]);

  return {
    state,
    displayValue,
    isError: state.error !== null,
    dispatch,
  };
}

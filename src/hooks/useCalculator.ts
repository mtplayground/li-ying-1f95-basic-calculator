import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  applyCalculatorAction,
  createInitialCalculatorState,
  formatDisplay,
  type CalculatorAction,
  type CalculatorState,
} from '../engine';

const PRESS_FEEDBACK_MS = 120;

export interface UseCalculatorResult {
  state: CalculatorState;
  displayValue: string;
  isError: boolean;
  activeAction: CalculatorAction | null;
  dispatch: (action: CalculatorAction) => void;
}

function canShowPressFeedback(action: CalculatorAction): boolean {
  return action.type !== 'backspace';
}

export function useCalculator(): UseCalculatorResult {
  const [state, setState] = useState<CalculatorState>(() =>
    createInitialCalculatorState(),
  );
  const [activeAction, setActiveAction] = useState<CalculatorAction | null>(
    null,
  );
  const feedbackTimeoutRef = useRef<number | null>(null);

  const clearFeedbackTimer = useCallback(() => {
    if (feedbackTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = null;
  }, []);

  const showPressFeedback = useCallback(
    (action: CalculatorAction) => {
      clearFeedbackTimer();

      if (!canShowPressFeedback(action)) {
        setActiveAction(null);
        return;
      }

      setActiveAction(action);
      feedbackTimeoutRef.current = window.setTimeout(() => {
        setActiveAction(null);
        feedbackTimeoutRef.current = null;
      }, PRESS_FEEDBACK_MS);
    },
    [clearFeedbackTimer],
  );

  const dispatch = useCallback(
    (action: CalculatorAction) => {
      showPressFeedback(action);
      setState((currentState) => applyCalculatorAction(currentState, action));
    },
    [showPressFeedback],
  );

  useEffect(() => clearFeedbackTimer, [clearFeedbackTimer]);

  const displayValue = useMemo(() => formatDisplay(state), [state]);

  return {
    state,
    displayValue,
    isError: state.error !== null,
    activeAction,
    dispatch,
  };
}

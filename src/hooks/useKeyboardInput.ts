import { useEffect } from 'react';

import type { CalculatorAction, Digit } from '../engine';

export type CalculatorDispatch = (action: CalculatorAction) => void;

function isDigitKey(key: string): key is Digit {
  return /^[0-9]$/.test(key);
}

function hasBrowserShortcutModifier(event: KeyboardEvent): boolean {
  return event.altKey || event.ctrlKey || event.metaKey;
}

export function actionFromKeyboardEvent(
  event: KeyboardEvent,
): CalculatorAction | null {
  if (hasBrowserShortcutModifier(event)) {
    return null;
  }

  if (isDigitKey(event.key)) {
    return { type: 'digit', digit: event.key };
  }

  switch (event.key) {
    case '.':
      return { type: 'decimal' };
    case '+':
      return { type: 'operator', operator: 'add' };
    case '-':
      return { type: 'operator', operator: 'subtract' };
    case '*':
      return { type: 'operator', operator: 'multiply' };
    case '/':
      return { type: 'operator', operator: 'divide' };
    case 'Enter':
    case '=':
      return { type: 'equals' };
    case 'Escape':
      return { type: 'clear' };
    case 'Backspace':
      return { type: 'backspace' };
    default:
      return null;
  }
}

export function useKeyboardInput(dispatch: CalculatorDispatch): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const action = actionFromKeyboardEvent(event);

      if (action === null) {
        return;
      }

      event.preventDefault();
      dispatch(action);
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);
}

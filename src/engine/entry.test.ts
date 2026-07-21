import { describe, expect, it } from 'vitest';
import {
  applyCalculatorAction,
  createInitialCalculatorState,
  enterDecimalPoint,
  enterDigit,
} from '.';
import type { CalculatorAction, CalculatorState, Digit } from './types';

function digit(value: Digit): CalculatorAction {
  return { type: 'digit', digit: value };
}

describe('calculator entry behavior', () => {
  it('accumulates consecutive digit entries', () => {
    const digits: Digit[] = ['1', '2', '3'];
    const state = digits.reduce(
      (nextState, nextDigit) => enterDigit(nextState, nextDigit),
      createInitialCalculatorState(),
    );

    expect(state.currentEntry).toBe('123');
  });

  it('suppresses leading zeros before a non-zero digit', () => {
    const afterZero = enterDigit(createInitialCalculatorState(), '0');
    const afterDigit = enterDigit(afterZero, '8');

    expect(afterZero.currentEntry).toBe('0');
    expect(afterDigit.currentEntry).toBe('8');
  });

  it('keeps one zero before decimal fractions', () => {
    const withDecimal = enterDecimalPoint(createInitialCalculatorState());
    const withDigit = enterDigit(withDecimal, '5');

    expect(withDigit.currentEntry).toBe('0.5');
  });

  it('allows only one decimal point per entry', () => {
    const once = enterDecimalPoint(createInitialCalculatorState());
    const twice = enterDecimalPoint(once);

    expect(twice.currentEntry).toBe('0.');
    expect(twice).toBe(once);
  });

  it('starts a fresh entry when a digit follows a committed result', () => {
    const committedState: CalculatorState = {
      currentEntry: '42',
      storedOperand: null,
      pendingOperator: null,
      isResultCommitted: true,
    };

    expect(enterDigit(committedState, '7')).toEqual({
      currentEntry: '7',
      storedOperand: null,
      pendingOperator: null,
      isResultCommitted: false,
    });
  });

  it('starts a fresh decimal entry after a committed result', () => {
    const committedState: CalculatorState = {
      currentEntry: '42',
      storedOperand: null,
      pendingOperator: null,
      isResultCommitted: true,
    };

    expect(enterDecimalPoint(committedState)).toEqual({
      currentEntry: '0.',
      storedOperand: null,
      pendingOperator: null,
      isResultCommitted: false,
    });
  });

  it('dispatches digit and decimal actions through the engine module', () => {
    const actions: CalculatorAction[] = [
      digit('9'),
      { type: 'decimal' },
      digit('4'),
    ];
    const state = actions.reduce(
      (nextState, action) => applyCalculatorAction(nextState, action),
      createInitialCalculatorState(),
    );

    expect(state.currentEntry).toBe('9.4');
  });

  it('preserves the pending operation when entering a right operand', () => {
    const pendingState: CalculatorState = {
      currentEntry: '8',
      storedOperand: 8,
      pendingOperator: 'add',
      isResultCommitted: true,
    };

    expect(enterDigit(pendingState, '3')).toEqual({
      currentEntry: '3',
      storedOperand: 8,
      pendingOperator: 'add',
      isResultCommitted: false,
    });
  });
});

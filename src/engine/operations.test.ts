import { describe, expect, it } from 'vitest';
import {
  applyCalculatorAction,
  calculate,
  createInitialCalculatorState,
} from '.';
import type {
  CalculatorAction,
  CalculatorState,
  Digit,
  Operator,
} from './types';

function digit(value: Digit): CalculatorAction {
  return { type: 'digit', digit: value };
}

function operator(value: Operator): CalculatorAction {
  return { type: 'operator', operator: value };
}

function runActions(actions: CalculatorAction[]): CalculatorState {
  return actions.reduce(
    (state, action) => applyCalculatorAction(state, action),
    createInitialCalculatorState(),
  );
}

describe('calculator arithmetic operations', () => {
  it('calculates the four arithmetic operations', () => {
    expect(calculate(8, 4, 'add')).toBe(12);
    expect(calculate(8, 4, 'subtract')).toBe(4);
    expect(calculate(8, 4, 'multiply')).toBe(32);
    expect(calculate(8, 4, 'divide')).toBe(2);
  });

  it('stores the left operand when an operator is selected', () => {
    const state = runActions([digit('8'), operator('add')]);

    expect(state).toEqual({
      currentEntry: '8',
      storedOperand: 8,
      pendingOperator: 'add',
      isResultCommitted: true,
    });
  });

  it('evaluates a pending operation with equals', () => {
    const state = runActions([
      digit('8'),
      operator('add'),
      digit('4'),
      { type: 'equals' },
    ]);

    expect(state).toEqual({
      currentEntry: '12',
      storedOperand: null,
      pendingOperator: null,
      isResultCommitted: true,
    });
  });

  it('commits a pending operation when another operator is pressed', () => {
    const state = runActions([
      digit('2'),
      operator('add'),
      digit('3'),
      operator('multiply'),
      digit('4'),
      { type: 'equals' },
    ]);

    expect(state.currentEntry).toBe('20');
  });

  it('allows changing the pending operator before entering the next operand', () => {
    const state = runActions([
      digit('8'),
      operator('add'),
      operator('subtract'),
      digit('3'),
      { type: 'equals' },
    ]);

    expect(state.currentEntry).toBe('5');
  });

  it('does not re-apply the last operation when equals is pressed repeatedly', () => {
    const once = runActions([
      digit('5'),
      operator('add'),
      digit('2'),
      { type: 'equals' },
    ]);
    const twice = applyCalculatorAction(once, { type: 'equals' });

    expect(once.currentEntry).toBe('7');
    expect(twice).toBe(once);
  });
});

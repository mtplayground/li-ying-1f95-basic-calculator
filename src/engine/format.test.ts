import { describe, expect, it } from 'vitest';
import { createInitialCalculatorState, formatDisplay } from '.';
import type { CalculatorState } from './types';

function stateWithEntry(entry: string, committed = false): CalculatorState {
  return {
    ...createInitialCalculatorState(),
    currentEntry: entry,
    isResultCommitted: committed,
  };
}

describe('calculator display formatting', () => {
  it('formats the initial zero state', () => {
    expect(formatDisplay(createInitialCalculatorState())).toBe('0');
  });

  it('preserves a trailing decimal point while editing', () => {
    expect(formatDisplay(stateWithEntry('12.'))).toBe('12.');
  });

  it('caps long integer output with compact notation', () => {
    const display = formatDisplay(stateWithEntry('123456789012345'));

    expect(display).toContain('e');
    expect(display.length).toBeLessThanOrEqual(12);
  });

  it('uses compact notation for very large magnitudes', () => {
    expect(formatDisplay(stateWithEntry('1000000000000'))).toBe('1e12');
  });

  it('uses compact notation for very small magnitudes', () => {
    expect(formatDisplay(stateWithEntry('0.000000123'))).toBe('1.23e-7');
  });

  it('keeps normal decimal output when it fits', () => {
    expect(formatDisplay(stateWithEntry('12345.67', true))).toBe('12345.67');
  });

  it('renders division by zero as readable text', () => {
    expect(
      formatDisplay({
        currentEntry: 'Error',
        storedOperand: null,
        pendingOperator: null,
        isResultCommitted: true,
        error: 'division-by-zero',
      }),
    ).toBe('Cannot divide by zero');
  });

  it('renders invalid numeric state as readable text', () => {
    expect(formatDisplay(stateWithEntry('Infinity', true))).toBe(
      'Number error',
    );
  });
});

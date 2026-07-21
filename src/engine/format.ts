import type { CalculatorError, CalculatorState } from './types';

const DEFAULT_MAX_DISPLAY_LENGTH = 12;
const COMPACT_UPPER_BOUND = 1e12;
const COMPACT_LOWER_BOUND = 1e-6;

const ERROR_MESSAGES: Record<CalculatorError, string> = {
  'division-by-zero': 'Cannot divide by zero',
  'invalid-number': 'Number error',
};

export interface DisplayFormatOptions {
  maxLength?: number;
}

function removeRedundantExponentParts(value: string): string {
  return value
    .replace(/(\.\d*?)0+e/, '$1e')
    .replace(/\.e/, 'e')
    .replace('e+', 'e');
}

function toCompactDisplay(value: number, maxLength: number): string {
  for (
    let precision = Math.max(1, maxLength - 7);
    precision >= 1;
    precision -= 1
  ) {
    const candidate = removeRedundantExponentParts(
      value.toExponential(precision),
    );

    if (candidate.length <= maxLength) {
      return candidate;
    }
  }

  return removeRedundantExponentParts(value.toExponential(1));
}

function shouldUseCompactDisplay(
  entry: string,
  value: number,
  maxLength: number,
) {
  const magnitude = Math.abs(value);

  return (
    entry.length > maxLength ||
    magnitude >= COMPACT_UPPER_BOUND ||
    (magnitude > 0 && magnitude < COMPACT_LOWER_BOUND)
  );
}

export function formatDisplay(
  state: CalculatorState,
  options: DisplayFormatOptions = {},
): string {
  if (state.error !== null) {
    return ERROR_MESSAGES[state.error];
  }

  const maxLength = options.maxLength ?? DEFAULT_MAX_DISPLAY_LENGTH;
  const entry = state.currentEntry;

  if (entry.endsWith('.') && !state.isResultCommitted) {
    return entry.length <= maxLength
      ? entry
      : toCompactDisplay(Number(entry), maxLength);
  }

  if (entry.length <= maxLength) {
    const value = Number(entry);

    if (!Number.isFinite(value)) {
      return ERROR_MESSAGES['invalid-number'];
    }

    if (!shouldUseCompactDisplay(entry, value, maxLength)) {
      return entry;
    }
  }

  const value = Number(entry);

  if (!Number.isFinite(value)) {
    return ERROR_MESSAGES['invalid-number'];
  }

  return toCompactDisplay(value, maxLength);
}

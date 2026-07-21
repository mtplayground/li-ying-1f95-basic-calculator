export interface DisplayProps {
  value: string;
  label?: string;
  isError?: boolean;
}

function getDisplayTextSize(value: string): string {
  if (value.length > 16) {
    return 'text-2xl';
  }

  if (value.length > 12) {
    return 'text-3xl';
  }

  if (value.length > 8) {
    return 'text-5xl';
  }

  return 'text-7xl';
}

export function Display({
  value,
  label = 'Calculator display',
  isError = false,
}: DisplayProps) {
  const textSize = isError ? 'text-2xl' : getDisplayTextSize(value);
  const textTone = isError ? 'text-button-clear-text' : 'text-ink';

  return (
    <section
      aria-label={label}
      className="calculator-display-token flex min-w-0 items-end justify-end overflow-hidden rounded-calculator"
    >
      <output
        aria-live="polite"
        className={[
          'block w-full overflow-hidden text-ellipsis whitespace-nowrap text-right',
          'font-display font-bold leading-none tracking-normal tabular-nums',
          textSize,
          textTone,
        ].join(' ')}
      >
        {value}
      </output>
    </section>
  );
}

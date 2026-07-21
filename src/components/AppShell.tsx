import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { Keypad } from './Keypad';

export function AppShell() {
  const { displayValue, dispatch, isError } = useCalculator();

  return (
    <main className="app-shell bg-canvas text-ink" aria-labelledby="app-title">
      <section className="calculator-stage max-w-calculator gap-8">
        <header className="app-header">
          <p className="app-kicker text-accent">React + TypeScript</p>
          <h1 className="app-title font-display text-display" id="app-title">
            Basic Calculator
          </h1>
        </header>
        <Display isError={isError} value={displayValue} />
        <Keypad onAction={dispatch} />
      </section>
    </main>
  );
}

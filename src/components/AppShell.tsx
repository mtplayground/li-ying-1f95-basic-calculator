import { useCalculator } from '../hooks/useCalculator';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { Display } from './Display';
import { Keypad } from './Keypad';

export function AppShell() {
  const { activeAction, displayValue, dispatch, isError } = useCalculator();
  useKeyboardInput(dispatch);

  return (
    <main className="app-shell bg-canvas text-ink" aria-labelledby="app-title">
      <section className="calculator-stage">
        <header className="app-header">
          <p className="app-kicker text-accent">React + TypeScript</p>
          <h1 className="app-title" id="app-title">
            Basic Calculator
          </h1>
        </header>
        <Display isError={isError} value={displayValue} />
        <Keypad activeAction={activeAction} onAction={dispatch} />
      </section>
    </main>
  );
}

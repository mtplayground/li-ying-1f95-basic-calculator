export function AppShell() {
  return (
    <main className="app-shell bg-canvas text-ink" aria-labelledby="app-title">
      <section className="calculator-stage max-w-calculator gap-8">
        <header className="app-header">
          <p className="app-kicker text-accent">React + TypeScript</p>
          <h1 className="app-title font-display text-display" id="app-title">
            Basic Calculator
          </h1>
        </header>
      </section>
    </main>
  );
}

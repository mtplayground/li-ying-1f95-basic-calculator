# li-ying-1f95-basic-calculator

A flat, high-contrast React and TypeScript basic calculator.

## Development

Install dependencies once:

```bash
npm install
```

Run the local Vite server on `0.0.0.0:8080`:

```bash
npm run dev
```

## Validation

Run the project checks:

```bash
npm run format:check
npm run lint
npm test
npm run test:e2e
npm run build
```

## Static Production Build

Create a static build in `dist/`:

```bash
npm run build
```

The Vite config uses a relative asset base (`./`), so `dist/index.html`
references JavaScript and CSS as `./assets/...`. That keeps the build portable
for self-hosting from a directory, a subdirectory, or a static file server
without rewriting asset paths.

Serve the generated directory with any static file server. For a quick local
check with Python:

```bash
python3 -m http.server 8080 --directory dist --bind 0.0.0.0
```

Then open `http://127.0.0.1:8080/` and verify the calculator loads, displays
`0`, and responds to button clicks or keyboard input.

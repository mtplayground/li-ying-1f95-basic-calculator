/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        ink: {
          DEFAULT: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
          inverse: 'var(--color-ink-inverse)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
          border: 'var(--color-surface-border)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          contrast: 'var(--color-accent-contrast)',
        },
        'button-digit': {
          DEFAULT: 'var(--color-button-digit)',
          text: 'var(--color-button-digit-text)',
          border: 'var(--color-button-digit-border)',
        },
        'button-operator': {
          DEFAULT: 'var(--color-button-operator)',
          text: 'var(--color-button-operator-text)',
          border: 'var(--color-button-operator-border)',
        },
        'button-clear': {
          DEFAULT: 'var(--color-button-clear)',
          text: 'var(--color-button-clear-text)',
          border: 'var(--color-button-clear-border)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        display: [
          '"SF Pro Display"',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        display: [
          'clamp(3.75rem, 15vw, 6.75rem)',
          { lineHeight: '0.9', fontWeight: '700' },
        ],
        keypad: ['1.375rem', { lineHeight: '1', fontWeight: '700' }],
      },
      spacing: {
        'calc-gap': '1rem',
        'calc-pad': '1.5rem',
        'display-block': '7rem',
        'key-size': '4.5rem',
      },
      maxWidth: {
        calculator: '26rem',
      },
      borderRadius: {
        calculator: '0.5rem',
        control: '0.375rem',
      },
    },
  },
  plugins: [],
};

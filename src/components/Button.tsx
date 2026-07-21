import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type CalculatorButtonVariant = 'digit' | 'operator' | 'clear';

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label'
> {
  accessibleLabel: string;
  variant: CalculatorButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<CalculatorButtonVariant, string> = {
  digit: 'calculator-button-token--digit',
  operator: 'calculator-button-token--operator',
  clear: 'calculator-button-token--clear',
};

export function Button({
  accessibleLabel,
  variant,
  children,
  className,
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      aria-label={accessibleLabel}
      className={[
        'calculator-button-token min-w-key-size select-none',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      type={type}
    >
      {children}
    </button>
  );
}

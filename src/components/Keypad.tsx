import type { CalculatorAction } from '../engine';
import { Button, type CalculatorButtonVariant } from './Button';

export interface KeypadProps {
  activeAction?: CalculatorAction | null;
  onAction?: (action: CalculatorAction) => void;
}

interface KeypadButtonDefinition {
  id: string;
  label: string;
  accessibleLabel: string;
  variant: CalculatorButtonVariant;
  action: CalculatorAction;
  className?: string;
}

const keypadButtons: KeypadButtonDefinition[] = [
  {
    id: 'clear',
    label: 'C',
    accessibleLabel: 'Clear',
    variant: 'clear',
    action: { type: 'clear' },
    className: 'col-span-3',
  },
  {
    id: 'divide',
    label: '/',
    accessibleLabel: 'Divide',
    variant: 'operator',
    action: { type: 'operator', operator: 'divide' },
  },
  {
    id: 'seven',
    label: '7',
    accessibleLabel: 'Seven',
    variant: 'digit',
    action: { type: 'digit', digit: '7' },
  },
  {
    id: 'eight',
    label: '8',
    accessibleLabel: 'Eight',
    variant: 'digit',
    action: { type: 'digit', digit: '8' },
  },
  {
    id: 'nine',
    label: '9',
    accessibleLabel: 'Nine',
    variant: 'digit',
    action: { type: 'digit', digit: '9' },
  },
  {
    id: 'multiply',
    label: '*',
    accessibleLabel: 'Multiply',
    variant: 'operator',
    action: { type: 'operator', operator: 'multiply' },
  },
  {
    id: 'four',
    label: '4',
    accessibleLabel: 'Four',
    variant: 'digit',
    action: { type: 'digit', digit: '4' },
  },
  {
    id: 'five',
    label: '5',
    accessibleLabel: 'Five',
    variant: 'digit',
    action: { type: 'digit', digit: '5' },
  },
  {
    id: 'six',
    label: '6',
    accessibleLabel: 'Six',
    variant: 'digit',
    action: { type: 'digit', digit: '6' },
  },
  {
    id: 'subtract',
    label: '-',
    accessibleLabel: 'Subtract',
    variant: 'operator',
    action: { type: 'operator', operator: 'subtract' },
  },
  {
    id: 'one',
    label: '1',
    accessibleLabel: 'One',
    variant: 'digit',
    action: { type: 'digit', digit: '1' },
  },
  {
    id: 'two',
    label: '2',
    accessibleLabel: 'Two',
    variant: 'digit',
    action: { type: 'digit', digit: '2' },
  },
  {
    id: 'three',
    label: '3',
    accessibleLabel: 'Three',
    variant: 'digit',
    action: { type: 'digit', digit: '3' },
  },
  {
    id: 'add',
    label: '+',
    accessibleLabel: 'Add',
    variant: 'operator',
    action: { type: 'operator', operator: 'add' },
  },
  {
    id: 'zero',
    label: '0',
    accessibleLabel: 'Zero',
    variant: 'digit',
    action: { type: 'digit', digit: '0' },
    className: 'col-span-2',
  },
  {
    id: 'decimal',
    label: '.',
    accessibleLabel: 'Decimal point',
    variant: 'digit',
    action: { type: 'decimal' },
  },
  {
    id: 'equals',
    label: '=',
    accessibleLabel: 'Equals',
    variant: 'operator',
    action: { type: 'equals' },
  },
];

function actionsMatch(
  activeAction: CalculatorAction | null | undefined,
  buttonAction: CalculatorAction,
): boolean {
  if (activeAction === null || activeAction === undefined) {
    return false;
  }

  if (activeAction.type !== buttonAction.type) {
    return false;
  }

  switch (activeAction.type) {
    case 'digit':
      return (
        buttonAction.type === 'digit' &&
        activeAction.digit === buttonAction.digit
      );
    case 'operator':
      return (
        buttonAction.type === 'operator' &&
        activeAction.operator === buttonAction.operator
      );
    case 'decimal':
    case 'equals':
    case 'clear':
      return true;
    case 'backspace':
      return false;
  }
}

export function Keypad({ activeAction, onAction }: KeypadProps) {
  return (
    <section aria-label="Calculator keypad" className="calculator-keypad">
      {keypadButtons.map((key) => (
        <Button
          accessibleLabel={key.accessibleLabel}
          className={key.className}
          isPressed={actionsMatch(activeAction, key.action)}
          key={key.id}
          onClick={() => onAction?.(key.action)}
          variant={key.variant}
        >
          {key.label}
        </Button>
      ))}
    </section>
  );
}

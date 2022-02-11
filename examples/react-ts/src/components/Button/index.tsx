import type {TestIdProp} from 'lib/testing';
import React from 'react';
import cn from 'clsx';

import './index.scss';

export type ButtonTestId = {
  label: string;
};

type Props = TestIdProp<ButtonTestId> &
  Pick<JSX.IntrinsicElements['button'], 'disabled' | 'form' | 'type'> & {
    appearance?: 'text' | 'filled' | 'dialogAction';
    children: React.ReactNode;
    onClick?: () => void;
  };

export function Button({
  appearance = 'filled',
  children,
  disabled,
  form,
  onClick,
  testId,
  type = 'button',
}: Props): React.ReactElement {
  return (
    <button
      className={cn(
        'mdc-button',
        appearance === 'filled' && 'mdc-button--raised',
        appearance === 'dialogAction' && 'mdc-dialog__button',
      )}
      data-test-id={testId}
      disabled={disabled}
      form={form}
      onClick={onClick ? () => onClick() : undefined}
      type={type}
    >
      <span className="mdc-button__ripple" />
      <span className="mdc-button__label" data-test-id={testId?.label}>
        {children}
      </span>
    </button>
  );
}

import {TestIdProp} from 'lib/testing';
import React from 'react';
import cn from 'clsx';

import './index.scss';

export type ButtonTestId = unknown;

type Props = TestIdProp<ButtonTestId> &
  Pick<JSX.IntrinsicElements['button'], 'form' | 'onClick' | 'type'> & {
    appearance?: 'text' | 'filled' | 'dialogAction';
    children: React.ReactNode;
  };

export function Button({
  appearance = 'filled',
  children,
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
      form={form}
      onClick={onClick}
      type={type}
    >
      <span className="mdc-button__ripple" />
      <span className="mdc-button__label">{children}</span>
    </button>
  );
}

import {Input, InputProps, InputTestId} from 'components/Input';
import {TestIdProp} from 'lib/testing';
import React, {useState} from 'react';
import cn from 'clsx';

import './index.scss';

export type TextFieldTestId = {
  error: unknown;
  input: InputTestId;
  label: unknown;
};

type Props = TestIdProp<TextFieldTestId> &
  Pick<InputProps, 'onChange' | 'defaultValue' | 'form' | 'name' | 'value'> & {
    error?: React.ReactNode;
    label: React.ReactNode;
    type?: 'text' | 'password';
  };

export function TextField({
  defaultValue,
  error,
  form,
  label,
  onChange,
  testId,
  type = 'text',
  value,
}: Props): React.ReactElement {
  const [focused, setFocused] = useState(false);

  return (
    <label
      className={cn(
        'mdc-text-field',
        'mdc-text-field--filled',
        focused && 'mdc-text-field--focused',
      )}
      data-test-id={testId}
    >
      <Input
        autoComplete="off"
        className="mdc-text-field__input"
        defaultValue={defaultValue}
        form={form}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        testId={testId?.input}
        type={type}
        value={value}
      />
      <span
        className={cn('mdc-floating-label', 'mdc-floating-label--float-above')}
        data-test-id={testId?.label}
      >
        {label}
      </span>
      <div
        className={cn('mdc-line-ripple', focused && 'mdc-line-ripple--active')}
      />
    </label>
  );
}

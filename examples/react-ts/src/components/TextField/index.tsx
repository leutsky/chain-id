import {Input, InputTestId} from 'components/Input';
import type {TestIdProp} from 'lib/testing';
import React, {useState} from 'react';
import cn from 'clsx';

import './index.scss';

export type TextFieldTestId = {
  error: string;
  input: InputTestId;
  label: string;
};

export type TextFieldChangeEvent = {
  name: string;
  value: string;
};

export type TextFieldChangeHandler = (data: TextFieldChangeEvent) => void;

export type TextFieldType = 'text' | 'password';

export type TextFieldProps = TestIdProp<TextFieldTestId> & {
  disabled?: boolean;
  error?: React.ReactNode;
  label: React.ReactNode;
  name: string;
  onChange: TextFieldChangeHandler;
  type?: TextFieldType;
  value: string;
};

export function TextField({
  disabled,
  error,
  label,
  name,
  onChange,
  testId,
  type = 'text',
  value,
}: TextFieldProps): React.ReactElement {
  const [focused, setFocused] = useState(false);
  const errorVisible = !!error;
  const filled = !!value;

  return (
    <div className="inline-text-field-container">
      <label
        className={cn(
          'mdc-text-field',
          'mdc-text-field--filled',
          disabled && 'mdc-text-field--disabled',
          focused && 'mdc-text-field--focused',
          errorVisible && 'mdc-text-field--invalid',
        )}
        data-test-id={testId}
      >
        <Input
          autoComplete="off"
          autoCorrect="off"
          className="mdc-text-field__input"
          disabled={disabled}
          name={name}
          onBlur={() => setFocused(false)}
          onChange={({currentTarget: {name, value}}) => onChange({name, value})}
          onFocus={() => setFocused(true)}
          required
          testId={testId?.input}
          type={type}
          value={value}
        />
        <span
          className={cn(
            'mdc-floating-label',
            (filled || focused) && 'mdc-floating-label--float-above',
          )}
          data-test-id={testId?.label}
        >
          {label}
        </span>
        <div
          className={cn(
            'mdc-line-ripple',
            focused && 'mdc-line-ripple--active',
          )}
        />
      </label>
      {errorVisible && (
        <div className="mdc-text-field-helper-line">
          <div
            className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg"
            data-test-id={testId?.error}
          >
            {error}
          </div>
        </div>
      )}
    </div>
  );
}

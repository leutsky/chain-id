import React from 'react';
import type {TestIdProp} from 'lib/testing';

export type InputTestId = string;

export type InputProps = TestIdProp<InputTestId> &
  JSX.IntrinsicElements['input'];

export function Input({testId, ...inputProps}: InputProps): React.ReactElement {
  return <input {...inputProps} data-test-id={testId} />;
}

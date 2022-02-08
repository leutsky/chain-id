import React from 'react';
import {TestIdProp} from 'lib/testing';

export type InputTestId = unknown;

export type InputProps = TestIdProp<InputTestId> &
  JSX.IntrinsicElements['input'];

export function Input({testId, ...inputProps}: InputProps): React.ReactElement {
  return <input {...inputProps} data-test-id={testId} />;
}

import React from 'react';
import {createTestId, render} from 'lib/testing';
import userEvent from '@testing-library/user-event';

import {Button, ButtonTestId} from './index';

const testId = createTestId<ButtonTestId>();

describe('Button', () => {
  test('label', () => {
    const labelText = 'Label';
    const {getByTestId} = render(<Button testId={testId}>{labelText}</Button>);
    const labelElement = getByTestId(testId.label);

    expect(labelElement).toHaveTextContent(labelText);
  });

  test('is disabled', () => {
    const {getByTestId} = render(
      <Button disabled testId={testId}>
        Button
      </Button>,
    );

    expect(getByTestId(testId)).toBeDisabled();
  });

  test('is not disabled', () => {
    const {getByTestId} = render(
      <Button disabled={false} testId={testId}>
        Button
      </Button>,
    );

    expect(getByTestId(testId)).not.toBeDisabled();
  });

  test('click', () => {
    const handleClick = jest.fn();
    const {getByTestId} = render(
      <Button onClick={handleClick} testId={testId}>
        Button
      </Button>,
    );

    userEvent.click(getByTestId(testId));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

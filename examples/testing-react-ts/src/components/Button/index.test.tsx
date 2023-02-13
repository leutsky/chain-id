import React from 'react';
import {createTestId, render, getElementByTestId} from 'lib/testing';
import userEvent from '@testing-library/user-event';

import {Button, ButtonTestId} from './index';

const testId = createTestId<ButtonTestId>();

describe('Button', () => {
  test('label', () => {
    const labelText = 'Label';
    render(<Button testId={testId}>{labelText}</Button>);
    const labelElement = getElementByTestId(testId.label);

    expect(labelElement).toHaveTextContent(labelText);
  });

  test('is disabled', () => {
    render(
      <Button disabled testId={testId}>
        Button
      </Button>,
    );

    expect(getElementByTestId(testId)).toBeDisabled();
  });

  test('is not disabled', () => {
    render(
      <Button disabled={false} testId={testId}>
        Button
      </Button>,
    );

    expect(getElementByTestId(testId)).not.toBeDisabled();
  });

  test('click', async () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} testId={testId}>
        Button
      </Button>,
    );

    await userEvent.click(getElementByTestId(testId));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

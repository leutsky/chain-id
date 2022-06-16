import React from 'react';
import {render, getElementByTestId, queryElementByTestId} from 'lib/testing';
import userEvent from '@testing-library/user-event';

import {rootTestId} from 'testId';

import {App} from './index';

describe('App', () => {
  test('open and close AuthDialog', async () => {
    render(<App />);

    await userEvent.click(getElementByTestId(rootTestId.signInButton));

    expect(
      getElementByTestId(rootTestId.authDialog.dialog),
    ).toBeInTheDocument();

    await userEvent.click(
      getElementByTestId(rootTestId.authDialog.cancelButton),
    );

    expect(
      queryElementByTestId(rootTestId.authDialog.dialog),
    ).not.toBeInTheDocument();
  });
});

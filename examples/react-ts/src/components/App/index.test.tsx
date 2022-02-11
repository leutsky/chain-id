import React from 'react';
import {render} from 'lib/testing';
import userEvent from '@testing-library/user-event';

import {rootTestId} from 'testId';

import {App} from './index';

describe('App', () => {
  test('open and close AuthDialog', () => {
    const {getByTestId, queryByTestId} = render(<App />);

    userEvent.click(getByTestId(rootTestId.signInButton));

    expect(getByTestId(rootTestId.authDialog.dialog)).toBeInTheDocument();

    userEvent.click(getByTestId(rootTestId.authDialog.cancelButton));

    expect(queryByTestId(rootTestId.authDialog.dialog)).not.toBeInTheDocument();
  });
});
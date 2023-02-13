import React from 'react';
import {
  createTestId,
  dummyFn,
  render,
  getElementByTestId,
  queryElementByTestId,
} from 'lib/testing';
import userEvent from '@testing-library/user-event';

import {AuthDialog} from './index';
import {AuthDialogTestId, SignInData} from './types';

const testId = createTestId<AuthDialogTestId>();

describe('AuthDialog', () => {
  test('Click Cancel button', async () => {
    const onClose = jest.fn();
    render(<AuthDialog onClose={onClose} onSignIn={dummyFn} testId={testId} />);

    await userEvent.click(getElementByTestId(testId.cancelButton));

    expect(onClose).toBeCalledTimes(1);
  });

  describe('Click Sign In button', () => {
    test('when fields are empty', async () => {
      const onSignIn = jest.fn<SignInData, [SignInData]>();
      render(
        <AuthDialog onClose={dummyFn} onSignIn={onSignIn} testId={testId} />,
      );

      await userEvent.click(getElementByTestId(testId.submitButton));

      expect(onSignIn).toBeCalledTimes(0);
      expect(
        getElementByTestId(testId.usernameField.error),
      ).toBeInTheDocument();
      expect(
        getElementByTestId(testId.passwordField.error),
      ).toBeInTheDocument();
    });

    test('when only the username is filled in', async () => {
      const onSignIn = jest.fn<SignInData, [SignInData]>();
      render(
        <AuthDialog onClose={dummyFn} onSignIn={onSignIn} testId={testId} />,
      );

      await userEvent.type(
        getElementByTestId(testId.usernameField.input),
        'username',
      );
      await userEvent.click(getElementByTestId(testId.submitButton));

      expect(onSignIn).toBeCalledTimes(0);
      expect(
        queryElementByTestId(testId.usernameField.error),
      ).not.toBeInTheDocument();
      expect(
        getElementByTestId(testId.passwordField.error),
      ).toBeInTheDocument();
    });

    test('when only the password is filled in', async () => {
      const onSignIn = jest.fn<SignInData, [SignInData]>();
      render(
        <AuthDialog onClose={dummyFn} onSignIn={onSignIn} testId={testId} />,
      );

      await userEvent.type(
        getElementByTestId(testId.passwordField.input),
        'password',
      );
      await userEvent.click(getElementByTestId(testId.submitButton));

      expect(onSignIn).toBeCalledTimes(0);
      expect(
        queryElementByTestId(testId.passwordField.error),
      ).not.toBeInTheDocument();
      expect(
        getElementByTestId(testId.usernameField.error),
      ).toBeInTheDocument();
    });

    test('when both fields are filled in', async () => {
      const username = 'username';
      const password = 'password';
      const onSignIn = jest.fn<SignInData, [SignInData]>();
      render(
        <AuthDialog onClose={dummyFn} onSignIn={onSignIn} testId={testId} />,
      );

      await userEvent.type(
        getElementByTestId(testId.usernameField.input),
        username,
      );
      await userEvent.type(
        getElementByTestId(testId.passwordField.input),
        password,
      );
      await userEvent.click(getElementByTestId(testId.submitButton));

      expect(onSignIn).toBeCalledTimes(1);
      expect(onSignIn).lastCalledWith({username, password});
      expect(
        queryElementByTestId(testId.passwordField.error),
      ).not.toBeInTheDocument();
      expect(
        queryElementByTestId(testId.usernameField.error),
      ).not.toBeInTheDocument();
    });
  });
});

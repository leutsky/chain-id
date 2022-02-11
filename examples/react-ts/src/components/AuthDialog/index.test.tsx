import React from 'react';
import {createTestId, dummyFn, render} from 'lib/testing';
import userEvent from '@testing-library/user-event';

import {AuthDialog} from './index';
import {AuthDialogTestId, SignInData} from './types';

const testId = createTestId<AuthDialogTestId>();

describe('AuthDialog', () => {
  test('Click Cancel button', () => {
    const onClose = jest.fn();
    const {getByTestId} = render(
      <AuthDialog onClose={onClose} onSignIn={dummyFn} testId={testId} />,
    );

    userEvent.click(getByTestId(testId.cancelButton));

    expect(onClose).toBeCalledTimes(1);
  });

  describe('Click Sign In button', () => {
    test('when fields are empty', () => {
      const onSignIn = jest.fn<SignInData, [SignInData]>();
      const {getByTestId} = render(
        <AuthDialog onClose={dummyFn} onSignIn={onSignIn} testId={testId} />,
      );

      userEvent.click(getByTestId(testId.submitButton));

      expect(onSignIn).toBeCalledTimes(0);
      expect(getByTestId(testId.usernameField.error)).toBeInTheDocument();
      expect(getByTestId(testId.passwordField.error)).toBeInTheDocument();
    });

    test('when only the username is filled in', () => {
      const onSignIn = jest.fn<SignInData, [SignInData]>();
      const {getByTestId, queryByTestId} = render(
        <AuthDialog onClose={dummyFn} onSignIn={onSignIn} testId={testId} />,
      );

      userEvent.type(getByTestId(testId.usernameField.input), 'username');
      userEvent.click(getByTestId(testId.submitButton));

      expect(onSignIn).toBeCalledTimes(0);
      expect(queryByTestId(testId.usernameField.error)).not.toBeInTheDocument();
      expect(getByTestId(testId.passwordField.error)).toBeInTheDocument();
    });

    test('when only the password is filled in', () => {
      const onSignIn = jest.fn<SignInData, [SignInData]>();
      const {getByTestId, queryByTestId} = render(
        <AuthDialog onClose={dummyFn} onSignIn={onSignIn} testId={testId} />,
      );

      userEvent.type(getByTestId(testId.passwordField.input), 'password');
      userEvent.click(getByTestId(testId.submitButton));

      expect(onSignIn).toBeCalledTimes(0);
      expect(queryByTestId(testId.passwordField.error)).not.toBeInTheDocument();
      expect(getByTestId(testId.usernameField.error)).toBeInTheDocument();
    });

    test('when both fields are filled in', () => {
      const username = 'username';
      const password = 'password';
      const onSignIn = jest.fn<SignInData, [SignInData]>();
      const {getByTestId, queryByTestId} = render(
        <AuthDialog onClose={dummyFn} onSignIn={onSignIn} testId={testId} />,
      );

      userEvent.type(getByTestId(testId.usernameField.input), username);
      userEvent.type(getByTestId(testId.passwordField.input), password);
      userEvent.click(getByTestId(testId.submitButton));

      expect(onSignIn).toBeCalledTimes(1);
      expect(onSignIn).lastCalledWith({username, password});
      expect(queryByTestId(testId.passwordField.error)).not.toBeInTheDocument();
      expect(queryByTestId(testId.usernameField.error)).not.toBeInTheDocument();
    });
  });
});

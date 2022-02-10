import {Button, ButtonTestId} from 'components/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTestId,
} from 'components/Dialog';
import {TextField, TextFieldTestId, TextFieldChangeHandler} from 'components/TextField';
import type {TestIdProp} from 'lib/testing';
import React, {useCallback, useState} from 'react';

import styles from './index.module.scss';

export type SignInData = {
  username: string;
  password: string;
};

type SignInErrors = {
  username?: React.ReactNode;
  password?: React.ReactNode;
};

export type SignInHandler = (data: SignInData) => void;

export type AuthDialogTestId = {
  dialog: DialogTestId;
  usernameField: TextFieldTestId;
  passwordField: TextFieldTestId;
  cancelButton: ButtonTestId;
  submitButton: ButtonTestId;
};

type Props = TestIdProp<AuthDialogTestId> & {
  onClose: () => void;
  onSignIn: SignInHandler;
};

export function AuthDialog({
  onClose,
  onSignIn,
  testId,
}: Props): React.ReactElement {
  const [credential, setCredential] = useState<SignInData>(() => ({
    username: '',
    password: '',
  }));
  const [errors, setErrors] = useState<SignInErrors>(() => ({}));

  const handleInputChange = useCallback<TextFieldChangeHandler>((data) => {
    setCredential((prevCredential) => ({
      ...prevCredential,
      [data.name]: data.value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    const validationErrors: SignInErrors = {};
    let withErrors = false;

    if (!credential.username) {
      validationErrors.username = 'Username is required';
      withErrors = true;
    }

    if (!credential.password) {
      validationErrors.password = 'Password is required';
      withErrors = true;
    }

    if (withErrors) {
      setErrors(validationErrors);
    } else {
      onSignIn(credential);
    }
  }, [credential, onSignIn]);

  return (
    <Dialog onClose={onClose} testId={testId?.dialog}>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <div className={styles.layout}>
          <TextField
            error={errors.username}
            label="Username"
            name="username"
            onChange={handleInputChange}
            testId={testId?.usernameField}
            value={credential.username}
          />
          <TextField
            error={errors.password}
            label="Password"
            name="password"
            onChange={handleInputChange}
            testId={testId?.passwordField}
            type="password"
            value={credential.password}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          appearance="dialogAction"
          onClick={onClose}
          testId={testId?.cancelButton}
        >
          Cancel
        </Button>
        <Button
          appearance="dialogAction"
          onClick={handleSubmit}
          testId={testId?.submitButton}
        >
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
}

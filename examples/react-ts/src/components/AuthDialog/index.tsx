import {Button} from 'components/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'components/Dialog';
import {
  TextField,
  TextFieldChangeHandler,
} from 'components/TextField';
import React, {useCallback, useState} from 'react';

import {AuthDialogProps, SignInData} from './types';
import styles from './index.module.scss';

type SignInErrors = {
  username?: React.ReactNode;
  password?: React.ReactNode;
};

export function AuthDialog({
  onClose,
  onSignIn,
  testId,
}: AuthDialogProps): React.ReactElement {
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

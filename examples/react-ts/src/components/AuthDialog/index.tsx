import {Button, ButtonTestId} from 'components/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTestId,
} from 'components/Dialog';
import {TextField, TextFieldTestId} from 'components/TextField';
import {TestIdProp} from 'lib/testing';
import React from 'react';

import styles from './index.module.scss';

export type AuthDialogTestId = {
  dialog: DialogTestId;
  usernameField: TextFieldTestId;
  passwordField: TextFieldTestId;
  cancelButton: ButtonTestId;
  signInButton: ButtonTestId;
};

type Props = TestIdProp<AuthDialogTestId> & {
  onClose?: () => void;
};

export function AuthDialog({onClose, testId}: Props): React.ReactElement {
  return (
    <Dialog onClose={onClose} testId={testId?.dialog}>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <div className={styles.layout}>
          <TextField
            label="Username"
            name="username"
            testId={testId?.usernameField}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            testId={testId?.passwordField}
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
        <Button appearance="dialogAction" testId={testId?.signInButton}>
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
}

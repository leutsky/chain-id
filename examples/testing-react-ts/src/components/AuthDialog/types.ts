import {ButtonTestId} from 'components/Button';
import {DialogTestId} from 'components/Dialog';
import {TextFieldTestId} from 'components/TextField';
import {TestIdProp} from 'lib/testing';

export type SignInData = {
  username: string;
  password: string;
};

export type SignInHandler = (data: SignInData) => void;

export type AuthDialogTestId = {
  dialog: DialogTestId;
  usernameField: TextFieldTestId;
  passwordField: TextFieldTestId;
  cancelButton: ButtonTestId;
  submitButton: ButtonTestId;
};

export type AuthDialogProps = TestIdProp<AuthDialogTestId> & {
  onClose: () => void;
  onSignIn: SignInHandler;
};

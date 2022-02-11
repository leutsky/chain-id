import type {AuthDialogTestId} from 'components/AuthDialog/types';
import type {ButtonTestId} from 'components/Button';
import {createTestId} from 'lib/testing';

export type RootTestId = {
  authDialog: AuthDialogTestId;
  signInButton: ButtonTestId;
};

export const rootTestId = createTestId<RootTestId>();

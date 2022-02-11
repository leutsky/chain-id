import {TestIdProp} from 'lib/testing';
import React from 'react';

export type DialogCloseHandler = () => void;

export type DialogTestId = {
  scrim: string;
  title: string;
  content: string;
  actions: string;
};

export type DialogInterface = {
  onClose?: DialogCloseHandler;
  testId?: DialogTestId;
};

export type DialogProps = TestIdProp<DialogTestId> & {
  children: React.ReactNode;
  onClose?: DialogCloseHandler;
};

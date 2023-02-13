import {useContext} from 'react';
import {DialogContext} from './contexts';
import {DialogInterface} from './types';

export function useDialog(): DialogInterface {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('DialogContext is not defined');
  }

  return context;
}

import {createContext} from 'react';

import {DialogInterface} from './types';

export const DialogContext = createContext<DialogInterface | undefined>(
  undefined,
);

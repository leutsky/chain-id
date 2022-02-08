import React from 'react';

import {useDialog} from './hooks';

type Props = {
  children: React.ReactNode;
};

export function Actions({children}: Props): React.ReactElement {
  const {testId} = useDialog();

  return (
    <div className="mdc-dialog__actions" data-test-id={testId?.actions}>
      {children}
    </div>
  );
}

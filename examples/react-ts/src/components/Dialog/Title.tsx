import React from 'react';

import {useDialog} from './hooks';

type Props = {
  children: React.ReactNode;
};

export function Title({children}: Props): React.ReactElement {
  const {testId} = useDialog();

  return (
    <h2 className="mdc-dialog__title" data-test-id={testId?.title}>
      {children}
    </h2>
  );
}

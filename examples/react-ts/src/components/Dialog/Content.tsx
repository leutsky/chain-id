import React from 'react';

import {useDialog} from './hooks';

type Props = {
  children: React.ReactNode;
};

export function Content({children}: Props): React.ReactElement {
  const {testId} = useDialog();

  return (
    <div className="mdc-dialog__content" data-test-id={testId?.content}>
      {children}
    </div>
  );
}

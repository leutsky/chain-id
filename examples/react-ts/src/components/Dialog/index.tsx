import {TestIdProp} from 'lib/testing';
import React, {useMemo} from 'react';

import {DialogContext} from './contexts';
import './index.scss';
import {DialogCloseHandler, DialogTestId} from './types';

export type {DialogTestId};
export {Actions as DialogActions} from './Actions';
export {Content as DialogContent} from './Content';
export {Title as DialogTitle} from './Title';

type Props = TestIdProp<DialogTestId> & {
  children: React.ReactNode;
  onClose?: DialogCloseHandler;
};

export function Dialog({children, onClose, testId}: Props): React.ReactElement {
  const dialogInterface = useMemo(() => ({onClose, testId}), [onClose, testId]);

  return (
    <DialogContext.Provider value={dialogInterface}>
      <div className="mdc-dialog mdc-dialog--open">
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface" data-test-id={testId}>
            {children}
          </div>
        </div>
        <div className="mdc-dialog__scrim" onClick={onClose} />
      </div>
    </DialogContext.Provider>
  );
}

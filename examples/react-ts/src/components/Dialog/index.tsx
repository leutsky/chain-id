import React, {useMemo} from 'react';

import {DialogContext} from './contexts';
import './index.scss';
import {DialogProps, DialogTestId} from './types';

export type {DialogTestId};
export {Actions as DialogActions} from './Actions';
export {Content as DialogContent} from './Content';
export {Title as DialogTitle} from './Title';

export function Dialog({
  children,
  onClose,
  testId,
}: DialogProps): React.ReactElement {
  const handleClose = useMemo(() => onClose && (() => onClose()), [onClose]);
  const dialogInterface = useMemo(
    () => ({onClose: handleClose, testId}),
    [handleClose, testId],
  );

  return (
    <DialogContext.Provider value={dialogInterface}>
      <div className="mdc-dialog mdc-dialog--open">
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface" data-test-id={testId}>
            {children}
          </div>
        </div>
        <div
          className="mdc-dialog__scrim"
          data-test-id={testId?.scrim}
          onClick={handleClose}
        />
      </div>
    </DialogContext.Provider>
  );
}

import {AuthDialog, SignInHandler} from 'components/AuthDialog';
import {Button} from 'components/Button';
import React, {useCallback, useState} from 'react';
import {rootTestId} from 'testId';

import styles from './index.module.scss';

export function App(): React.ReactElement {
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleSignIn = useCallback<SignInHandler>(() => {
    //
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.inner}>
        <Button
          onClick={() => setDialogOpened(true)}
          testId={rootTestId.signInButton}
        >
          Sign In
        </Button>
        {dialogOpened && (
          <AuthDialog
            onClose={() => setDialogOpened(false)}
            onSignIn={handleSignIn}
            testId={rootTestId.authDialog}
          />
        )}
      </div>
    </div>
  );
}

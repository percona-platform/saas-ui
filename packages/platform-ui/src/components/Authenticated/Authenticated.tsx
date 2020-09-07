import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from '@grafana/ui';
import { LoaderButton } from '@percona/platform-core';
import { PrivateLayout } from 'components';
import { getAuth, store, authLogoutAction } from 'store';
import { getStyles } from './Authenticated.styles';
import { signOut } from './Authenticated.service';
import { Routes } from 'core/routes';
import { toast } from 'react-toastify';
import { Messages } from './Authenticated.messages'

const { SUCCESS: TOAST_SUCCESS, ERROR: TOAST_ERROR } = toast.TYPE;

export const Authenticated: FC = () => {
  const styles = useStyles(getStyles);
  const history = useHistory();
  const { email, pending } = useSelector(getAuth);

  const logout = useCallback(async () => {
    try {
      store.dispatch(authLogoutAction.request({ email: email! }));
      await signOut();
      toast(Messages.signOutSucceeded, { type: TOAST_SUCCESS });
      store.dispatch(authLogoutAction.success());
      history.replace(Routes.login);
    } catch (e) {
      store.dispatch(authLogoutAction.failure(new Error(Messages.errors.signOutFailed)));
      toast(Messages.errors.signOutFailed, { type: TOAST_ERROR });
      console.error(e);
    }
  }, [email, history]);

  return (
    <PrivateLayout>
      <section className={styles.container}>
        <div>{Messages.authenticatedFirstLine}</div>
        <div>{Messages.authenticatedSecondLine}</div>
        <div>
          {Messages.authenticatedThirdLine}
          <em>
            <b>{email}</b>
          </em>
        </div>
        <div>
          <LoaderButton
            data-qa="logout-action-button"
            type="submit"
            loading={pending}
            disabled={pending}
            onClick={logout}
            className={styles.logoutButton}
          >
            {Messages.signOut}
          </LoaderButton>
        </div>
      </section>
    </PrivateLayout>
  );
};

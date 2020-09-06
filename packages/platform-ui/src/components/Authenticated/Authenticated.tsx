import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@grafana/ui';
import { sleep, LoaderButton } from '@percona/platform-core';
import { PrivateLayout } from 'components';
import { getAuth, store, authLogoutAction } from 'store';
import { getStyles } from './Authenticated.styles';

export const Authenticated: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const history = useHistory();
  const { email, pending } = useSelector(getAuth);

  const logout = useCallback(async () => {
    try {
      store.dispatch(authLogoutAction.request({ email: email! }));
      await sleep();
      store.dispatch(authLogoutAction.success());
      history.replace('/login');
    } catch (e) {
      store.dispatch(authLogoutAction.failure(new Error('Error logging out')));
      console.error(e);
    }
  }, [email, history]);

  return (
    <PrivateLayout>
      <section className={styles.container}>
        <div>You have successfully</div>
        <div>logged in</div>
        <div>
          as{' '}
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
          >
            Logout
          </LoaderButton>
        </div>
      </section>
    </PrivateLayout>
  );
};

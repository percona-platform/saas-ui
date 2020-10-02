import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LinkButton, useStyles } from '@grafana/ui';
import { LoaderButton } from '@percona/platform-core';
import { PrivateLayout } from 'components';
import { getAuth, authLogoutAction } from 'store/auth';
import { Routes } from 'core/routes';
import { DOWNLOAD_PMM_LINK } from 'core/constants';
import { getStyles } from './Authenticated.styles';
import { signOut } from './Authenticated.service';
import { Messages } from './Authenticated.messages';
import { store } from 'store';
import { saveState } from 'store/persistency';

export const Authenticated: FC = () => {
  const styles = useStyles(getStyles);
  const history = useHistory();
  const dispatch = useDispatch();
  const { email, pending } = useSelector(getAuth);

  const logout = useCallback(async () => {
    try {
      dispatch(authLogoutAction.request({ email: email! }));
      await signOut();
      toast.success(Messages.signOutSucceeded);
      dispatch(authLogoutAction.success());
      history.replace(Routes.login);
    } catch (e) {
      dispatch(authLogoutAction.failure(new Error(Messages.errors.signOutFailed)));
      toast.error(Messages.errors.signOutFailed);
      console.error(e);
    } finally {
      saveState(store.getState());
    }
  }, [email, history, dispatch]);

  return (
    <PrivateLayout>
      <section className={styles.container}>
        <h4 className={styles.title}>{Messages.title}</h4>
        <p>{Messages.authenticatedFirstLine}</p>
        <p>
          <em>
            <b>{email}</b>
          </em>
        </p>
        <LinkButton className={styles.downloadPMMButton} href={DOWNLOAD_PMM_LINK}>
          {Messages.downloadPMM}
        </LinkButton>
        <LoaderButton
          data-qa="logout-action-button"
          type="submit"
          loading={pending}
          disabled={pending}
          onClick={logout}
          className={styles.logoutButton}
          variant="secondary"
        >
          {Messages.signOut}
        </LoaderButton>
      </section>
    </PrivateLayout>
  );
};

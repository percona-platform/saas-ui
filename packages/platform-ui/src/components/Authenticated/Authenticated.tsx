import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkButton, useStyles } from '@grafana/ui';
import { LoaderButton } from '@percona/platform-core';
import { PrivateLayout } from 'components';
import { getAuth, authLogoutAction } from 'store/auth';
import { DOWNLOAD_PMM_LINK } from 'core/constants';
import { getStyles } from './Authenticated.styles';
import { Messages } from './Authenticated.messages';

export const Authenticated: FC = () => {
  const styles = useStyles(getStyles);
  const dispatch = useDispatch();
  const { email, pending } = useSelector(getAuth);

  const logout = useCallback(async () => {
    dispatch(authLogoutAction.request({ email: email! }));
  }, [email, dispatch]);

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
        <LinkButton className={styles.downloadPMMButton} href={DOWNLOAD_PMM_LINK} target="_blank">
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

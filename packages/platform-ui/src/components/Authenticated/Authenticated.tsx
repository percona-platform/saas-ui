import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { LinkButton, useStyles } from '@grafana/ui';
import { PrivateLayout } from 'components';
import { getAuth } from 'store/auth/auth.selectors';
import { DOWNLOAD_PMM_LINK } from 'core/constants';
import { getStyles } from './Authenticated.styles';
import { Messages } from './Authenticated.messages';

export const Authenticated: FC = () => {
  const styles = useStyles(getStyles);
  const { email } = useSelector(getAuth);

  return (
    <PrivateLayout>
      <section className={styles.container}>
        <h4 className={styles.title}>{Messages.title}</h4>
        <p>{Messages.authenticatedFirstLine}</p>
        <p>
          <em>
            <b data-qa="user-email">{email}</b>
          </em>
        </p>
        <LinkButton className={styles.downloadPMMButton} href={DOWNLOAD_PMM_LINK} target="_blank">
          {Messages.downloadPMM}
        </LinkButton>
      </section>
    </PrivateLayout>
  );
};

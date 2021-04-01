import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { Messages } from 'core/messages';
import { ReactComponent as PerconaLogo } from 'assets/percona-logo-wide.svg';
import { getStyles } from './PublicLayout.styles';

export const PublicLayout: FC = ({ children }) => {
  const styles = useStyles(getStyles);

  return (
    <main className={styles.main}>
      <div className={styles.leftZone}>
        <div className={styles.logo}>
          <PerconaLogo />
        </div>
        <div className={styles.description}>{Messages.productDescription}</div>
      </div>
      <div className={styles.centerZone} />
      <div className={styles.rightZone}>{children}</div>
    </main>
  );
};

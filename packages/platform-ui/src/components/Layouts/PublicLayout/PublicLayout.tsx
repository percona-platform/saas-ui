import React, { FC } from 'react';
import { useTheme } from '@grafana/ui';
import { Messages } from 'core';
import { getStyles } from './PublicLayout.styles';
import logo from 'assets/percona-logo.svg';

export const PublicLayout: FC = ({ children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <main className={styles.main}>
      <div className={styles.leftZone}>
        <div className={styles.logo}>
          <img src={logo} alt={Messages.logoAlt} />
          <h1>{Messages.companyName}</h1>
        </div>
        <div className={styles.description}>{Messages.productDescription}</div>
      </div>
      <div className={styles.centerZone} />
      <div className={styles.rightZone}>{children}</div>
    </main>
  );
};

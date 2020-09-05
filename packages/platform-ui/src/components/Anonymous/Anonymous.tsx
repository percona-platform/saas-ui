import React, { FC } from 'react';
import { useTheme } from '@grafana/ui';
import { getStyles } from './Anonymous.styles';
import { Messages } from './Anonymous.messages';
import logo from 'assets/percona-logo.svg';

export const Anonymous: FC = ({ children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <main className={styles.main}>
      <div className={styles.leftZone}>
        <div className={styles.logo}>
          <img src={logo} alt={Messages.logoAlt} />
          <h1>{Messages.companyName}</h1>
        </div>
        <div className={styles.description}>{Messages.description}</div>
      </div>
      <div className={styles.centerZone} />
      <div className={styles.rightZone}>{children}</div>
    </main>
  );
};

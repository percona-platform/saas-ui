import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { MenuBar } from 'components';
import { getStyles } from './PrivateLayout.styles';

export const PrivateLayout: FC = ({ children }) => {
  const styles = useStyles(getStyles);

  return (
    <main className={styles.main}>
      <MenuBar />
      <section className={styles.contentWrapper}>
        {children}
      </section>
    </main>
  );
};

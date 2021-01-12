import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from '@grafana/ui';
import { getCurrentTheme } from 'store/theme';
import whiteLogo from 'assets/404-light.svg';
import darkLogo from 'assets/404-dark.svg';
import { getStyles } from './NotFound.styles';

export const NotFound: FC = () => {
  const { isDark } = useSelector(getCurrentTheme);
  const styles = useStyles(getStyles);

  return (
    <div className={styles.contentWrapper}>
      <img alt="404" src={isDark ? darkLogo : whiteLogo} />
    </div>
  );
};

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useStyles, Button } from '@grafana/ui';
import { getCurrentTheme } from 'store/theme';
import whiteLogo from 'assets/404-light.svg';
import darkLogo from 'assets/404-dark.svg';
import { getStyles } from './NotFound.styles';
import { Messages } from './NotFound.messages';

export const NotFound: FC = () => {
  const { isDark } = useSelector(getCurrentTheme);
  const styles = useStyles(getStyles);

  return (
    <div className={styles.contentWrapper}>
      <img data-qa="404-image" className={styles.logo} alt="404" src={isDark ? darkLogo : whiteLogo} />
      <Button data-qa="404-home-button" className={styles.homeButton}>{Messages.homepage}</Button>
    </div>
  );
};

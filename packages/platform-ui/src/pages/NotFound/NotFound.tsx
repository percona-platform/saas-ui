import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useStyles, Button } from '@grafana/ui';
import { Link } from 'react-router-dom';
import { Routes } from 'core/routes';
import { getCurrentTheme } from 'store/theme';
import lightLogo from 'assets/404-light.svg';
import darkLogo from 'assets/404-dark.svg';
import { getStyles } from './NotFound.styles';
import { Messages } from './NotFound.messages';

export const NotFound: FC = () => {
  const { isDark } = useSelector(getCurrentTheme);
  const styles = useStyles(getStyles);
  const dataQaImgAttr = isDark ? 'dark' : 'light';
  const logo = isDark ? darkLogo : lightLogo;

  return (
    <div className={styles.contentWrapper}>
      <img data-qa={`404-image-${dataQaImgAttr}`} className={styles.logo} alt="404" src={logo} />
      <Button data-qa="404-home-button" className={styles.homeButton}>
        <Link to={Routes.root}>{Messages.homepage}</Link>
      </Button>
    </div>
  );
};

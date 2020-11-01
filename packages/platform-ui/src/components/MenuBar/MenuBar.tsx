import React, { FC, forwardRef, useCallback } from 'react';
import { Routes } from 'core/routes';
import { Link } from 'react-router-dom';
import { useStyles } from '@grafana/ui';
import logo from 'assets/percona-logo.svg';
import profile from 'assets/profile.svg';
import sun from 'assets/sun.svg';
import { Dropdown } from '@percona/platform-core';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'store/auth/auth.selectors';
import { authLogoutAction } from 'store/auth/auth.reducer';
import { getStyles } from './MenuBar.styles';
import { DropdownToggleProps } from './types';
import { Messages } from './MenuBar.messages';

export const MenuBar: FC = () => {
  const styles = useStyles(getStyles);
  const dispatch = useDispatch();
  const { email } = useSelector(getAuth);

  const logout = useCallback(async () => {
    dispatch(authLogoutAction.request({ email: email! }));
  }, [email, dispatch]);

  const DropdownToggle = forwardRef<HTMLDivElement, DropdownToggleProps>((props, ref) => (
    <div ref={ref} data-qa="menu-bar-percona-logo" {...props} className={styles.profileDropdownToggle}>
      <img className={styles.profileIcon} src={profile} alt={Messages.profileMenuAlt} />
    </div>
  ));

  return (
    <section className={styles.menuBar}>
      <div className={styles.leftSide}>
        <nav>
          <ul>
            <li>
              <Link to={Routes.signup} data-qa="menu-bar-percona-logo">
                <img className={styles.perconaLogo} src={logo} alt={Messages.logoAlt} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.rightSide}>
        <nav>
          <ul>
            <li>
              <Link to={Routes.signup} data-qa="menu-bar-percona-logo">
                <img className={styles.profileIcon} src={sun} alt={Messages.logoAlt} />
              </Link>
            </li>
            <li>
              <Dropdown toggle={DropdownToggle}>
                <span onClick={logout}>
                  {Messages.logout}
                </span>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

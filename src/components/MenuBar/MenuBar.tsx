import React, { FC, forwardRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThemeContext, useStyles } from '@grafana/ui';
import { Dropdown, Icons } from '@percona/platform-core';
import { Routes } from 'core/routes';
import { authLogoutAction, getAuth } from 'store/auth';
import { getCurrentTheme, themeChangeRequestAction } from 'store/theme';
import { ReactComponent as Profile } from 'assets/profile.svg';
import logo from 'assets/percona-logo.svg';
import { getStyles } from './MenuBar.styles';
import { Messages } from './MenuBar.messages';
import { DropdownToggleProps } from './MenuBar.types';

const { ThemeDark, ThemeLight } = Icons;

export const MenuBar: FC = () => {
  const styles = useStyles(getStyles);
  const dispatch = useDispatch();
  const { authenticated, email } = useSelector(getAuth);
  const currentTheme = useSelector(getCurrentTheme);

  const logout = useCallback(async () => {
    dispatch(authLogoutAction.request({ email: email! }));
  }, [email, dispatch]);

  const changeTheme = useCallback(() => {
    dispatch(themeChangeRequestAction(currentTheme));
  }, [currentTheme, dispatch]);

  const DropdownToggle = forwardRef<HTMLDivElement, DropdownToggleProps>((props, ref) => (
    <div ref={ref} {...props} data-qa="menu-bar-profile-dropdown-toggle" className={styles.menuIcon}>
      <Profile width={22} height={22}/>
    </div>
  ));

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <section className={styles.menuBar} data-qa="menu-bar">
          <div className={styles.leftSide} data-qa="menu-bar-left-side">
            <nav>
              <ul>
                <li>
                  <Link to={Routes.root} data-qa="menu-bar-home-link" className={styles.link}>
                    <img className={styles.perconaLogo} src={logo} alt={Messages.logoAlt} data-qa="menu-bar-percona-logo" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.rightSide} data-qa="menu-bar-right-side">
            <nav>
              <ul>
                <li>
                  <div className={styles.menuIcon} onMouseUp={changeTheme}>
                    {theme.isLight && <ThemeDark width={22} height={22} />}
                    {theme.isDark && <ThemeLight width={22} height={22} />}
                  </div>
                </li>
                {authenticated && (
                  <li>
                    <Dropdown toggle={DropdownToggle}>
                      <span data-qa="menu-bar-profile-dropdown-logout" onClick={logout}>
                        {Messages.logout}
                      </span>
                    </Dropdown>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </section>
      )}
    </ThemeContext.Consumer>
  );
};

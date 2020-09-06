import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@grafana/ui';
import { PrivateLayout } from 'components';
import { getAuth } from 'store/auth';
import { getStyles } from './Authenticated.styles';

export const Authenticated: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const logout = () => {
    // TODO: implement by dispatching a logout action and redirecting to /login
    // on success
  };

  const { email } = useSelector(getAuth);
  return (
    <PrivateLayout>
      <section className={styles.container}>
        <div>You have successfully</div>
        <div>logged in</div>
        <div>
          as{' '}
          <em>
            <b>{email}</b>
          </em>
        </div>
        <div>
          <Link to="/logout" data-qa="logout-action-button" className={styles.logoutLink} onClick={logout}>
            Logout
          </Link>
        </div>
      </section>
    </PrivateLayout>
  );
};

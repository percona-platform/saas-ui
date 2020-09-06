import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { css } from 'emotion';
import { withTheme } from '@grafana/ui';
import { PrivateLayout } from 'components';
import { getAuth } from 'store/auth';

export const Authenticated: FC = withTheme(({ theme }) => {
  const className = css`
    color: ${theme.colors.linkExternal};
    text-align: center;
    text-decoration: none;
  `;

  const logout = () => {
    // TODO: implement by dispatching a logout action and redirecting to /login
    // on success
  };

  const { email } = useSelector(getAuth);
  return (
    <PrivateLayout>
      <div>
        <h3>You have successfully</h3>
        <h3>logged in</h3>
        <h3>
          as <em>{email}</em>
        </h3>
        <Link to="/logout" data-qa="logout-action-button" className={className} onClick={logout}>
          Logout
        </Link>
      </div>
    </PrivateLayout>
  );
});

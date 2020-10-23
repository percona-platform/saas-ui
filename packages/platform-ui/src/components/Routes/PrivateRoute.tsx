import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from 'store/auth';
import { Routes } from 'core/routes';

// A wrapper for <Route> that redirects to the login if the user is not authenticated.
export const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const auth = useSelector(getAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Routes.login,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Routes } from 'core/routes';
import { getAuth } from 'store/auth';

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
        )}
    />
  );
};

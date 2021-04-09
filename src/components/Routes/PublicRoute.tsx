import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Routes } from 'core/routes';
import { getAuth } from 'store/auth';
import { useSelector } from 'react-redux';

// A wrapper for <Route> that redirects an authenticated user to the root page if they
// try to go to the /login route.
export const PublicRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const auth = useSelector(getAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth.authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Routes.root,
              state: { from: location },
            }}
          />
        )}
    />
  );
};

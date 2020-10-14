import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from 'store/auth';
import { Routes } from 'core/routes';

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
        )
      }
    />
  );
};

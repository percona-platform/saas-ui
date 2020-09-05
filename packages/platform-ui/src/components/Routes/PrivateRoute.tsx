import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from 'store';

// A wrapper for <Route> that redirects to the login if the user is not authenticated.
export const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const auth = useSelector((state: AppState) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

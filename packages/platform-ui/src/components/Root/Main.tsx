import React, { FC, useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PrivateRoute, PublicRoute, Authenticated } from 'components';
import { LoginPage, SignupPage } from 'pages';
import { authRefreshAction, getAuth } from 'store/auth';
import { Routes } from 'core/routes';
import { Messages } from './Main.messages';

export const Main: FC = () => {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();

  const callRefreshSession = useCallback(() => {
    dispatch(authRefreshAction.request());
  }, [dispatch]);

  useEffect(() => {
    callRefreshSession();
  }, [callRefreshSession]);

  return (
    <>
      {auth.pending ? null : (
        <Switch>
          <PrivateRoute path={Routes.root} exact>
            <Authenticated />
          </PrivateRoute>
          <PublicRoute path={Routes.login}>
            <LoginPage />
          </PublicRoute>
          <PublicRoute path={Routes.signup}>
            <SignupPage />
          </PublicRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
};

function NotFound() {
  return <h2>{Messages.pageNotFound}</h2>;
}

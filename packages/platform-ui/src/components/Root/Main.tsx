import React, { FC, useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute, PublicRoute, Authenticated } from 'components';
import { LoginPage, SignupPage } from 'pages';
import { Routes } from 'core/routes';
import { refreshSession } from './Main.service';
import { store, authRefreshAction, getAuth } from 'store';
import * as grpcWeb from 'grpc-web';
import { Messages } from './Main.messages';
import { useSelector } from 'react-redux';

export const Main: FC = () => {
  const auth = useSelector(getAuth);

  const callRefreshSession = useCallback(async () => {
    try {
      store.dispatch(authRefreshAction.request());
      await refreshSession();
      store.dispatch(authRefreshAction.success());
    } catch (e) {
      if (e.code === grpcWeb.StatusCode.UNAUTHENTICATED) {
        store.dispatch(authRefreshAction.failure(new Error(Messages.unauthenticated)));
      } else {
        store.dispatch(authRefreshAction.failure(new Error(Messages.errors.refreshSessionFailed)));
        console.error(e);
      }
    }
  }, []);

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

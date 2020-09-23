import React, { FC, useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as grpcWeb from 'grpc-web';
import { PrivateRoute, PublicRoute, Authenticated } from 'components';
import { LoginPage, SignupPage } from 'pages';
import { authRefreshAction, getAuth } from 'store';
import { Routes } from 'core/routes';
import { refreshSession } from './Main.service';
import { Messages } from './Main.messages';

export const Main: FC = () => {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();

  const callRefreshSession = useCallback(async () => {
    try {
      dispatch(authRefreshAction.request());
      await refreshSession();
      dispatch(authRefreshAction.success());
    } catch (e) {
      if (e.code === grpcWeb.StatusCode.UNAUTHENTICATED) {
        dispatch(authRefreshAction.failure(new Error(Messages.unauthenticated)));
      } else {
        dispatch(authRefreshAction.failure(new Error(Messages.errors.refreshSessionFailed)));
        console.error(e);
      }
    }
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

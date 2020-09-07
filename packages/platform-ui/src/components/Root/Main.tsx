import React, { FC, useCallback, useEffect } from 'react';
import { css } from 'emotion'
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute, PublicRoute, Authenticated, PublicLayout, PrivateLayout } from 'components';
import { LoginPage, SignupPage } from 'pages';
import { LinkButton } from '@grafana/ui';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { Routes } from 'core/routes'
import { refreshSession } from './Root.service';
import { store, authRefreshAction } from 'store';
import * as grpcWeb from 'grpc-web';
import 'react-toastify/dist/ReactToastify.min.css';

export const Main: FC = () => {
  const callRefreshSession = useCallback(async () => {
    try {
      store.dispatch(authRefreshAction.request());
      await refreshSession();
      store.dispatch(authRefreshAction.success());
    } catch (e) {
      if (e.code === grpcWeb.StatusCode.UNAUTHENTICATED) {
        store.dispatch(authRefreshAction.failure(new Error('Unauthenticated user')));
      } else {
        store.dispatch(authRefreshAction.failure(new Error('Unable to refresh user session')));
        console.error(e);
      }
    }
  }, [])

  useEffect(() => {
    callRefreshSession();
  }, [callRefreshSession]);

  return (
    <>
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
        <Route path={Routes.logout}>
          <Logout />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <ToastContainer
        bodyClassName={css`padding: 0.5em;`}
        position={toast.POSITION.TOP_RIGHT}
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Slide}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

function Logout() {
  return (
    <PrivateLayout>
      <h2>You have successfully logged out</h2>
      <br />
      <LinkButton href={Routes.root} data-qa="gohome-action-button">
        Home Page
      </LinkButton>
    </PrivateLayout>
  );
}

function NotFound() {
  return (
    <PublicLayout>
      <h2>Page Not Found</h2>
    </PublicLayout>
  );
}

import React, { FC, useCallback, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PrivateRoute, PublicRoute, Authenticated } from 'components';
import { LoginPage, SignupPage, UIDemo } from 'pages';
import { authRefreshAction, getAuth } from 'store/auth';
import { Routes } from 'core/routes';

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
      {auth.authCheckCompleted ? (
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
          <PublicRoute path={Routes.ui}>
            <UIDemo />
          </PublicRoute>
          <Redirect to={Routes.login}>
            {/* <NotFound /> */}
          </Redirect>
        </Switch>
      ) : null}
    </>
  );
};

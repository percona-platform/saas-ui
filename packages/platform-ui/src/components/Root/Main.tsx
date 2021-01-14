import React, { FC, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PrivateRoute, PublicRoute, Authenticated } from 'components';
import { LoginPage, SignupPage, UIDemo, NotFound } from 'pages';
import {  authRefreshAction } from 'store/auth';
import { Routes } from 'core/routes';

export const Main: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRefreshAction.request());
  }, [dispatch]);

  return (
    <>
        <Switch>
          <PrivateRoute exact path={Routes.root}>
            <Authenticated />
          </PrivateRoute>
          <PublicRoute exact path={Routes.login}>
            <LoginPage />
          </PublicRoute>
          <PublicRoute exact path={Routes.signup}>
            <SignupPage />
          </PublicRoute>
          <PublicRoute path={Routes.ui}>
            <UIDemo />
          </PublicRoute>
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        </Switch>
    </>
  );
};

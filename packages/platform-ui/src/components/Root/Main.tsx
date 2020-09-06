import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute, Authenticated, PublicLayout, PrivateLayout } from 'components';
import { LoginPage, SignupPage } from 'pages';
import { LinkButton } from '@grafana/ui';

export const Main: FC = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact>
        <Authenticated />
      </PrivateRoute>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/signup">
        <SignupPage />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

function Logout() {
  return (
    <PrivateLayout>
      <h2>You have been succesfully logged out</h2>
      <br />
      <LinkButton href="/" data-qa="gohome-action-button">
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

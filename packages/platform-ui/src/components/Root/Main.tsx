import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute, Authenticated, PublicLayout, PrivateLayout } from 'components';
import { LoginPage, SignupPage } from 'pages';

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
      <h2>Logout Page</h2>
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

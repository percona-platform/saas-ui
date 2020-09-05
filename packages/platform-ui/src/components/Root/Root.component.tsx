import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage, SignupPage } from 'pages';

export const RootComponent: FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>
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
  return <h2>Logout</h2>;
}

function NotFound() {
  return <h2>Page Not Found</h2>;
}

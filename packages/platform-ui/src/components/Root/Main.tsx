import React, { FC } from 'react';
import { css } from 'emotion'
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute, Authenticated, PublicLayout, PrivateLayout } from 'components';
import { LoginPage, SignupPage } from 'pages';
import { LinkButton } from '@grafana/ui';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const Main: FC = () => {
  return (
    <>
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
      <ToastContainer
        bodyClassName={css`padding: 0.5em;`}
        position="top-right"
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

import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTheme } from '@grafana/ui';
import { LoginPage, SignupPage } from 'pages';
import { getAppStyles } from './App.styles';
import logo from 'assets/percona-logo.svg';

export const App: FC = () => {
  const theme = useTheme();
  const styles = getAppStyles(theme);

  return (
    <Router>
      <main className={styles.main}>
        <div className={styles.leftZone}>
          <div className={styles.logo}>
            <img src={logo} alt="Percona Logo" />
            <h1>Percona</h1>
          </div>
          <div className={styles.description}>
            Single pane of glass for managing and monitoring the performance of your MySQL, MariaDB,
            PostgreSQL and MongoDB databases.
          </div>
        </div>
        <div className={styles.rightZone}>
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
        </div>
      </main>
    </Router>
  );
};

function Logout() {
  return <h2>Logout</h2>;
}

function NotFound() {
  return <h2>Not Found (404)</h2>;
}

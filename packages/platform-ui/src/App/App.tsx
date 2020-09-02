import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useTheme } from '@grafana/ui';
import { LoginPage } from '../pages/Login';
import { getAppStyles } from './App.styles';
import logo from '../assets/percona-logo.svg';

export const App: FC = () => {
  const theme = useTheme();
  const styles = getAppStyles(theme);

  return (
    <Router>
      <>
        <nav>
          <ul className={styles.menu}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
          </ul>
        </nav>

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
                <Home />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <Signup />
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
      </>
    </Router>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function Logout() {
  return <h2>Logout</h2>;
}

function Signup() {
  return <h2>Sign up</h2>;
}

function NotFound() {
  return <h2>Not Found (404)</h2>;
}

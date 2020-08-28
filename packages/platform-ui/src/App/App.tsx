import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { styles } from "./App.styles";
import logo from "../assets/percona-logo.svg";

export const App: FC = () => {
  return (
    <Router>
      <main className={styles.root}>
        <img src={logo} alt="Percona Logo" />
        <nav>
          <ul>
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
          </ul>
        </nav>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function Login() {
  return <h2>Login</h2>;
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

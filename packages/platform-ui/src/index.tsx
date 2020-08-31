import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext } from '@grafana/ui';
import { getTheme } from '@percona/platform-core';
import { App } from './App/App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// NOTE: light theme is the default
const light = getTheme('light');

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={light}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

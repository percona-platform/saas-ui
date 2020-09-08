import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeContext } from '@grafana/ui';
import { getTheme } from '@percona/platform-core';
import { Provider } from 'react-redux';
import { Main } from 'components';
import { store } from './store';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { css } from 'emotion'

import 'react-toastify/dist/ReactToastify.min.css';
import './styles/font-awesome.css';
import './styles/global.css';
import * as serviceWorker from './serviceWorker';

/**
 * NOTE: @grafana/ui does not seem to import font-awesome icons, so no easy
 * way to get faSpinner icon rendered other than to import fontawesome :|
 */

/**
 * NOTE: light theme is the default
 * TODO: move the current theme value to the store
 */
const light = getTheme('light');

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={light}>
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
        <ToastContainer
          bodyClassName={css`padding: 0.5em;`}
          position={toast.POSITION.TOP_RIGHT}
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
      </Provider>
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

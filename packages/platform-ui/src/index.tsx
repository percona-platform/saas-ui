import React from 'react';
import ReactDOM from 'react-dom';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { Provider, ReactReduxContext } from 'react-redux';
import { ThemeContext } from '@grafana/ui';
import { css } from 'emotion';
import { getTheme } from '@percona/platform-core';
import { Main } from 'components';
import { store } from 'store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'core/history';

import 'react-toastify/dist/ReactToastify.min.css';
import './styles/font-awesome.css';
import './styles/global.css';

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
      <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter context={ReactReduxContext} history={history}>
          <Main />
        </ConnectedRouter>
        <ToastContainer
          bodyClassName={css`
            padding: 0.5em;
          `}
          position={toast.POSITION.TOP_RIGHT}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
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

// expose store during tests
// TODO: add Cypress and store to the window type.
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
if (window.Cypress) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  window.store = store;
}

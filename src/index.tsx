import React from 'react';
import ReactDOM from 'react-dom';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { Provider, ReactReduxContext, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { css } from 'emotion';
import { ThemeContext } from '@grafana/ui';
import { Main } from 'components';
import { store } from 'store';
import { getCurrentTheme } from 'store/theme';
import { history } from 'core/history';

import 'react-toastify/dist/ReactToastify.min.css';
import './styles/font-awesome.css';
import './styles/global.css';

/**
 * NOTE: @grafana/ui does not seem to import font-awesome icons, so no easy
 * way to get faSpinner icon rendered other than to import fontawesome :|
 */

const App = () => {
  const theme = useSelector(getCurrentTheme);

  return (
      <ThemeContext.Provider value={theme}>
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
      </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// expose store during tests
if (window.Cypress) {
  window.store = store;
}

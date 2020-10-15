import React, { FC } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeContext } from '@grafana/ui';
import { Provider, ReactReduxContext } from 'react-redux';
import { getTheme } from '@percona/platform-core';
import { history } from 'core/history';
import { store } from 'store';

const light = getTheme('light');

export const TestContainer: FC = ({ children }) => (
  <React.StrictMode>
    <ThemeContext.Provider value={light}>
      <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
          {children}
        </ConnectedRouter>
      </Provider>
    </ThemeContext.Provider>
  </React.StrictMode>
);

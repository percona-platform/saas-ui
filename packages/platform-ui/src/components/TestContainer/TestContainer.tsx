import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeContext } from '@grafana/ui';
import { getTheme } from '@percona/platform-core';

const light = getTheme('light');

export const TestContainer: FC = ({ children }) => {
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={light}>
        <Router>{children}</Router>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

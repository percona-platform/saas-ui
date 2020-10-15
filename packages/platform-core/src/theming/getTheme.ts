import { GrafanaTheme } from '@grafana/data';
import darkTheme from './dark';
import lightTheme from './light';

let themeMock: ((name?: string) => GrafanaTheme) | null;

export const getTheme = (name?: string) => (themeMock && themeMock(name)) || (name === 'light' ? lightTheme : darkTheme);

export const mockTheme = (mock: (name?: string) => GrafanaTheme) => {
  themeMock = mock;

  return () => {
    themeMock = null;
  };
};

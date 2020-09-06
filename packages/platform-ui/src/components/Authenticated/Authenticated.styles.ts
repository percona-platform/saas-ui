import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  container: css`
    text-align: center;
    line-height: 2em;
    & > div:last-child {
      margin-top: 2em;
    }
  `,
  // TODO: make this work in platform-core
  logoutButton: css`
    width: 180px;
    & > span {
      justify-content: center;
      width: 100%;
    }
  `,
}));

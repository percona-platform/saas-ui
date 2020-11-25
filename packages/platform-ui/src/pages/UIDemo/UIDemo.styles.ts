import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  return {
    page: css`
      padding: ${theme.spacing.d};
    `,
  };
};

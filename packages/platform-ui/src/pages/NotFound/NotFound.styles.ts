import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { colors } = theme;

  return {
    contentWrapper: css`
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: ${colors.dashboardBg};
    `,
  };
};

import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ colors, spacing }: GrafanaTheme) => ({
  contentWrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    background-color: ${colors.dashboardBg};
    align-items: center;
    padding: 2em;
  `,
  homeButton: css`
    width: 180px;
    justify-content: center;
    margin-top: ${spacing.lg};

    a {
      color: inherit;
      text-decoration: none;
    }
  `,
  logo: css`
    width: 100%;
    min-width: 250px;
    max-width: 600px;
  `,
});

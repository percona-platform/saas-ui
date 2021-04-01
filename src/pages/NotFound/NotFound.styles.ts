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
  link: css`
    color: inherit;
    text-decoration: none;
    margin-top: ${spacing.lg};
  `,
  homeButton: css`
    width: 180px;
    padding: 0;
    justify-content: center;
  `,
  logo: css`
    width: 100%;
    min-width: 250px;
    max-width: 600px;
  `,
});

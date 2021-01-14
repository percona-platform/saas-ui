import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const {
    colors: {
      dashboardBg,
    },
    spacing: {
      lg: spacingLg,
    },
  } = theme;

  return {
    contentWrapper: css`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: ${dashboardBg};
      align-items: center;
      // TODO set this on core and change everywhere, as it's used several times
      padding: 2em;
    `,
    homeButton: css`
      width: 180px;
      justify-content: center;
      margin-top: ${spacingLg};

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
  };
};

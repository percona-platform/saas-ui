import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const {
    colors: { dashboardBg },
    spacing: { lg: spacingLg },
    breakpoints: { sm: breakpointSm, md: breakpointMg, lg: breakpointLg },
  } = theme;

  return {
    contentWrapper: css`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: ${dashboardBg};
      align-items: center;
    `,
    homeButton: css`
      width: 180px;
      justify-content: center;
      margin-top: ${spacingLg};
    `,
    logo: css`
      @media (max-width: ${breakpointSm}) {
          width: 200px;
      }
      @media (min-width: ${breakpointSm}) {
          width: 300px;
      }
      @media (min-width: ${breakpointMg}) {
          width: 470px;
      }
      @media (min-width: ${breakpointLg}) {
          width: 600px;
      }
    `,
  };
};

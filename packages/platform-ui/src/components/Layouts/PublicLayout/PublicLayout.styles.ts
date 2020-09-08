import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { breakpoints, palette, typography } = theme;

  return {
    main: css`
      display: flex;
      min-height: 100vh;
      padding: 2em;
      justify-content: space-between;
      @media (max-width: ${breakpoints.md}) {
        flex-direction: column;
        padding: 4em 2em;
        justify-content: flex-start;
      }
    `,
    leftZone: css`
      display: flex;
      flex: 0 0 35%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 2em;
    `,
    logo: css`
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
        @media (min-width: ${breakpoints.sm}) {
          width: 50px;
        }
        @media (min-width: ${breakpoints.md}) {
          width: 70px;
        }
        @media (min-width: ${breakpoints.lg}) {
          width: 100px;
        }
        margin-right: 2em;
      }
      h1 {
        font-size: 2em;
        @media (min-width: ${breakpoints.md}) {
          font-size: 2.5em;
        }
        @media (min-width: ${breakpoints.lg}) {
          font-size: 3em;
        }
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }
    `,
    centerZone: css`
      position: relative;
      flex: 0 1 10%;
      @media (max-width: ${breakpoints.md}) {
        display: none;
      }
      &:after {
        content: '';
        position: absolute;
        top: 30%;
        right: 50%;
        width: 1px;
        height: 50%;
        background-color: ${palette.gray85};
      }
    `,
    description: css`
      font-size: ${typography.size.md};
      @media (min-width: ${breakpoints.md}) {
        /* No preset value here */
        font-size: 16px;
        max-width: 350px;
        margin-bottom: 0;
      }
      @media (min-width: ${breakpoints.lg}) {
        font-size: ${typography.size.lg};
        max-width: 400px;
        margin-bottom: 0;
      }
      @media (max-width: ${breakpoints.sm}) {
        display: none;
      }
      max-width: 350px;
      margin: 2em 0 3em;
      text-align: center;
    `,
    rightZone: css`
      display: flex;
      flex: 0 1 55%;
      justify-content: center;
      align-items: center;
      padding: 0em 4em;
    `,
  };
};

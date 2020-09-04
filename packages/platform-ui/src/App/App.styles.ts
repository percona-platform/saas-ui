import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

export const getAppStyles = stylesFactory((theme: GrafanaTheme) => ({
  menu: css`
    width: 50%;
    margin: 2em auto;
    padding: 0;
    list-style-type: none;
    & > li {
      display: inline-block;
      padding: 0.5em 4em;
    }
  `,
  main: css`
    display: flex;
    min-height: 100vh;
    padding: 2em;
    justify-content: space-between;
    @media (max-width: ${theme.breakpoints.md}) {
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
      @media (min-width: ${theme.breakpoints.sm}) {
        width: 50px;
      }
      @media (min-width: ${theme.breakpoints.md}) {
        width: 70px;
      }
      @media (min-width: ${theme.breakpoints.lg}) {
        width: 100px;
      }
      margin-right: 2em;
    }
    h1 {
      font-size: 2em;
      @media (min-width: ${theme.breakpoints.md}) {
        font-size: 2.5em;
      }
      @media (min-width: ${theme.breakpoints.lg}) {
        font-size: 3em;
      }
      letter-spacing: 0.2em;
    }
  `,
  centerZone: css`
    position: relative;
    flex: 0 1 10%;
    @media (max-width: ${theme.breakpoints.md}) {
      display: none;
    }
    &:after {
      content: '';
      position: absolute;
      top: 30%;
      right: 50%;
      width: 1px;
      height: 50%;
      background-color: grey;
    }
  `,
  description: css`
    font-size: ${theme.typography.size.md};
    @media (min-width: ${theme.breakpoints.md}) {
      // No preset value here
      font-size: 16px;
      max-width: 350px;
    }
    @media (min-width: ${theme.breakpoints.lg}) {
      font-size: ${theme.typography.size.lg};
      max-width: 400px;
    }
    @media (max-width: ${theme.breakpoints.sm}) {
      display: none;
    }
    max-width: 350px;
    margin-top: 2em;
    text-align: center;
  `,
  rightZone: css`
    display: flex;
    flex: 0 1 55%;
    justify-content: center;
    align-items: center;
    padding: 0em 4em;
  `,
}));

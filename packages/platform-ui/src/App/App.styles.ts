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
    padding: 2em;
    justify-content: space-between;
  `,
  leftZone: css`
    position: relative;
    display: flex;
    flex: 0 1 45%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:after {
      content: '';
      position: absolute;
      top: 20%;
      right: 0;
      width: 1px;
      height: 60%;
      background-color: grey;
    }
  `,
  logo: css`
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 2em;
      width: 120px;
    }
    h1 {
      font-size: 3em;
      letter-spacing: 0.2em;
    }
  `,
  description: css`
    font-size: ${theme.typography.size.lg};
    margin-top: 2em;
    max-width: 400px;
    text-align: center;
  `,
  rightZone: css`
    display: flex;
    flex: 0 1 55%;
    justify-content: start;
    align-items: center;
    padding: 0em 6em;
  `,
}));

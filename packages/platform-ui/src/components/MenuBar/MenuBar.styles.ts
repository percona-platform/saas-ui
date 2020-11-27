import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { border, colors } = theme;

  const link = css`
    &:hover,
    &:active {
      background-color: ${colors.bg3};
    }
  `;

  return {
    menuBar: css`
      background-color: ${colors.pageHeaderBg};
      border-bottom: ${border.width.sm} solid ${colors.border1};
      display: flex;
      height: 60px;

      nav {
        height: 100%;

        ul {
          align-items: center;
          display: flex;
          height: 100%;
          list-style-type: none;
          margin: 0;
          padding: 0;

          li {
            height: 100%;
            width: 60px;
            position: relative;

            & > * {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            }
          }
        }
      }
    `,
    leftSide: css`
      flex: 1;

      li::before {
        content: '';
        border-right: ${border.width.sm} solid ${colors.border1};
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
      }
    `,
    rightSide: css`
      li::before {
        content: '';
        border-left: ${border.width.sm} solid ${colors.border1};
        height: 100%;
        position: absolute;
        top: 0;
      }
    `,
    perconaLogo: css`
      height: 33px;
    `,
    profileIcon: css`
      height: 23px;
    `,
    menuIcon: css`
      ${link}
      cursor: pointer;
    `,
    link: css`
      ${link}
    `,
  };
};

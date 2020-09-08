import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

const button = css`
  display: flex;
  justify-content: center;
  margin-top: 2em;
  width: 180px;
`;

export const getStyles = (theme: GrafanaTheme) => ({
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 2em;

    p {
      margin: 0.5em 0;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  `,
  // TODO: make this work in platform-core
  logoutButton: css`
    ${button}
  `,
  downloadPMMButton: css`
    ${button}
    text-decoration: none;
  `,
});

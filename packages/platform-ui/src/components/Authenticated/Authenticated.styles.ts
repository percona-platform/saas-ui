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
    }
  `,
  title: css`
    text-align: center;
    color: ${theme.colors.text};
    font-size: ${theme.typography.heading.h3};
    font-weight: ${theme.typography.weight.regular};
    margin: ${theme.spacing.formMargin};
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

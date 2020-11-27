import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

const button = css`
  display: flex;
  justify-content: center;
  margin-top: 2em;
  width: 180px;
`;

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, spacing, typography } = theme;

  return {
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
      color: ${colors.text};
      font-size: ${typography.heading.h3};
      font-weight: ${typography.weight.regular};
      margin: ${spacing.formMargin};
    `,
    email: css`
      font-style: italic;
      font-weight: ${typography.weight.bold};
    `,
    // TODO: make this work in platform-core
    logoutButton: css`
      ${button}
    `,
    downloadPMMButton: css`
      ${button}
      text-decoration: none;
    `,
  };
};

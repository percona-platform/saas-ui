import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

const centeredButton = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, spacing, typography } = theme;

  const externalLink = css`
    color: ${colors.linkExternal};
    text-decoration: none;
  `;

  return {
    legend: css`
      font-size: ${typography.heading.h3};
      font-weight: ${typography.weight.regular};
      margin: ${spacing.formMargin};
      text-align: center;
    `,
    link: css`
      font-size: 1em;
      height: 1em;
      padding: 0;
      vertical-align: baseline;
    `,
    form: css`
      max-width: 325px;
      min-width: 250px;
      width: 100%;
    `,
    divider: css`
      margin: 1em 0px;
      text-align: center;
    `,
    submitButton: css`
      ${centeredButton}
      margin-bottom: ${spacing.formInputMargin};
    `,
    loginButton: css`
      ${centeredButton}
      margin-bottom: ${spacing.formInputMargin};
    `,
    gotoSignup: css`
      ${centeredButton}
      ${externalLink}
    `,
    resetPasswordLinkWrapper: css`
      margin-bottom: ${spacing.xl};
    `,
    resetPasswordLink: css`
      ${externalLink}
    `,
  };
};

import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

const centeredButton = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  legend: css`
    color: ${theme.colors.text};
    font-size: ${theme.typography.heading.h3};
    font-weight: ${theme.typography.weight.regular};
    margin: ${theme.spacing.formMargin};
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
    margin: 1.5em 0px;
    text-align: center;
  `,
  submitButton: css`
    ${centeredButton}
    margin-bottom: ${theme.spacing.formInputMargin};
  `,
  signupButton: css`
    ${centeredButton}
    margin-bottom: ${theme.spacing.formInputMargin};
  `,
  gotoLogin: css`
    ${centeredButton}
    color: ${theme.colors.linkExternal};
    text-decoration: none;
  `,
}));

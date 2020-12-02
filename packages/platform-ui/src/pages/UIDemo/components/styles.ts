import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

const centeredButton = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const getStyles = (theme: GrafanaTheme) => ({
  legend: css`
    color: ${theme.colors.text};
    font-size: ${theme.typography.size.md};
    font-weight: ${theme.typography.weight.regular};
    margin: ${theme.spacing.formMargin} 0;
  `,
  link: css`
    font-size: 1em;
    height: 1em;
    padding: 0;
    vertical-align: baseline;
  `,
  linkButton: css`
    vertical-align: baseline;
  `,
  form: css`
    max-width: 400px;
    min-width: 250px;
    width: 100%;
  `,
  submitButton: css`
    ${centeredButton}
    margin-bottom: ${theme.spacing.formInputMargin};
  `,
});

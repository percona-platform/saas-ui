import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

const centeredButton = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, spacing, typography } = theme;

  return {
    legend: css`
      color: ${colors.text};
      font-size: ${typography.size.md};
      font-weight: ${typography.weight.regular};
      margin: ${spacing.formMargin} 0;
    `,
    link: css`
      font-size: 1em;
      height: 1em;
      padding: 0;
      vertical-align: baseline;
    `,
    linkButton: css`
      vertical-align: baseline;
      padding: 0 ${spacing.sm};
      font-weight: ${typography.weight.regular};
    `,
    tuningCheckbox: css`
      margin-bottom: 10px;
    `,
    dropdownToggle: css`
      padding: 5px 10px;
    `,
    loaderButton: css`
      justify-content: center;
      width: 150px;
    `,
    sizeSelect: css`
      max-width: 150px;
    `,
    sizeSelectLabel: css`
      margin-top: 10px;
    `,
    form: css`
      max-width: 400px;
      width: 100%;
    `,
    wideForm: css`
      max-width: 600px;
      width: 100%;
    `,
    submitButton: css`
      ${centeredButton}
      margin-bottom: ${spacing.formInputMargin};
    `,
  };
};

import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, spacing, typography } = theme;

  return {
    legend: css`
      color: ${colors.text};
      font-size: ${typography.size.md};
      font-weight: ${typography.weight.regular};
      margin: ${spacing.formMargin} 0;
    `,
    state: css`
      font-style: italic;
      font-size: ${typography.size.sm};
    `,
    component: css`
      font-weight: ${typography.weight.bold}
    `,
  };
};

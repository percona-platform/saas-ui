import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, spacing, typography } = theme;

  return {
    page: css`
      padding: 0;
    `,
    legend: css`
      margin-bottom: ${spacing.lg};
      color: ${colors.text};
      font-size: ${typography.size.lg};
    `,
  };
};

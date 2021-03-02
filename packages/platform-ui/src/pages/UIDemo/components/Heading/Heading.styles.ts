import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, spacing, typography } = theme;

  return {
    heading: css`
      color: ${colors.text};
      font-size: ${typography.size.lg};
      font-weight: ${typography.weight.bold};
      margin: ${spacing.xl} 0 ${spacing.md};
      border-bottom: 1px solid ${colors.pageHeaderBorder};
    `,
  };
};

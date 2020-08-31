import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  errorMessage: css`
    color: ${theme.palette.red};
    font-size: ${theme.typography.size.sm};
    height: ${theme.typography.size.sm};
    line-height: ${theme.typography.lineHeight.sm};
    margin-top: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.xs};
  `,
  label: css`
    font-size: ${theme.typography.size.sm};
    font-weight: ${theme.typography.weight.semibold};
    line-height: 1.25;
    margin: ${theme.spacing.formLabelMargin};
    padding: ${theme.spacing.formLabelPadding};
    color: ${theme.colors.formLabel};
    max-width: 480px;
  `,
  field: css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${theme.spacing.formSpacingBase * 2}px;
  `,
}));

import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, spacing, typography } = theme;

   return {
    wrapper: css`
      display: flex;
      justify-content: center;
    `,
    form: css`
      flex: 1;
      max-width: 600px;
    `,
    legend: css`
      font-size: ${typography.heading.h3};
      font-weight: ${typography.weight.regular};
      margin: ${spacing.formMargin};
      text-align: center;
      color: ${colors.text};
    `,
    nameFields: css`
      display: flex;

      & > * {
        flex: 1;
        justify-content: space-between;

        &:not(:last-child) {
          margin-right: 16px;
        }
      }
    `,
    buttonWrapper: css`
      display: flex;
      justify-content: flex-end;
    `,
  };
};

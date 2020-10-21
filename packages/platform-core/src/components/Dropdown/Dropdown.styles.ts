import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { spacing, height, colors, border } = theme;

  return {
    dropdownMenu: css`
      display: flex;
      flex-direction: column;
      border-radius: ${border.radius.md};
      box-shadow: 0 0 ${spacing.sm} 0 ${colors.dropdownShadow};

      & > * {
        justify-content: flex-start;
        height: ${height.md};
        padding: ${spacing.sm} ${spacing.md};
        align-items: center;
        background-color: ${colors.dropdownBg};
        cursor: pointer;
        text-align: center;

        &:hover,
        &:active {
          background-color: ${colors.dropdownOptionHoverBg};
        }

        &:not(:last-child) {
          border-bottom: ${border.width.sm} solid ${colors.border1};
        }
      }
    `,
  };
});

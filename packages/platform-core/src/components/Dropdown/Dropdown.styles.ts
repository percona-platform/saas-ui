import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { spacing, colors, border } = theme;

  return {
    dropdownMenu: css`
      display: flex;
      flex-direction: column;
      background-color: ${colors.dropdownBg};
      border-radius: ${border.radius.md};
      box-shadow: 0 0 ${spacing.sm} 0 ${colors.dropdownShadow};
      padding: ${spacing.xs} 0;

      & > * {
        justify-content: flex-start;
        padding: ${spacing.sm} ${spacing.md};
        align-items: center;
        cursor: pointer;
        min-width: 120px;

        &:hover,
        &:active, &.active {
          background-color: ${colors.dropdownOptionHoverBg};
        }

        &:not(:last-child) {
          border-bottom: ${border.width.sm} solid ${colors.border1};
        }
        &:first-child {
          border-top-left-radius: ${border.radius.md};
          border-top-right-radius: ${border.radius.md};
        }
        &:last-child {
          border-bottom-left-radius: ${border.radius.md};
          border-bottom-right-radius: ${border.radius.md};
        }
      }
    `,
  };
});

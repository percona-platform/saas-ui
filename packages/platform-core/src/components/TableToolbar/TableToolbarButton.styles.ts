import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => {
  const {
    colors, typography, spacing,
  } = theme;

  return {
    button: css`
      align-items: center;
      background: none;
      border: none;
      color: ${colors.text};
      cursor: pointer;
      display: flex;
      font-size: ${typography.size.md};
      outline: inherit;

      svg {
        stroke: ${colors.text};
      }

      &:disabled {
        color: ${colors.textWeak};
        cursor: not-allowed;

        svg {
          stroke: ${colors.textWeak};
        }
      }

      span {
        margin-left: ${spacing.xs};
      }
    `,
  };
};

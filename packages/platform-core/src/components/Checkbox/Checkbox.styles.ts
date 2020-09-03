import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import { css } from 'emotion';

export const getLabelStyles = stylesFactory((theme: GrafanaTheme) => ({
  label: css``,
}));

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors, spacing } = theme;
  const checkboxSize = '16px';

  return {
    field: css`
      &:not(:last-child) {
        margin-bottom: ${spacing.formInputMargin};
      }
    `,
    label: css`
      font-size: ${theme.typography.size.md};
      font-weight: ${theme.typography.weight.semibold};
      line-height: 1.25;
      padding: ${theme.spacing.formLabelPadding};
      color: ${theme.colors.formLabel};
      padding-left: ${spacing.formSpacingBase}px;
    `,
    wrapper: css`
      position: relative;
      padding-left: ${checkboxSize};
      vertical-align: middle;
    `,
    input: css`
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      &:focus + span {
        outline: 2px dotted transparent;
        outline-offset: 2px;
        box-shadow: 0 0 0 2px ${colors.panelBg}, 0 0 0px 4px ${colors.formFocusOutline};
        transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);
      }
      &:checked + span {
        background: blue;
        background: ${colors.formCheckboxBgChecked};
        border: none;
        &:hover {
          background: ${colors.formCheckboxBgCheckedHover};
        }
        &:after {
          content: '';
          position: absolute;
          left: 5px;
          top: 1px;
          width: 6px;
          height: 12px;
          border: solid ${colors.formCheckboxCheckmark};
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }
    `,
    checkmark: css`
      display: inline-block;
      width: ${checkboxSize};
      height: ${checkboxSize};
      border-radius: ${theme.border.radius.sm};
      margin-right: ${theme.spacing.formSpacingBase}px;
      background: ${colors.formInputBg};
      border: 1px solid ${colors.formInputBorder};
      position: absolute;
      top: 1px;
      left: 0;
      &:hover {
        cursor: pointer;
        border-color: ${colors.formInputBorderHover};
      }
    `,
    errorMessage: css`
      color: ${theme.palette.red};
      font-size: ${theme.typography.size.sm};
      height: ${theme.typography.size.sm};
      line-height: ${theme.typography.lineHeight.sm};
      margin-top: ${theme.spacing.sm};
      margin-bottom: ${theme.spacing.xs};
    `,
  };
});

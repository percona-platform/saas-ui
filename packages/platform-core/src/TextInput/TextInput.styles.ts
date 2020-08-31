import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors, palette, spacing, typography } = theme;
  return {
    field: css`
      &:not(:last-child) {
        margin-bottom: ${spacing.formInputMargin};
      }
    `,
    errorMessage: css`
      color: ${palette.redBase};
      font-size: ${typography.size.sm};
      height: ${typography.size.sm};
      line-height: ${typography.lineHeight.sm};
      margin: ${spacing.formValidationMessageMargin};
      padding: ${spacing.formLabelPadding};
    `,
    label: css`
      display: block;
      text-align: left;
      font-size: ${typography.size.md};
      font-weight: ${typography.weight.semibold};
      line-height: 1.25;
      margin: ${spacing.formLabelMargin};
      padding: ${spacing.formLabelPadding};
      color: ${colors.formLabel};
    `,
    input: css`
      background-color: ${colors.formInputBg};
      line-height: ${typography.lineHeight.md};
      font-size: ${typography.size.md};
      color: ${colors.formInputText};
      position: relative;
      z-index: 0;
      height: ${spacing.formInputHeight};
      width: 100%;
      border-width: 1px;
      border-style: solid;
      border-color: ${colors.formInputBorder};
      &.invalid {
        border-color: ${colors.formInputBorderInvalid};
        &:hover {
          border-color: ${colors.formInputBorderInvalid};
        }
      }
      &:hover {
        border-color: ${colors.formInputBorderHover};
      }
      &[disabled]: {
        background-color: ${colors.formInputBgDisabled};
        color: ${colors.formInputDisabledText};
      }
      border-image: initial;
      padding: 7px 8px;
      border-radius: 2px;
      outline: transparent dotted 2px;
      &:focus {
        outline-offset: 2px;
        box-shadow: rgb(255, 255, 255) 0px 0px 0px 2px, rgb(87, 148, 242) 0px 0px 0px 4px;
        outline: none;
        transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1) 0s;
      }
    `,
  };
});

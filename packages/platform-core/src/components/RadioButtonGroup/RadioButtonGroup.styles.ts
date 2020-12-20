import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

export const getCSSStyles = (theme: GrafanaTheme) => {
  const {
    border, colors, spacing, typography,
  } = theme;

  return {
    field: css`
      &:not(:last-child) {
        margin-bottom: ${spacing.formInputMargin};
      }
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
      width: 100%;
      border-width: ${border.width.sm};
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
      &:disabled {
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
};

export const getStyles = (theme: GrafanaTheme) => {
  const {
    colors, palette, spacing, typography,
  } = theme;

  return {
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
    field: css`
      position: relative;
      &:not(:last-child) {
        margin-bottom: ${spacing.formInputMargin};
      }
      label {
        border-radius: 0px;
        &:first-of-type {
          border-radius: 2px 0px 0px 2px;
        }
        &:last-of-type {
          border-radius: 0px 2px 2px 0px;
        }
      }
    `,
    input: css`
      display: none;
    `,
    icon: css`
      margin-right: 6px;
    `,
  };
};

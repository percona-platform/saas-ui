import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = (theme: GrafanaTheme) => {
  const { colors, spacing, zIndex, breakpoints } = theme;
  return {
    wrapper: css`
      position: relative;
    `,
    background: css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${zIndex.modalBackdrop};
      background-color: ${colors.bg3};
      opacity: 0.7;
    `,
    body: css`
      position: fixed;
      top: 50%;
      transform: translate(0px, -50%);
      z-index: ${zIndex.modal};
      background: ${colors.bodyBg};
      box-shadow: 0 0 20px ${colors.dropdownShadow};
      background-clip: padding-box;
      outline: none;
      width: 100%;
      max-width: 90%;
      @media (min-width: ${breakpoints.sm}) {
        width: 80%;
      }
      @media (min-width: ${breakpoints.md}) {
        width: 70%;
      }
      @media (min-width: ${breakpoints.lg}) {
        width: 60%;
      }
      @media (min-width: ${breakpoints.xl}) {
        width: 50%;
      }
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    `,
    modalHeader: css`
      label: modalHeader;
      background: ${colors.bg2};
      border-bottom: 1px solid ${colors.pageHeaderBorder};
      display: flex;
      height: 3em;
      align-items: center;
      justify-content: space-between;
      padding-left: ${spacing.d};
    `,
    content: css`
      padding: ${spacing.d};
      overflow: auto;
      width: 100%;
      max-height: calc(90vh - ${spacing.d});
    `,
    modalHeaderClose: css`
      height: 100%;
      width: 3em;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
  }
};

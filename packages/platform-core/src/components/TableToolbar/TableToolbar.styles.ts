import { css } from 'emotion';

export const getStyles = () => ({
  wrapper: css`
    display: flex;

    & > :not(:last-child) {
      margin-right: 30px;
    }
  `,
});

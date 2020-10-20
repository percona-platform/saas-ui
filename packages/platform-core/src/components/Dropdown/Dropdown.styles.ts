import { css } from 'emotion';

export const getStyles = () => {
  return {
    dropdownContainer: css`
      display: flex;
      width: 2px;
      flex-direction: column;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.14);
      padding: 5px;
    `,
    dropdownItem: css`
      justify-content: flex-start;
      height: 40px;
      padding-right: 10px;
      padding-left: 10px;
      align-items: center;

      &:hover {
        background-color: #00ffff;
      }
      &:active {
        font-weight: 700;
        color: #00ffff;
      }
    `,
  };
};

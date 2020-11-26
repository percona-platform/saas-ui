import React, { FC } from 'react';

export const ThemeLight: FC = (props) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" role="img" aria-labelledby="title" {...props} xmlns="http://www.w3.org/2000/svg">
      <title id="title">Light theme</title>
      <g stroke="#000" strokeLinecap="round" strokeLinejoin="round">
        <path clipRule="evenodd" d="M16.5 12.5c0 2.209-1.791 4-4 4-2.21 0-4-1.791-4-4 0-2.21 1.79-4 4-4 2.209 0 4 1.79 4 4v0z" />
        <path d="M13 1v4M13 20v4M4.36816 4.36816l2.827 2.829M17.8027 17.8027l2.829 2.83M1 13h4M20 13h4M4.36816 20.6327l2.827-2.83M17.8027 7.19741l2.829-2.829" />
      </g>
    </svg>
  );
};

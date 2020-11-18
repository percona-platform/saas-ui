import React, { FC } from 'react';

export const TableToolbarDelete: FC = (props) => (
  <svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10.273 7H3.727" strokeLinecap="round" strokeLinejoin="round" />
    <path
      clipRule="evenodd"
      d="M13 13H1V1h12v12z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

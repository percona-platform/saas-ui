import React, { FC } from 'react';
import { PrivateLayout } from 'components';

export const Authenticated: FC = () => {
  return (
    <PrivateLayout>
      <div>
        <h3>You have successfully</h3>
        <h3>logged in</h3>
        <h3>as user@company.com</h3>
      </div>
    </PrivateLayout>
  );
};

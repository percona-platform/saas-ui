import React, { FC } from 'react';
import { Anonymous } from 'components/Anonymous';
import { RootComponent } from './Root.component';

export const RootRoute: FC = () => {
  /**
   * NOTE: need a logic here that would verify the authentication/session
   */
  const session = false;
  if (session) {
    return <Authenticated />;
  } else {
    return (
      <Anonymous>
        <RootComponent />
      </Anonymous>
    );
  }
};

function Authenticated() {
  return (
    <div>
      <h3>You have successfully</h3>
      <h3>logged in</h3>
      <h3>as user@company.com</h3>
    </div>
  );
}

import React, { FC } from 'react';
import { Form } from 'react-final-form';

export const dataQa = (selector: string) => `[data-qa="${selector}"]`;

export const FormWrapper: FC = ({ children }) => (
  <Form onSubmit={() => {}}>
    {() => (
      <form>{children}</form>
    )}
  </Form>
);

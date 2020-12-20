import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Button, useStyles, HorizontalGroup } from '@grafana/ui';
import { RadioButtonGroupField, validators } from '@percona/platform-core';
import { Legend } from '../Legend';
import { getStyles } from '../styles';

const { required } = validators;
const options = [
  { label: 'Short', value: 'short' },
  { label: 'Medium', value: 'medium', disabled: true, icon: 'clock' },
  { label: 'Long retention label', value: 'long' },
];
const initialValues = { retention: 'short' };
/* eslint-disable-next-line no-alert,no-magic-numbers */
const prettify = (values: any) => () => alert(`Submit values:\n${JSON.stringify(values, null, 2)}`);

const RadioButtonGroupState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit} initialValues={initialValues}>
      {({ form, handleSubmit, pristine, values }: FormRenderProps) => (
        <form data-qa="radio-button-group-demo-form" className={styles.wideForm} onSubmit={handleSubmit}>
          <Legend
            name="RadioButtonGroupField"
            src="/Buttons/RadioButtonGroups.tsx#L8"
            state="State: [elem1: enabled, elem2: disabled, elem3: enabled], validation: required, initialValue: 'short'"
          />
          <RadioButtonGroupField
            name="retention"
            label="Retention"
            options={options}
            validators={[required]}
            required
          />
          <HorizontalGroup>
            <Button type="submit" onClick={prettify(values)}>Submit</Button>
            <Button type="reset" onClick={form.reset} disabled={pristine}>Reset</Button>
          </HorizontalGroup>
        </form>
      )}
    </Form>
  );
};

const RadioButtonGroupState2: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit} initialValues={initialValues}>
      {({ form, handleSubmit, pristine, values }: FormRenderProps) => (
        <form data-qa="radio-button-group-demo-form" className={styles.wideForm} onSubmit={handleSubmit}>
          <Legend
            name="RadioButtonGroupField"
            src="/Buttons/RadioButtonGroups.tsx#L45"
            state="State: [elem1: enabled, elem2: disabled, elem3: enabled], validation: required, initialValue: 'short'"
          />
          <RadioButtonGroupField
            name="retention"
            label="Retention"
            options={options}
            validators={[required]}
            required
          />
          <HorizontalGroup>
            <Button type="submit" onClick={prettify(values)}>Submit</Button>
            <Button type="reset" onClick={form.reset} disabled={pristine}>Reset</Button>
          </HorizontalGroup>
        </form>
      )}
    </Form>
  );
};

export const RadioButtonGroups: FC = () => (
  <>
    <RadioButtonGroupState1 />
    <RadioButtonGroupState2 />
  </>
);

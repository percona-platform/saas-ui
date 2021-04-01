import React, { FC, useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { SelectableValue } from '@grafana/data';
import { Label, Select, useStyles } from '@grafana/ui';
import { TextareaInputField, validators } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';
import { getStyles } from '../styles';

const { required } = validators;

const TextareaInputFieldState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="textarea-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextareaInputField"
            src="/FormFields/TextareaInputFields.tsx#L10-L30"
            state="State: enabled, validation: required"
          />
          <TextareaInputField name="description" label="Description" validators={[required]} required />
        </form>
      )}
    </Form>
  );
};

const MIN_LENGH = 6;
const minLength = validators.minLength(MIN_LENGH);

const TextareaInputFieldState2: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="textarea-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextareaInputField"
            src="/FormFields/TextareaInputFields.tsx#L32-L53"
            state="State: enabled, validation: minLengh(6)"
          />
          <TextareaInputField name="message" label="Message" validators={[minLength]} />
        </form>
      )}
    </Form>
  );
};

const TextareaInputFieldState3: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="textarea-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextareaInputField"
            src="/FormFields/TextareaInputFields.tsx#L55-L73"
            state="State: enabled, validation: none, rows: 2"
          />
          <TextareaInputField name="configuration" label="Configuration" rows={2} />
        </form>
      )}
    </Form>
  );
};

const TextareaInputFieldState4: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="textarea-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextareaInputField"
            src="/FormFields/TextareaInputFields.tsx#L75-L93"
            state="State: disabled, validation: none"
          />
          <TextareaInputField name="comment" label="Comment" disabled />
        </form>
      )}
    </Form>
  );
};

const RESIZE_OPTIONS: Array<SelectableValue<'vertical' | 'horizontal' | 'both'>> = [
  {label: 'vertical (default)', value: 'vertical'},
  {label: 'horizontal', value: 'horizontal'},
  {label: 'both', value: 'both'},
];

const TextareaInputFieldState5: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  const [resize, setResize] = useState(RESIZE_OPTIONS[0]);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="textarea-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextareaInputField"
            src="/FormFields/TextareaInputFields.tsx#L95-L128"
            state="State: enabled, validation: none, extra: selectable resize direction"
          />
          <TextareaInputField name="comment" label="Comment" resize={resize.value} />
          <Label className={styles.sizeSelectLabel}>Size</Label>
          <Select
            className={styles.sizeSelect}
            value={resize}
            onChange={(selectedResize) => { setResize(selectedResize);}}
            options={RESIZE_OPTIONS}
          />
        </form>
      )}
    </Form>
  );
};

// TODO: consider one component per file for easier file referencing
export const TextareaInputFields: FC = () => (
  <>
    <Heading title="TextareaInputField" />
    <TextareaInputFieldState1 />
    <TextareaInputFieldState2 />
    <TextareaInputFieldState3 />
    <TextareaInputFieldState4 />
    <TextareaInputFieldState5 />
  </>
);

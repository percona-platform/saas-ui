import React, { FC, ReactNode, useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { FormApi } from 'final-form';
import { Step, StepStatus } from './Step/Step';
import { styles } from './StepProgress.styles';

export interface StepProgressProps {
  steps: Step[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
}

export interface Step {
  render: (props: FormRenderProps) => ReactNode;
  title?: string;
  fields: string[];
  dataQa?: string;
}

const getStepStatus = (form: FormApi, fields: string[], currentStep: number, index: number): StepStatus => {
  if (currentStep === index) {
    return StepStatus.current;
  }

  const touched = fields.find((field) => form.getFieldState(field)?.touched) !== undefined;
  const valid = fields.find((field) => form.getFieldState(field)?.invalid) === undefined;

  if (touched) {
    return valid ? StepStatus.done : StepStatus.invalid;
  }

  return StepStatus.todo;
};

export const StepProgress: FC<StepProgressProps> = ({
  steps,
  initialValues,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({form, handleSubmit, ...props}) => (
          <form
            onSubmit={handleSubmit}
            className={styles.stepProgressWrapper}
            data-qa="step-progress"
          >
            {steps.map(({ render, title, fields, dataQa }, index) => (
              <Step
                key={index}
                title={title}
                number={index + 1}
                onClick={() => setCurrentStep(index)}
                status={getStepStatus(form, fields, currentStep, index)}
                isLast={index === steps.length - 1}
                dataQa={dataQa}
              >
                {render({form, handleSubmit, ...props})}
              </Step>
            ))}
          </form>
        )}
    />
  );
};

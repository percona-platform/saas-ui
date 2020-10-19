import React, {
  FC, ReactNode, useCallback, useState,
} from 'react';
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

const getStepStatus = (
  form: FormApi,
  fields: string[],
  currentStep: number,
  index: number,
  stepsVisited: number[],
): StepStatus => {
  if (currentStep === index) {
    return StepStatus.current;
  }

  const valid = fields.find((field) => form.getFieldState(field)?.invalid) === undefined;
  const visited = stepsVisited.includes(index);

  if (visited) {
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
  const [stepsVisited, setStepsVisited] = useState([currentStep]);
  const onClick = useCallback((index: number) => () => {
    setCurrentStep(index);
    setStepsVisited([...stepsVisited, index]);
  }, [stepsVisited]);

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ form, handleSubmit, ...props }) => (
        <form
          onSubmit={handleSubmit}
          className={styles.stepProgressWrapper}
          data-qa="step-progress"
        >
          {steps.map(({
            render, title, fields, dataQa,
          }, index) => (
            <Step
              // TODO: fix this line
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              title={title}
              number={index + 1}
              onClick={onClick(index)}
              status={getStepStatus(form, fields, currentStep, index, stepsVisited)}
              isLast={index === steps.length - 1}
              dataQa={dataQa}
            >
              {render({ form, handleSubmit, ...props })}
            </Step>
          ))}
        </form>
      )}
    />
  );
};

import { Validator } from './validator.types';

export const containsUppercase: Validator = (value: string) => {
  const casesRegexp = /^(?=.*[A-Z])/gm;

  if (casesRegexp.test(value)) {
    return undefined;
  }

  return 'Must include at least one uppercase letter';
};

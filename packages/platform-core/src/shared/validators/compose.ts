import { Validator, VResult } from './validator.types';

export const compose = (...validators: Validator[]) => (
  value: any,
  values?: Record<string, any>,
  meta?: any,
): VResult => {
  let result: string | undefined;

  // eslint-disable-next-line no-restricted-syntax
  for (const validator of validators) {
    result = validator(value, values, meta);
    if (result !== undefined) {
      break;
    }
  }

  return result;
};

import { minLength } from './minLength';

describe('Validator minLength::', () => {
  it('Should return undefined if the string length is equal to or greater than required', () => {
    const validator = minLength(8);

    expect(validator('12345678')).toBeUndefined();
    expect(validator('0123xYz456W')).toBeUndefined();
  });

  it('Should return an error if the string length is less than required', () => {
    const length = 8;
    const validator = minLength(length);

    expect(validator('1234567')).toEqual(`Must contain at least ${length} characters`);
    expect(validator('0')).toEqual(`Must contain at least ${length} characters`);
  });
});

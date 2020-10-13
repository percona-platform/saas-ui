import { containsUppercase } from './containsUppercase';

describe('validators :: containsUppercase', () => {
  it('returns an error if there are no uppercase characters in the passed string', () => {
    expect(containsUppercase('test')).toEqual('Must include at least one uppercase letter');
    expect(containsUppercase('Test')).toEqual(undefined);
    expect(containsUppercase('TEST')).toEqual(undefined);
  });
});

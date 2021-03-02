import { slugify } from './Heading.utils';

describe('Heading utils', () => {
  test('slugify', () => {
    expect(slugify('this is a test')).toBe('this-is-a-test');
    expect(slugify('this is 1 test')).toBe('this-is-1-test');
    expect(slugify('this is 1 HELL o/ 4 ~XXX £™¢§¡ˆ§¶ test')).toBe('this-is-1-hell-o-4-xxx-test');
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
    expect(slugify('\n')).toBe('');
    expect(slugify('\n \t')).toBe('');
    expect(slugify('------------')).toBe('-');
    expect(slugify('fda-fdas-fdas-')).toBe('fda-fdas-fdas-');
    expect(slugify('fda-fdas-fdas    -')).toBe('fda-fdas-fdas-');
    expect(slugify('      fdashlkd hlfh alkf 1k /r34 lfda-fdas-fdas    -')).toBe('fdashlkd-hlfh-alkf-1k-r34-lfda-fdas-fdas-');
    expect(slugify('  \n    fdashlkd hlfh alkf 1k /r34 lfda-fdas-fdas   \n -')).toBe('fdashlkd-hlfh-alkf-1k-r34-lfda-fdas-fdas-');
  });
});

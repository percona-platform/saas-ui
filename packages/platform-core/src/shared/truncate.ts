/**
 * Truncate a long string by appending ... at the and
 */

export const truncate = (length: number = 30) => (str: string = '') => {
  if (typeof str !== 'string') {
    return str;
  }

  return `${str.substr(0, length - 3)}...`;
 };


export enum LOG_LEVELS {
  DEBUG = 'DEBUG',
  LOG = 'LOG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
};

export const LOG_LEVEL = process.env.LOG_LEVEL || LOG_LEVELS.LOG;

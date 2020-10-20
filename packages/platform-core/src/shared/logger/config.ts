
export enum LOG_LEVELS {
  DEBUG,
  LOG,
  INFO,
  WARN,
  ERROR,
};

export const LOG_LEVEL = parseInt(process.env.REACT_APP_LOG_LEVEL!, 10) || LOG_LEVELS.DEBUG;

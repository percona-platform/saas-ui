/* eslint-disable no-console */
import { LOG_LEVELS, LOG_LEVEL } from './config';
import { truncate } from '../truncate';

const createLogMethod = (
  loggerFunc: (...attrs: Array<any>) => void,
  level: keyof typeof LOG_LEVELS,
) => (...attrs: Array<any>) => {
  if (LOG_LEVEL <= level) {
    console.group(level, truncate(25)(attrs[0]));
    loggerFunc(`[${level}]`, ...attrs);
    console.groupEnd();
  }
};

export const debug = createLogMethod(console.debug, LOG_LEVELS.DEBUG);
export const log = createLogMethod(console.log, LOG_LEVELS.LOG);
export const info = createLogMethod(console.info, LOG_LEVELS.INFO);
export const warn = createLogMethod(console.warn, LOG_LEVELS.WARN);
export const error = createLogMethod(console.error, LOG_LEVELS.ERROR);
/* eslint-enable no-console */

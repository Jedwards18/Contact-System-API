/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import pino from 'pino';

const logLevel = process.env.LOG_LEVEL || 'debug';

const logger = pino({
  name: 'Contact Entry System',
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
});

//Change
export enum Events {
  InitializingDatabase = 'InitializingDatabase',
  SeedingCollection = 'SeedingCollection',
  GetContacts = 'GetContacts',
  GetSpecificContact = 'GetSpecificContact',
  GetCallList = 'GetCallList',
  DeleteContact = 'DeleteContact',
  CreateNewContact = 'CreateNewContact',
  UpdateContact = 'UpdateContact',
  InputError = 'InputError',
  SigTerm = 'SigTerm',
  Other = 'Other',
}

export enum LogLevels {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Trace = 'trace',
}

export const logEvent = (level: LogLevels, event: Events, message: string, meta: any = undefined): void => {
  const eventLevelObject = { cclevel: level, ccevent: event, ...meta };

  switch (level) {
    case LogLevels.Fatal:
      logger.fatal(eventLevelObject, message);
      break;
    case LogLevels.Error:
      logger.error(eventLevelObject, message);
      break;
    case LogLevels.Warn:
      logger.warn(eventLevelObject, message);
      break;
    case LogLevels.Info:
      logger.info(eventLevelObject, message);
      break;
    case LogLevels.Debug:
      logger.debug(eventLevelObject, message);
      break;
    case LogLevels.Trace:
      logger.trace(eventLevelObject, message);
      break;
    default:
      logger.info(eventLevelObject, message);
  }
};

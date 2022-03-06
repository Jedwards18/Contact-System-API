import pino from 'pino';
import { Events, LogLevels } from '@/enums/logging';

const logLevel = process.env.LOG_LEVEL || 'debug';

const logger = pino({
  name: 'Contact Entry System',
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
});

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

import { createLogger, format, transports } from 'winston';

const customFormat = format.combine(
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.printf(
    (entry) => ` ${entry.timestamp} ${entry.level}: ${entry.message}`,
  ),
  format.colorize({ all: true, colors: { info: 'blue' } }),
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.File({ filename: `${__dirname}/../../logs/traffic.log` }),
    new transports.File({
      filename: `${__dirname}/../../logs/errors.log`,
      level: 'error',
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: `${__dirname}/../../logs/exceptions-rejections.log`,
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `${__dirname}/../../logs/exceptions-rejections.log`,
    }),
  ],
});

logger.add(
  new transports.Console({
    format: customFormat,
  }),
);
export default logger;

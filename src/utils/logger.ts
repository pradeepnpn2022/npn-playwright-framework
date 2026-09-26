import * as winston from 'winston';
import * as path from 'path';

const logDir = path.join(__dirname, '../logs');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return stack ? `${timestamp} [${level}]: ${message} ${stack}` : `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.colorize() }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log'), maxsize: 5 * 1024 * 1024 }),
    new winston.transports.File({ filename: path.join(logDir, 'errors.log'), level: 'error' }),
  ],
});

export default logger;

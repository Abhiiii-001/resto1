import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// 1. Define Log Formatting
// In production, logs should be in JSON format so tools like Datadog/New Relic can parse them easily.
// In development, logs should be human-readable and colorized.
const { combine, timestamp, printf, colorize, json, errors } = winston.format;

// Custom format for local console output
const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message} ${info.stack ? `\n${info.stack}` : ''}`
  )
);

// Custom format for files / external services (JSON with stack traces)
const fileFormat = combine(
  errors({ stack: true }), // Ensures errors log their stack trace
  timestamp(),
  json() // Outputs pure JSON string
);

// 2. Define Transports (Where logs go)
const transports: winston.transport[] = [];

// A. File Transport (Daily Rotation)
// This keeps logs locally without filling up the server disk.
// Highly reliable fallback even if external services go down.
transports.push(
  new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxFiles: '14d', // Keep logs for 14 days
    format: fileFormat,
  }),
  new DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d', // Keep logs for 14 days
    format: fileFormat,
  })
);

// B. Console Transport (For local dev or if running in Docker/Kubernetes)
if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: 'debug', // Show debug logs in local dev
    })
  );
} else {
    // In production, we still log to console but in JSON, because standard Docker/AWS setups read from stdout.
    transports.push(
        new winston.transports.Console({
          format: fileFormat,
          level: 'info', // Show info and above in prod console
        })
    );
}

// C. (FUTURE PROOFING) External APM / Log Aggregator Transport
// If you ever want to add New Relic, Datadog, or AWS Cloudwatch, you just push another transport here.
/*
if (process.env.NEW_RELIC_LICENSE_KEY) {
    // Example: Integrating a hypothetical New Relic transport
    transports.push(
       new NewRelicWinstonTransport({
           apiUrl: '...',
           apiKey: process.env.NEW_RELIC_LICENSE_KEY
       })
    )
}
*/

// 3. Create Logger Instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  levels: winston.config.npm.levels, // Default levels: error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
  format: fileFormat,
  transports,
  // Automatically catch and log unhandled exceptions and promise rejections
  exceptionHandlers: [
    new DailyRotateFile({ filename: 'logs/exceptions-%DATE%.log', maxFiles: '14d' }),
    new winston.transports.Console({ format: consoleFormat })
  ],
  rejectionHandlers: [
    new DailyRotateFile({ filename: 'logs/rejections-%DATE%.log', maxFiles: '14d' }),
    new winston.transports.Console({ format: consoleFormat })
  ]
});

export default logger;

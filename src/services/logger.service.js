import { createLogger, format, transports } from "winston";
import env from "../config/env.js";

const logger = createLogger({
  level: env.logLevel,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ level, message, timestamp, stack, ...meta }) => {
      const metaText = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
      return `${timestamp} [${level}] ${stack || message}${metaText}`;
    })
  ),
  transports: [new transports.Console()],
});

export default logger;

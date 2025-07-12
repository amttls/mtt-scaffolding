import { pino } from "pino";
import { PinoLogger, pinoLogger } from "hono-pino";
import type { DebugLogOptions } from "hono-pino/debug-log";

const isDevelopment = process.env.NODE_ENV === "development";

// Basic logger for general use (pino-pretty)
export const logger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname",
          translateTime: "HH:MM:ss",
        },
      }
    : undefined,
});

// Hono logger wrapper
export function honoPinoLogger(): ReturnType<typeof pinoLogger> {
  const debugOptions: DebugLogOptions = {};

  return pinoLogger({
    pino: {
      level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
      transport: isDevelopment
        ? {
            target: "hono-pino/debug-log",
            options: debugOptions,
          }
        : undefined,
      timestamp: pino.stdTimeFunctions.unixTime,
    },
  });
}

export { PinoLogger as HonoPinoLogger };

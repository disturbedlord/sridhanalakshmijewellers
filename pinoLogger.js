import pino from "pino";

// Pino logger
export const logger = pino({
  level: "info", // change to 'debug' for more verbose logs
  base: { service: "dljs_backend" },
  timestamp: pino.stdTimeFunctions.isoTime,
});

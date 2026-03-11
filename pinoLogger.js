import pino from "pino";
import pretty from "pino-pretty";

// Pino logger
export const logger = pino(
  pretty({
    level: "info", // change to 'debug' for more verbose logs
    base: { service: "dljs_backend" },
    timestamp: pino.stdTimeFunctions.isoTime,
  }),
);

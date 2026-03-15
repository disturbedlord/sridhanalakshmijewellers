// utils/logger.js

const levels = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  debug: "DEBUG",
};

export const logger = {
  info: (...msg: any) => console.log(`[INFO] `, msg),
  warn: (...msg: any) => console.warn(`[WARN] `, msg),
  error: (...msg: any) => console.error(`[ERROR] `, msg),
  debug: (...msg: any) => {
    if (process.env.ENVIRONMENT !== "production") {
      console.debug(`[DEBUG]`, msg);
    }
  },
};

export const LogError = (caller?: string, err?: any) => {
  logger.debug(`${caller} Error : ${err}`);
};

// utils/logger.ts

const levels = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  debug: "DEBUG",
};

const isDev = typeof __DEV__ !== "undefined" ? __DEV__ : process.env.ENVIRONMENT !== "production";

export const logger = {
  info: (...msg: any) => {
    if (isDev) console.log(`[INFO]`, ...msg);
  },
  warn: (...msg: any) => {
    if (isDev) console.warn(`[WARN]`, ...msg);
  },
  error: (...msg: any) => {
    // Always log errors so unexpected issues are visible in production
    console.error(`[ERROR]`, ...msg);
  },
  debug: (...msg: any) => {
    if (isDev) console.debug(`[DEBUG]`, ...msg);
  },
};

export const LogError = (caller?: string, err?: any) => {
  logger.error(`${caller} Error : ${err}`);
};

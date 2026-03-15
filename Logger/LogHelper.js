import { logger } from "../pinoLogger.js";

export const LogError = (caller, err) => {
  logger.info(`${caller} Error : ${err}`);
};

import allure from "@wdio/allure-reporter";
import logger from "./logger.ts";

/**
 * Global reporter used for both logger and allure
 * Allure may ignore certains steps
 * @param testid: this.testid or NA. This field is mandatory
 * @param loglevel
 * @param toAllure default true
 * @param msg
 * @todo
 * 1. Add more params of allure reporter....
 */

function addStep(
  testid: string,
  loglevel: string,
  msg: string,
  toAllure = true,
  issueid = undefined,
) {
  let arr = ["info", "debug", "warn", "error"];
  if (!testid) throw Error(`Invalid testid: ${testid} fild to report step`);
  if (!msg) logger.error(`Given message: ${msg} is not valid to report`);
  if (!arr.includes(loglevel))
    logger.error(
      `Given loglevel: ${loglevel} is invalid and should be one of the following: ${arr}`,
    );
  try {
    if (loglevel === "info") logger.info(`[${testid}]: ${msg}`);
    if (loglevel === "debug") logger.debug(`[${testid}]: ${msg}`);
    if (loglevel === "warn") logger.warn(`[${testid}]: ${msg}`);
    if (loglevel === "error") {
      logger.error(`[${testid}]: ${msg}`);
      allure.addStep(`msg, {}, "failed"`);
    } else {
      if (toAllure) allure.addStep(msg);
    }
    if (issueid) allure.addStep(issueid);
  } catch (err) {
    throw `Error reporting repoerter step, ${err}`;
  }
}
export default { addStep };

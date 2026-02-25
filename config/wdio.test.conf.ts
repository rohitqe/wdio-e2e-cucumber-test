// import { config as baseConfig } from "../wdio.conf.ts";
// export const config = Object.assign(baseConfig, {
//   /** All TEST Env specific key value pairs should be placed */
//   environment: "TEST",
//   sauseDemoURL: "https://www.saucedemo.com",
// });

import { config as baseConfig } from "../wdio.conf.ts";

export const config = {
  ...baseConfig,
  environment: "TEST",
};

import { Given } from "@cucumber/cucumber";
import { expect } from "chai";
import reporter from "../../helper/reporter.ts";

/** Web Interactions Feature definition */
Given(
  /^As (a|an) (.*) user I login to inventory web App$/,
  async function (prefixTxt, userType, dataTabe) {
    reporter.addStep(this.testid, "info", "Started to login Inventory web...");
    let dt = dataTabe.hashes();

    /** 1. Launch Browser and land on to Inventory Website */
    const url = process.env.SAUCE_DEMO_URL;

    if (!url) {
      throw new Error("SAUCE_DEMO_URL is not defined in .env");
    }

    await browser.url(url);
    await browser.maximizeWindow();

    /** 2. Login to Inventory */
    await $(`input[placeholder='Username']`).setValue(dt[0].Username);
    // await $(`input[placeholder='Username']`).setValue(
    //   process.env.TEST_STD_USERNAME ?? "",
    // );
    await $(`input[type='password']`).setValue(
      process.env.TEST_STD_PASSWORD ?? "",
    );
    await $(`#login-button`).click();

    const title = await browser.getTitle();
    expect(title).to.equal("Swag Labs");
    this.appid = "ABS123";
    reporter.addStep(this.testid, "info", "Login Successfully...");
  },
);

/** Web Table Interactions Feature definition */
Given(/^Web Page for Table is opened$/, async function () {
  /** 1. Launch Browser and navigate to webtable page */
  const url = process.env.TABLES_BASE_URL;

  if (!url) {
    throw new Error("TABLES_BASE_URL is not defined in .env");
  }

  await browser.url(url);
  await browser.maximizeWindow();

  let text = await $(`h3`).getText();
  expect(text).to.equal("Data Tables");
});

/** Amazon Scrolling Feature definition */
Given(/^Open Amazon Webpage$/, async function () {
  // await browser.url(`https://www.amazon.in`);
  const url = process.env.AMAZON_BASE_URL;

  if (!url) {
    throw new Error("AMAZON_BASE_URL is not defined in .env");
  }

  await browser.url(url);
  await browser.maximizeWindow();

  let signInText = $(`#nav-link-accountList-nav-line-1`);
  await signInText.waitForExist({ timeout: 10000 });
  expect(await signInText.isExisting()).to.be.true;
});

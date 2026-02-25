import { Given } from "@cucumber/cucumber";
import { expect } from "chai";

/** Web Interactions Feature definition */
Given(/^Login to inventory web App$/, async function () {
  /** 1. Launch Browser and land on to Inventory Website */
  const url = process.env.SAUCE_DEMO_URL;

  if (!url) {
    throw new Error("SAUCE_DEMO_URL is not defined in .env");
  }

  await browser.url(url);
  await browser.maximizeWindow();
  console.log(`Test Username: ${process.env.TEST_STD_USERNAME}`);

  /** 2. Login to Inventory */
  await $(`input[placeholder='Username']`).setValue(
    process.env.TEST_STD_USERNAME ?? "",
  );
  await $(`input[type='password']`).setValue(
    process.env.TEST_STD_PASSWORD ?? "",
  );
  await $(`#login-button`).click();

  const title = await browser.getTitle();
  console.log(`>> Title value: ${title}`);

  expect(title).to.equal("Swag Labs");
});

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

  // console.log(`>> Browser Object: ${JSON.stringify(browser)}`);

  let signInText = $(`#nav-link-accountList-nav-line-1`);
  await signInText.waitForExist({ timeout: 10000 });
  // console.log(`>> SignIn Text Exists ?: ${await signInText.isExisting()}`);
  expect(await signInText.isExisting()).to.be.true;
});

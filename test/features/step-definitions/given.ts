import { Given } from "@cucumber/cucumber";
import { expect } from "chai";

Given(/^Login to inventory web App$/, async function () {
  /** 1. Launch Browser and land on to Inventory Website */
  await browser.url("https://www.saucedemo.com/");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();

  /** 2. Login to Inventory */
  await $(`input[placeholder='Username']`).setValue("standard_user");
  await $(`input[type='password']`).setValue("secret_sauce");
  await $(`#login-button`).click();

  const title = await browser.getTitle();
  console.log(`>> Title value: ${title}`);

  expect(title).to.equal("Swag Labs");
});

Given(/^Web Page for Table is opened$/, async function () {
  /** 1. Launch Browser and navigate to webtable page */
  await browser.url("https://the-internet.herokuapp.com/tables");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();

  let text = await $(`h3`).getText();
  expect(text).to.equal("Data Tables");
});

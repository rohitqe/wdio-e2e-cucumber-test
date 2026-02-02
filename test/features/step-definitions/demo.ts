import { Given, When, Then } from "@wdio/cucumber-framework";

/**
 * Launch Browser Open Google and click on first Search result
 */

Given(/^Google page is opened/, async function () {
  console.log(`Before Opening browser...`);
  await browser.url(`https://www.google.com/`);
  await browser.pause(1000);
  console.log(`I have landed on Google Page`);
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`>> search item: ${searchItem}`);
  const ele = $(`[class='gLFyf']`);
  await ele.setValue(searchItem);
  await browser.keys("Enter");
});

Then(/^Click on the first search result$/, async function () {
  const firstResult = $('<h3>');
  await firstResult.waitForDisplayed({timeout: 30000});
  await firstResult.click();
});

Then(/^URL should match (.*)$/, async function (expectedURL) {
  console.log(`Expected URL: ${expectedURL}`);
  const actualURL = await browser.getUrl();
  console.log(`Actual URL: ${actualURL}`);
  expect(actualURL).toBe(await expectedURL);
});

/**
 * Web Interactions
 */
Given(/^Web Page is opened$/, async function () {
  await browser.url("/inputs");
  await browser.setTimeout({implicit: 15000, pageLoad: 10000});
  await browser.maximizeWindow();
});

When(/^Perform Web Interactions$/, async function () {
  /**
   * 1. Input box
   * Actions:
   * 1. Type into input box
   * 2. Clear field and add new value
   * 3. Click and type
   * 4. Slow typing
  */
 let num = 12345;
 let strName = num.toString();

 let ele = $(`[type=number]`);
//  await ele.setValue(strName);

await ele.click();
 for(let i=0; i<strName.length; i++){
    await ele.addValue(strName.charAt(i));
    await browser.pause(1000);
 }

});

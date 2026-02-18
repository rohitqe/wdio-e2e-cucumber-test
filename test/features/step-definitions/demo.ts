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
  const firstResult = $("<h3>");
  await firstResult.waitForDisplayed({ timeout: 30000 });
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
  await browser.url("/upload");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
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
  //  let num = 12345;
  //  let strName = num.toString();
  //  let ele = $(`[type=number]`);
  // //  await ele.setValue(strName);
  // await ele.click();
  //  for(let i=0; i<strName.length; i++){
  //     await ele.addValue(strName.charAt(i));
  //     await browser.pause(1000);
  //  }
  /**
   * 1. Dropdown
   * Actions:
   * 1. Assert default option is selected
   * 2. Select by attribute, text, index
   * 3.Get a list of options
   */
  /* 1. Assert default option is selected */
  // const defaultDropdown = $(`//select/option[@selected="selected"]`);
  // const actualText = await defaultDropdown.getText();
  // const expectedText = "Please select an option";
  // console.log(`Actual Text: ${actualText}`);
  // expect(actualText).toBe(expectedText);
  /* 2. Select by attribute, text, index */
  // let dropDown = $(`#dropdown`);
  // await dropDown.click();
  // // await dropDown.selectByVisibleText("Option 1");
  // // await dropDown.selectByAttribute('value', '1');
  // await dropDown.selectByIndex(1);
  // const selected = dropDown.$("option:checked");
  // expect(await selected.getText()).toBe("Option 1");
  // /* 3.Get a list of options */
  // let optionsList = $$(`select > option`);
  // let arr = [];
  // for(let i=0; i<await optionsList.length; i++){
  //   let ele = optionsList[i];
  //   let val = await ele.getText();
  //   arr.push(val);
  //   console.log(val);
  // }
  // console.log(`>> Options Array: ${arr}`);
  /**
   * 1. Checkboxes
   * Actions:
   * 1. Select a checkbox
   * 2. Unselect a checkbox
   * 3. Assert if the checkbox is selected
   * 4. select all the checkboxes
   */
  // let checkbox = $(`//form[@id='checkboxes']/input[1]`);
  // let checkboxes = $$(`//form[@id='checkboxes']/input`);
  // /* 1. Select a checkbox */
  // if (!(await checkbox.isSelected())) {
  //   await checkbox.click();
  // }
  // /* 2. UnSelect a checkbox */
  // if (await checkbox.isSelected()) {
  //   await checkbox.click();
  // }
  // /* 3. Assert if the checkbox is selected */
  // if (!(await checkbox.isSelected())) {
  //   await checkbox.click();
  // }
  // expect(await checkbox.isSelected()).toBeTruthy();
  // /*  4. select all the checkboxes */
  // for (let i = 0; i < (await checkboxes.length); i++) {
  //   if (!(await checkboxes[i].isSelected())) {
  //     await checkboxes[i].click();
  //   }
  //   expect(await checkboxes[i].isSelected()).toBeTruthy();
  // }
  /**
   * 1. Multiple windows handling
   * Actions:
   * 1. Launch the browser
   * 2. open another window
   * 3. switch to the window based on title
   * 4. switch back to main window
   */
  // open new windows
  // await $(`=Click Here`).click();
  // await $(`=Elemental Selenium`).click();
  // let currentWinTitle = await browser.getTitle();
  // let parentWinHandle = await browser.getWindowHandle();
  // console.log(`>> current Window Title: ${currentWinTitle}`);
  // // switch to specific windows
  // let winHandles = await browser.getWindowHandles();
  // for (let i = 0; i < winHandles.length; i++) {
  //   await browser.switchToWindow(winHandles[i]);
  //   currentWinTitle = await browser.getTitle();
  //   if (currentWinTitle === "New Window") {
  //     await browser.switchToWindow(winHandles[i]);
  //     console.log(`I switched to ${winHandles[i]} window`);
  //     let validateText = await $(`<h3>`).getText();
  //     console.log(`Validating Text -> ${validateText}`);
  //     expect(validateText).toBe("New Window");
  //     break;
  //   }
  // }
  // // switch back to main windows
  // await browser.switchToWindow(parentWinHandle);
  // let parentWinText = await $(`<h3>`).getText();
  // expect(parentWinText).toBe("Opening a new window");

  /*
   * Handling Alerts
   */

  /* Accpet the alert*/
  // let jsAlert = $(`button=Click for JS Alert`);
  // let jsConfirm = $(`button=Click for JS Confirm`);
  // let jsPrompt = $(`button=Click for JS Prompt`);

  // await jsAlert.click();
  // if(await browser.isAlertOpen()){
  //   await browser.acceptAlert();
  // }

  // await jsConfirm.click();
  // if(await browser.isAlertOpen()){
  //   await browser.dismissAlert();
  //     let textOnDismiss = await $(`#result`).getText();
  //     expect(textOnDismiss).toBe('You clicked: Cancel');
  // }

  // await jsPrompt.click();
  // await browser.waitUntil(async () => await browser.isAlertOpen(), {
  //   timeout: 10000,
  //   timeoutMsg: "JS Prompt did not appear",
  // });
  // let alertText = await browser.getAlertText();
  // console.log(`>> alertText: ${alertText}`);
  // await browser.sendAlertText(`Hello JS Prompt...`);

  await $(`#file-upload`).addValue(
    `${process.cwd()}/data/fileupload/dummy.txt`,
  );
  await $(`#file-submit`).click();
  expect(await $(`<h3>`).getText()).toBe(`File Uploaded!`);
});

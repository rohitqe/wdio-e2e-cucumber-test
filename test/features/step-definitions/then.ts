import { Then } from "@cucumber/cucumber";
import { expect } from "chai";

Then(
  /^Inventory page should list (.*)$/,
  async function (noOfProducts: string) {
    /** 1. Validate the number of products expected against actual product list */
    if (!noOfProducts) throw Error(`Invalid product count >> ${noOfProducts}`);
    let eleArr = $$(`.inventory_item_name`);
    expect(await eleArr.length).to.equal(parseInt(noOfProducts));
  },
);

/**
 * Steps:
 * 1. Get price list
 * 2. Convert string to number
 * 3. Assert if value is <=0
 **/

Then(/^Validate all products have valid price$/, async function () {
  /** 1. Get price list */
  let eleArr = $$(`.inventory_item_price`);
  let priceStrArr = [];

  for (let i = 0; i < (await eleArr.length); i++) {
    let priceStr = await eleArr[i].getText();
    priceStrArr.push(priceStr);
  }
  console.log(`>> Price with $: ${priceStrArr}`);

  /** 2. Convert string to number */
  let priceNumArr = await priceStrArr.map(
    (ele) => +ele.replace("$", ""),
  ); /** urinary plus is used*/
  console.log(`>> Price in Number: ${priceNumArr}`);

  /** 3. Assert if value is <=0 */
  let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
  expect(invalidPriceArr.length).to.equal(0);
});

/**
 * Step 1. Checking total number of rows and columns available in table
 * Step 2. Get whole table data
 * Step 3. Get single row [based on a condition]
 * Step 4. Get single column
 * Step 5. Get single cell value [based on another condition]
 **/

/** Step 1. Checking total number of rows and columns available in table */
Then(/^Check number of rows and columns$/, async function () {
  let rows = $$(`//table[@id='table1']//tbody//tr`);
  let headers = $$(`//table[@id='table1']//th`);

  let rowCount = await rows.length;
  let colCount = await headers.length;

  console.log(`>> Total rows: ${rowCount}`);
  console.log(`>> Total Columns: ${colCount}`);

  /** Print website where First Name is Jason */
  let website;
  let firstNameIndex: number = -1;
  let websiteIndex: number = -1;

  /** Find column Index dynamically */
  for (let i = 0; i < (await headers.length); i++) {
    let headerText = await headers[i].getText();
    if (headerText.trim() === "First Name") {
      firstNameIndex = i;
    }
    if (headerText.trim() === "Web Site") {
      websiteIndex = i;
    }
  }

  /** Searching the first name and printing its respective Website */
  for (let i = 0; i < rowCount; i++) {
    let cells = rows[i].$$("td");
    let firstName = await cells[firstNameIndex].getText();

    if (firstName === "Jason") {
      website = await cells[websiteIndex].getText();
      break;
    }
  }
  console.log(
    `---------------------\n>> Website of Jason: ${website}\n----------------------------`,
  );
});

/** Step 2. Get whole table data */
Then(/^Get whole table data$/, async function () {
  let rows = $$(`//table[@id='table1']/tbody/tr`);
  let col = $$(`//table[@id='table1']/thead/tr/th`);
  let arr = [];
  for (let i = 0; i < (await rows.length); i++) {
    let personObj = {
      lastName: "",
      firstName: "",
      email: "",
      due: "",
      web: "",
      action: "",
    };
    for (let j = 0; j < (await col.length); j++) {
      let cellValue = await $(
        `//table[@id='table1']/tbody/tr[${i + 1}]/td[${j + 1}]`,
      ).getText();
      // const value = cellValue.trim().toLowerCase();
      // if(!value.includes('edit') && !value.includes('delete')){
      //     console.log(`>> Cell Value: ${cellValue}`);
      // }
      if (j === 0) personObj.lastName = cellValue;
      if (j === 1) personObj.firstName = cellValue;
      if (j === 2) personObj.email = cellValue;
      if (j === 3) personObj.due = cellValue;
      if (j === 4) personObj.web = cellValue;
      if (j === 5) personObj.action = cellValue;
    }
    arr.push(personObj);
  }
  console.log(`>> Whole table data: ${JSON.stringify(arr)}`);
});

/** Step 3. Get single row [wher lastname is 'Json'] */
Then(/^Get single row \[based on a condition\]$/, async function () {
  let rows = $$(`//table[@id='table1']/tbody/tr`);
  let col = $$(`//table[@id='table1']/thead/tr/th`);
  let arr = [];

  for (let i = 0; i < (await rows.length); i++) {
    let personObj = {
      lastName: "",
      firstName: "",
      email: "",
      due: "",
      web: "",
      action: "",
    };
    for (let j = 0; j < (await col.length); j++) {
      let cellValue = await $(
        `//table[@id='table1']/tbody/tr[${i + 1}]/td[${j + 1}]`,
      ).getText();
      let firstname = await $(
        `//table[@id='table1']/tbody/tr[${i + 1}]/td[2]`,
      ).getText();
      if (firstname === "Jason") {
        if (j === 0) personObj.lastName = cellValue;
        if (j === 1) personObj.firstName = cellValue;
        if (j === 2) personObj.email = cellValue;
        if (j === 3) personObj.due = cellValue;
        if (j === 4) personObj.web = cellValue;
        if (j === 5) personObj.action = cellValue;
      }
    }
    if (personObj.firstName) {
      arr.push(personObj);
    }
  }
  console.log(
    `>> Single row where first name is [Jason]: ${JSON.stringify(arr)}`,
  );
});

/** Step 4. Get single column */
Then(/^Get single column$/, async function () {
  let rows = $$(`//table[@id='table1']/tbody/tr`);
  let arr = [];

  for (let i = 0; i < (await rows.length); i++) {
    let cellValue = await $(
      `//table[@id='table1']/tbody/tr[${i + 1}]/td[2]`,
    ).getText();
    arr.push(cellValue);
  }
  console.log(`>> Single column values: ${JSON.stringify(arr)}`);
});

/** Step 4. Get single cell value */
Then(
  /^Get single cell value \[based on another condition\]$/,
  async function () {
    let rows = $$(`//table[@id='table1']/tbody/tr`);
    let arr = [];
    const price = 50;
    for (let i = 0; i < (await rows.length); i++) {
      let due = await $(
        `//table[@id='table1']/tbody/tr[${i + 1}]/td[4]`,
      ).getText();
      let firstname = await $(
        `//table[@id='table1']/tbody/tr[${i + 1}]/td[2]`,
      ).getText();
      if (+due.replace("$", "") > price) {
        arr.push(firstname);
      }
    }
    console.log(
      `>> firstname where due is more than ${price} is: ${JSON.stringify(arr)}`,
    );
  },
);

/**
 * Step 1. Performing scroll to the visible portion
 * Step 2. Performing scroll to the invissible portion
 **/

/** Step 1. Performing scroll to the visible portion */
Then(/^Scroll to the visible portion$/, async function () {
  /** scrolling down */
  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight);
  });

  await browser.pause(1000);

  /** scrolling up */
  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight);
  });
});

Then(/^Scroll to the invisible portion$/, async function () {
  /** scrolling down till the bottom of webpage */
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await browser.pause(1000);

  /** scrolling up again from bottom to top of the web pae */
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollTop);
  });
});

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
 */
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

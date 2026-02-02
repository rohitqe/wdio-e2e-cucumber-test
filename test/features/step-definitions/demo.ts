import { Given, When, Then } from "@wdio/cucumber-framework";
/**
 * Selectors
 * Title:
 * CURA Healthcare Service
 *
 * Make Appointment
 * Link Text: Make Appointment
 *
 * Login Page url
 * https://katalon-demo-cura.herokuapp.com/profile.php#login
 *
 *
 *
 */

Given(/^the user launches the CURA web app$/, async function () {
  await browser.url("https://katalon-demo-cura.herokuapp.com/");
  await expect(browser).toHaveTitle("CURA Healthcare Service");
});

When(/^user clicks on Make appointment button$/, async function () {
  await $("=Make Appointment").click();
});

Then(/^login page should be displayed$/, async function () {
  await expect(browser).toHaveUrl(/.*#login/);
});

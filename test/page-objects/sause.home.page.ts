import Page from "../page-objects/page.ts";
import reporter from "../helper/reporter.ts";

class HomePage extends Page {
  constructor() {
    super();
  }

  /** Page Objects */
  get usernameInputBox() {
    return $(`input[placeholder='Username']`);
  }
  get passwordInputBox() {
    return $(`input[type='password']`);
  }
  get loginBtn() {
    return $(`#login-button`);
  }

  /** Page Actions */
  async enterUsername(testid: string, username: string) {
    if (!username) throw Error(`Username: ${username} is not valid`);
    username = username.trim();
    try {
      await this.typeInto(this.usernameInputBox, username);
      reporter.addStep(
        testid,
        "info",
        `Username: ${username} entered successfully`,
      );
    } catch (err) {
      if (err instanceof Error) {
        err.message = `Error entering the username: ${username}, ${err.message}`;
        throw err;
      }
    }
  }

  async enterPassword(testid: string, password: string) {
    if (!password) throw Error(`password: is not valid`);
    password = password.trim();
    try {
      await this.typeInto(this.passwordInputBox, password);
      reporter.addStep(testid, "info", `password entered successfully`);
    } catch (err) {
      if (err instanceof Error) {
        err.message = `Error entering the password, ${err.message}`;
        throw err;
      }
    }
  }

  async clickLoginBtn(testid: string) {
    try {
      await this.click(this.loginBtn);
      reporter.addStep(testid, "info", `clicked login button successfully`);
    } catch (err) {
      if (err instanceof Error) {
        err.message = `Error clicking the login button, ${err.message}`;
        throw err;
      }
    }
  }

  async loginToSauseApp(testid: string, username: string, password: string) {
    try {
      await this.enterUsername(testid, username);
      await this.enterPassword(testid, password);
      await this.clickLoginBtn(testid);
    } catch (err) {
      if (err instanceof Error) {
        err.message = `Error performing the login, ${err.message}`;
        throw err;
      }
    }
  }
}
export default new HomePage();

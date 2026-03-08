export default class Page {
  constructor() {}

  /** Reusable methods or/ web Functions */
  async navigateTo(path: string): Promise<void> {
    await browser.url(path);
    await browser.maximizeWindow();
  }

  async click(ele: ChainablePromiseElement): Promise<void> {
    if (!ele.elementId) {
      throw (await ele.error)?.message;
    } else {
      await ele.waitForClickable({ timeout: 5000 });
      await ele.click();
    }
  }

  async typeInto(ele: ChainablePromiseElement, text: string): Promise<void> {
    if (!ele.elementId) throw (await ele.error)?.message;
    await ele.waitForDisplayed({ timeout: 5000 });
    await ele.setValue(text);
  }
}

import { Builder, Capabilities, By } from "selenium-webdriver";

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeEach(async () => {
  await driver.get("http://localhost:4000/");
});

afterAll(async () => {
  await driver.quit();
});

test("Title shows up when page loads", async () => {
  const title = await driver.findElement(By.id("title"));
  const displayed = await title.isDisplayed();
  expect(displayed).toBe(true);
});

test("test is draw shows up a div with the id of choices", async () => {
  const draw = await driver.findElement(By.id("draw"));
  await draw.click();
  const choices = await driver.findElement(By.id("choices"));

  const displayed = await choices.isDisplayed();
  expect(displayed).toBe(true);
});

test("test if see all bots shows all the bots  ", async () => {
  const seeAllBots = await driver.findElement(By.id("see-all"));
  await seeAllBots.click();
  const allBots = await driver.findElement(By.id("all-bots"));
  await driver.sleep(2000);

  const displayed = await allBots.isDisplayed();
  expect(displayed).toBe(true);
});

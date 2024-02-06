import { test, expect } from "@playwright/test";
import { auto } from "auto-playwright";

test("auto Playwright example", async ({ page }) => {
  const options = {
    // If true, debugging information is printed in the console.
    debug: true,
    // The OpenAI model (https://platform.openai.com/docs/models/overview)
    model: "gpt-4-1106-preview",
    // The OpenAI API key
    // openaiApiKey: "sk-...",
  };

  //   const browser = await chromium.launch({ headless: true });
  //   const context = await browser.newContext();
  //   const page = await context.newPage();
  // Navigate to a website
  await page.goto("https://packershoes.com/");

  // `auto` can query data
  // In this case, the result is plain-text contents of the header
  const res = await auto("get the header text", { page, test }, options);

  try {
    await auto("Click Account button", { page, test }, options);
  } catch (e) {
    console.error("failed to click the account button");
  }

  await auto(
    `Type "windyfly@live" in the Email box and "080229" in the Password box`,
    { page, test },
    options
  );

  await page.pause();

  await auto(`Click Sign In button`, { page, test }, options);

  const orders = await auto("get the Order History", { page, test }, options);

  // use res.query to get a query result.
  console.log(res);
  console.log(orders);
  await page.close();

  expect(res).not.toBeNull();
});
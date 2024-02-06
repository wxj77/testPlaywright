import { expect, test } from "@playwright/test";
import { createActions } from "auto-playwright/dist/createActions";
import { ChatCompletionRunner } from "openai/lib/ChatCompletionRunner";
import { chromium } from "playwright";

const runner = {} as ChatCompletionRunner;

test("finds element using a CSS locator and returns elementId", async () => {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

  await page.goto("https://solostove.com/en-us");

  const actions = createActions(page);

  const result = await actions.locateElement.function(
    {
      cssSelector: "add to cart",
    },
    runner
  );
  console.log("test");
  console.log(result);
  console.log("[id='"+result.elementId+"']");


  await page.click("[id='"+result.elementId+"']");
  expect(result).toStrictEqual({
    elementId: expect.any(String),
  });
});
//78a04502-588f-4393-ba95-f3dd40e127fc
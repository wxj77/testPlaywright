import { expect } from "@playwright/test";
import { fixtures as test } from "../utils/fixture";
import { ai } from "@zerostep/playwright";

test.describe("POC", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(`Should pass user journey`, async ({ page, generate }) => {
    await ai('Click on Buy sunscreens', {page, test})
    await ai('Click on Add button for first "spf-30" product to cart', {page, test})
    await ai('Navigate to cart item', {page, test})
    const element  = await ai('Verify item "spf-30" is listed', {page, test})
    expect(element).toBe(true)
  });

});
import { chromium } from "playwright";
import { auto } from "auto-playwright";
import { expect, test } from "@playwright/test";
const fs = require('fs').promises;

// advertisement popup popup event
test("Shopping cart functionality", async () => {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const options = {
      // If true, debugging information is printed in the console.
      debug: true,
      // The OpenAI model (https://platform.openai.com/docs/models/overview)
      model: "gpt-4-1106-preview",
      // The OpenAI API key
      // openaiApiKey: "sk-...",
    };

    // Add an event listener for the popup event
    page.on('popup', async popup => {
      console.log('Popup detected. Closing it.');
      await popup.close();
    });

    // Navigate to a website
    await page.goto("https://axoconnect-f6.mybigcommerce.com");
    //await page.goto("https://solostove.com/en-us");

    // Get page content
    var content = await page.content();
    // Save the content to a file
    await fs.writeFile('pageContent1.html', content);

    // Add item to cart
    try {
      var res = await auto("click on any add to cart button", { page, test }, options);
    } catch (e) {
      console.error("failed to click the add to cart button");
    }


    // Get page content
    content = await page.content();
    // Save the content to a file
    await fs.writeFile('pageContent_addToCart.html', content);
    console.log(res);
    page.on('dialog', dialog => dialog.accept());
    await page.click('button'); // trigger the dialog

    // Checkout
    try {
      await auto("click on check out button", { page, test }, options);
    } catch (e) {
      console.error("failed to click the check out button");
    }

    // Get page content
    content = await page.content();
    // Save the content to a file
    await fs.writeFile('pageContent_checkOut.html', content);

    const itemsList = await auto("list all items in the cart", { page, test }, options);
    const totalPrice = await auto("what is the total price?", { page, test }, options);
    //expect(itemsList).toContain('Item X');
    // expect(totalPrice).toMatch(/\$\d+/);
  });
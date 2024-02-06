import { chromium } from "playwright";
import { auto } from "auto-playwright";
import { expect, test } from "@playwright/test";
import { ai } from '@zerostep/playwright'
// Load the Twilio module
import { setAutoCompleteValue } from "./setAutoCompleteValue"; // Import the function

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// env variables
const TWILIO_ACCOUNT_SID=process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN=process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER=process.env.TWILIO_PHONE_NUMBER

const CREDIT_CARD=process.env.CREDIT_CARD
const EXPIRATION=process.env.EXPIRATION
const CVV=process.env.CVV

// advertisement popup popup event
test("Shopping cart functionality", async () => {

    test.setTimeout(120000);

    // await wait(30000);

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const aiArgs = { page, test }

    var content = await page.content();

    // Add an event listener for the popup event
    page.on('popup', async popup => {
      console.log('Popup detected. Closing it.');
      await popup.close();
    });

    // Subscribe to 'request' and 'response' events.
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));


    // Navigate to a website
    await page.goto("https://axoconnect-f6.mybigcommerce.com");
    // await page.goto("https://solostove.com/en-us");

    await page.waitForLoadState('networkidle');

    // Add item to cart
    await page.getByText('add to cart').first().click();


    // await page.waitForLoadState('networkidle');    
    // try {
    //   var res = await auto("click on any add to cart button", { page, test }, options);
    // } catch (e) {
    //   console.error("failed to click the add to cart button");
    // }

    // Checkout
    await page.getByText('check out').click();

    // try {
    //   await auto("click on check out button", { page, test }, options);
    // } catch (e) {
    //   console.error("failed to click the check out button");
    // }

    // Checkout
    await page.getByText('email').fill("jiwei0706@gmail.com");

    // try {
    //   await auto('Type "jiwei0706@gmail.com" in the Email box', { page, test }, options);
    // } catch (e) {
    //   console.error("failed to click the check out button");
    // }


    // Checkout
    await page.getByText('continue').click();

    // try {
    //   await auto("click on continue button", { page, test }, options);
    // } catch (e) {
    //   console.error("failed to click the continue button");
    // }

    await page.waitForLoadState('networkidle');


    try {
      await setAutoCompleteValue(page);
      console.log('Auto-complete function executed successfully');
    } catch (error) {
        console.error('Error during auto-complete function execution:', error);
    }
    
    await page.waitForLoadState('networkidle');


    // Type sms code
    // await page.getByRole('input').fill(digitsArray[0]);

    // try {
    //   await page.keyboard.type(digitsArray[0]);
    // } catch (e) {
    //   console.error("failed to type");
    // }

    await page.getByText('continue').click();

    await page.waitForLoadState('networkidle');

    try {
      await ai('Click the card number frame', aiArgs);
    } catch (e) {
      console.error("failed to click the check out button");
    }    
    
    try {
      await ai(`Type "${CREDIT_CARD}" in the card number box`, aiArgs);
    } catch (e) {
      console.error("failed to click the check out button");
    }

    try {
      await ai('Click the expiration frame', aiArgs);
    } catch (e) {
      console.error("failed to click the expiration frame");
    }    
    
    try {
      await ai(`Type "${EXPIRATION}" in the expiration box`, aiArgs);
    } catch (e) {
      console.error("failed to click the expiration box");
    }

    try {
      await ai('Click the cvv frame', aiArgs);
    } catch (e) {
      console.error("failed to click the cvv frame");
    }    
    
    try {
      await ai(`Type "${CVV}" in the cvv box`, aiArgs);
    } catch (e) {
      console.error("failed to click the cvv box");
    }

    console.log("click checkout");
  
    // Place order
    var locator = page.getByText('place order')
    await locator.click();

    // try {
    //   await auto("click on place order button", { page, test }, options);
    // } catch (e) {
    //   console.error("failed to click the place order button");
    // }

    await page.waitForLoadState('domcontentloaded');
    
    await locator.waitFor({ state: "detached" });

    console.log("clicked checkout");

  });
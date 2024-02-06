import { chromium, firefox, webkit } from "playwright";
import { auto } from "auto-playwright";
import { expect, test } from "@playwright/test";
import { ai } from '@zerostep/playwright'

import { setAutoCompleteValue } from "./setAutoCompleteValue"; // Import the function
import { get6DigitCode } from './get6DigitCode';



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

    test.setTimeout(200000);

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

    // try {
    //   var res = await ai("click on any add to cart button", { page, test });
    // } catch (e) {
    //   console.error("failed to click the add to cart button");
    // }

    await page.waitForLoadState('networkidle');  

    // Checkout
    await page.getByText('check out').click();

    // try {
    //   await auto("click on check out button", { page, test }, options);
    // } catch (e) {
    //   console.error("failed to click the check out button");
    // }

    // Checkout
    await page.getByText('email').fill("jiwei1990@gmail.com");

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

    // Wait for 30 seconds
    await wait(20000);

    //Get 6 digit of confirmation code
    var digitsArray;
    try {
      digitsArray = await get6DigitCode();
      console.log('Digits Array:', digitsArray);
      // You can now use digitsArray here for further logic
    } catch (error) {
        console.log('Error:', error);
    }


    // try {
    //   await ai('Go to the axo frame', aiArgs);
    // } catch (e) {
    //   console.error("failed to click the axo frame button");
    // }    
    
    const element = await page.$('[autocomplete="one-time-code"]');
    if (element) {
      // Get the tag name of the element
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());

      // Check if the element is a form
      if (tagName === 'form') {
          console.log('The element is a form.');
      } else {
          console.log('The element is not a form. It is a:', tagName);
      }
  } else {
      console.log('Element not found');
  }

  await page.fill('#otp0-input', digitsArray);

    // try {
    //   await ai(`Enter "${digitsArray}" in the axo number box`, aiArgs);   
    // } catch (e) {
    //   console.error("failed to click the axo frame button");
    // }    

      // try {
      //   await ai(`Fill "${digitsArray}".`, aiArgs);

      // } catch (e) {
      //   console.error("failed to click the axo frame button");
      // } 
 

    await wait(10000);
    // await ai('Submit', aiArgs)
    // try {
    //   await ai('Click the place order button', aiArgs);
    // } catch (e) {
    //   console.error("failed to click the check out button");
    // }    

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


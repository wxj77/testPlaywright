import { chromium } from "playwright";
import { auto } from "auto-playwright";
import { expect, test } from "@playwright/test";
// Load the Twilio module
const twilio = require('twilio');
const setAutoCompleteValue = require('../setAutoCompleteValue'); // Import the function
const continueToNextStep= require('../continueToNextStep')


// Twilio account SID and Auth Token
const accountSid = 'AC55f78fa0f950723a25e41648f3ce8d7e';
const authToken = '6039b4a71348bd062e0c450f6868bedf';

// Initialize Twilio client
const client = twilio(accountSid, authToken);

const fs = require('fs').promises;

function getFirst6DigitsFromMessages() {
  return client.messages.list({ limit: 5 })
      .then(messages => {
          return messages.map(m => {
              const match = m.body.match(/\d{6}/);
              return match ? match[0] : null;
          }).filter(m => m !== null); // Filters out messages without a 6-digit number
      })
      .catch(error => {
          console.error(error);
          throw error; // Re-throw the error for the caller to handle
      });
};


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};


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
    var content = await page.content();

    // Add an event listener for the popup event
    page.on('popup', async popup => {
      console.log('Popup detected. Closing it.');
      await popup.close();
    });

    // Navigate to a website
    await page.goto("https://axoconnect-f6.mybigcommerce.com");

    // Add item to cart
    await page.getByText('add to cart').click();

    
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

    setTimeout(function() {
      console.log("30 seconds have passed!");
  }, 30000); // 30,000 milliseconds = 30 seconds
  
    // Wait for 30 seconds
    await wait(3000);

    //Get 6 digit of confirmation code
    var digitsArray;
    try {
      digitsArray = await getFirst6DigitsFromMessages();
      console.log('Digits Array:', digitsArray);
      // You can now use digitsArray here for further logic
    } catch (error) {
        console.log('Error:', error);
    }

    await page.waitForLoadState('networkidle');


    try {
      await setAutoCompleteValue(page);
      console.log('Auto-complete function executed successfully');
    } catch (error) {
        console.error('Error during auto-complete function execution:', error);
    }
    console.log('test');


    // Type sms code
    // await page.getByRole('input').fill(digitsArray[0]);

    // try {
    //   await page.keyboard.type(digitsArray[0]);
    // } catch (e) {
    //   console.error("failed to type");
    // }

    await page.getByText('continue').click();

    // Place order
    await page.getByText('place order').click();
    
    // try {
    //   await auto("click on place order button", { page, test }, options);
    // } catch (e) {
    //   console.error("failed to click the place order button");
    // }

  });




      // // Get page content
      // content = await page.content();
      // // Save the content to a file
      // await fs.writeFile('pageContent_checkOut2.html', content);
  

import { chromium } from "playwright";
import { auto } from "auto-playwright";
import { expect, test } from "@playwright/test";
// Load the Twilio module
const twilio = require('twilio');
const setAutoCompleteValue = require('./setAutoCompleteValue'); // Import the function
const continueToNextStep= require('./continueToNextStep');
const withTimeout= require('./withTimeout');



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

// env variables
const TWILIO_ACCOUNT_SID=process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN=process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER=process.env.TWILIO_PHONE_NUMBER

const CREDIT_CARD=process.env.CREDIT_CARD
const EXPIRATION=process.env.EXPIRATION
const CVV=process.env.CVV

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

    // Get page content
    content = await page.content();
    // Save the content to a file
    await fs.writeFile('pageContent_credit_card.html', content);

    try {
      await auto('Type "51111111" in the card number box', { page, test }, options);
    } catch (e) {
      console.error("failed to click the check out button");
    }
    
    // Find all iframes
    var frames = page.frames();

    for (const frame of frames) {
      // Perform actions within each iframe
      // For example, you can expand content, click buttons, etc.
      // This depends on the specific content and structure of the iframe
      // Example: await frame.click('selector-for-expand-button');
        // Checkout
        const frameName = frame.name() || 'Unnamed frame';
        console.log(`Frame Name: ${frameName}`);

        const frameURL = frame.url();
        console.log(`Frame Name: ${frameURL}`);

        try {
          await withTimeout(frame.fill(`input[autocomplete="cc-number"]`, `${CREDIT_CARD}`), 5000);
          } catch (e) {
            console.error(`failed to enter "cc-number"`);
        };
        try {
          await withTimeout(frame.fill(`input[autocomplete="cc-exp"]`, `${EXPIRATION}`), 5000);
          } catch (e) {
            console.error(`failed to enter "cc-exp"`);
        };    
        try {
          await withTimeout(frame.fill(`input[autocomplete="cc-csc"]`, `${CVV}`), 5000);
          } catch (e) {
            console.error(`failed to enter "cc-csc"`);
        };
    
    }



    // // Place order
    // await page.getByText('place order').click();

    // await page.waitForLoadState('networkidle');
    
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
  

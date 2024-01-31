import { chromium } from "playwright";
import { auto } from "auto-playwright";
import { expect, test } from "@playwright/test";
// Load the Twilio module
const twilio = require('twilio');
const setAutoCompleteValue = require('./setAutoCompleteValue'); // Import the function
const continueToNextStep= require('./continueToNextStep');
const withTimeout= require('./withTimeout');


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
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.dismiss();
    });
    await page.evaluate(() => alert('1'));

    // // Subscribe to 'request' and 'response' events.
    // page.on('request', request => console.log('>>', request.method(), request.url()));
    // page.on('response', response => console.log('<<', response.status(), response.url()));


    // Navigate to a website
    await page.goto("https://solostove.com/en-us");

    await page.waitForLoadState('networkidle');


  // Override dialog functions in each frame
  const frames = page.frames();
  for (const frame of frames) {
      await frame.evaluate(() => {
          window.alert = () => {};
          window.confirm = () => true; // Automatically 'confirms'
          window.prompt = () => null; // Returns null for prompts
      });
  }


    const res = await page.getByText('add to cart').first();
    console.log(res);
    
    console.log(await page.getByText('add to cart').first().click());
    // Add item to cart

  });




      // // Get page content
      // content = await page.content();
      // // Save the content to a file
      // await fs.writeFile('pageContent_checkOut2.html', content);
  

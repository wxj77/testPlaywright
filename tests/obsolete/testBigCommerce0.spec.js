import { chromium } from "playwright";
import { auto } from "auto-playwright";
import { expect, test } from "@playwright/test";
// Load the Twilio module
const twilio = require('twilio');
const setAutoCompleteValue = require('../setAutoCompleteValue'); // Import the function
const continueToNextStep= require('../continueToNextStep')


// 
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

    // Checkout
    await continueToNextStep(page);

    // Enter email
    await page.getByText('email').fill("jiwei0706@gmail.com");

    // Checkout
    await continueToNextStep(page);


    // Wait for 30 seconds, then do nothing
    setTimeout(function() {}, 30000);

    //Get 6 digit of confirmation code
    var digitsArray;
    try {
      digitsArray = await getFirst6DigitsFromMessages();
      console.log('Digits Array:', digitsArray);
      // You can now use digitsArray here for further logic
    } catch (error) {
        console.log('Error:', error);
    }

    await setAutoCompleteValue(page)



    // Get page content
    content = await page.content();
    // Save the content to a file
    await fs.writeFile('pageContent_code.html', content);




    // Type sms code
    // await page.getByRole('input').fill(digitsArray[0]);

    // try {
    //   await page.keyboard.type(digitsArray[0]);
    // } catch (e) {
    //   console.error("failed to type");
    // }



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
  

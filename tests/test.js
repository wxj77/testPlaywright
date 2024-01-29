const { chromium } = require("playwright");
const { auto } = require("auto-playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  // Navigate to a website
  await page.goto("https://www.example.com");

  // `auto` can query data
  // In this case, the result is plain-text contents of the header
  const res = await auto("get the header text", { page });

  // use res.query to get a query result.
  console.log(res);
  await page.close();
})();

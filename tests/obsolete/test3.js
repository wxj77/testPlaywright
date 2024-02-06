const { chromium } = require("playwright");
const { auto } = require("auto-playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  // Navigate to a website
  await page.goto("https://axoconnect-f6.mybigcommerce.com/");

  // `auto` can query data
  // In this case, the result is plain-text contents of the header
  const res = await auto("get the header text", { page });

  // use res.query to get a query result.
  console.log(res);

  await auto("add item to cart", { page });
  await auto("go to shopping cart page", { page });
  const itemsList = await auto("list all items in the cart", { page });
  const totalPrice = await auto("what is the total price?", { page });
  expect(itemsList).toContain('Item X');
  expect(totalPrice).toMatch(/\$\d+/);

  await page.close();
})();


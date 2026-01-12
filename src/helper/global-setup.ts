// src/helper/global-setup.ts
import { Page, BrowserContext } from '@playwright/test';

let page: Page;
async function globalSetup(context: BrowserContext) {
  console.log('Running global setup...');

  // Create a new page
   page = await context.newPage();
  // Navigate to the login page
  await page.goto('https://qacart-todo.herokuapp.com/login');

  // Fill in the login form
  await page.fill('#email', 'ysoltan713@gmail.com');
  await page.fill('[data-testid="password"]', 'Serion2005@');

  // Submit the form
  await page.click('#submit');

  // Wait for the login to complete
  await page.waitForURL('https://qacart-todo.herokuapp.com/todo');

  // Save the storage state to a file
  await context.storageState({ path: 'storageState.json' });
  console.log('storageState.json created successfully');

  // Close the page
  await page.close();
}

export default globalSetup;
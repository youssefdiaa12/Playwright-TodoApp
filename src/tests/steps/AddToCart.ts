import {Given, Then, When} from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixture';


   Given('User search for a {string}', async function (book: string) {
       await pageFixture.page.locator("input[type='search']").fill(book);
       await pageFixture.page.locator("input[type='search']").press('Enter');
  });
  
  When('User adds the book to the cart', async () => {
      // Implement step: User clicks on the login button
      await pageFixture.page.locator("button:has-text('Add to Cart')").click();
  });

  Then('The Cart badge should be updated', async () => {
      // Implement step: Login should be successful
       const cartBadgeContent = await pageFixture.page.locator("#mat-badge-content-0").textContent();
   console.log(cartBadgeContent);
  });

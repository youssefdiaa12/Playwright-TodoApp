import { test, expect } from '@playwright/test';

test('herokou', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();
  await expect(page.locator('h1')).toContainText('Welcome to the-internet');
  await page.getByRole('link', { name: 'Form Authentication' }).click();
  await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
  await expect(page.locator('h2')).toContainText('Login Page');
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).pressSequentially('SuperSecretPassword!',{delay:200});
  await expect(page.getByRole('button', { name: ' Login' })).toBeVisible();
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.getByText('You logged into a secure area')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByText('You logged out of the secure')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('You logged out of the secure area!! ×');
});


test('click',async({page})=>{  
  await page.goto('https://play1.automationcamp.ir/mouse_events.html')
  page.locator('[id="click_area"]').click()
  await expect(page.locator('[id="click_type"]')).toHaveText('Click')
    page.locator('[id="click_area"]').dblclick()
  await expect(page.locator('[id="click_type"]')).toHaveText('Double-Click')
    page.locator('[id="click_area"]').click({button:'right'})
  await expect(page.locator('[id="click_type"]')).toHaveText('Right-Click')


  await page.close();
})



test('CheckBox',async({page})=>{  
  await page.goto('https://the-internet.herokuapp.com/checkboxes')
  page.locator('//*[@type="checkbox"][1]').uncheck()
  await expect(page.locator('//*[@type="checkbox"][1]').isChecked()).toBeFalsy();
  page.locator('//*[@type="checkbox"][1]').check()
  await expect(page.locator('//*[@type="checkbox"][1]').isChecked()).toBeTruthy();
   
  await page.close();
})

test('DropDown',async({page})=>{  
  await page.goto('https://the-internet.herokuapp.com/dropdown')
  page.selectOption('#dropdown',{
      label:'Option 1'
    })
  page.selectOption('#dropdown',{
      value:'2'
    })
    page.selectOption('#dropdown',{
      index:1
    })
   
  await page.close();
})


test('Multi DropDown',async({page})=>{  
  await page.goto('https://www.lambdatest.com/selenium-playground/select-drop-down-demo');
  page.selectOption('#dropdown',[
    {value:"Florida"},
    {value:"New Jersey"}
  ])
  
   
  await page.close();
})


test('Dynamic Drop-Down',async({page})=>{  
  await page.goto('https://demo.automationtesting.in/Register.html');
  
  await page.locator('[role="combobox"]').click()
  
    await page.locator('//li[text()="Australia"]').click()

 
  await page.close();
})


test('Alert',async({page})=>{
 await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
  // to test alert you have to put the alert code before doing the click that trigger the alert

  page.on("dialog",async(alert)=>{
  
    const AlertMessage = alert.message()

    expect(AlertMessage).toEqual('I am a JS Alert')
  
    await alert.accept()
    
    await expect(page.locator('[id="result"]')).toHaveText('You Have successfully click on alert');
  }
)
 await page.locator('[onclick="jsAlert()"]').click()
  

 
  await page.close();
})


test('on click confirm',async({page})=>{
 await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
  // to test alert you have to put the alert code before doing the click that trigger the alert

  page.on("dialog",async(alert)=>{
  
    const AlertMessage = alert.message()

    expect(AlertMessage).toEqual('I am a JS Confirm')
  
    await alert.accept()
    
    await expect(page.locator('[id="result"]')).toHaveText('You clicked: Ok');
  }
)

 await page.locator('[onclick="jsConfirm()"]').click()
  

 
  await page.close();
})



test('on click Message',async({page})=>{
 await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
  // to test alert you have to put the alert code before doing the click that trigger the alert

  page.on("dialog",async(alert)=>{
  
    const AlertMessage = alert.message()

    expect(AlertMessage).toEqual('I am a JS prompt')
  
    await alert.accept("Omar")
    
    await expect(page.locator('[id="result"]')).toHaveText('You entered: Diaa');
  }
)

 await page.locator('[onclick="jsPrompt()"]').click()
  

 
  await page.close();
})



test('on click Cancel',async({page})=>{
 await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
  // to test alert you have to put the alert code before doing the click that trigger the alert

  page.on("dialog",async(alert)=>{
  
    const AlertMessage = alert.message()

    expect(AlertMessage).toEqual('I am a JS prompt')
  
    await alert.dismiss()
    
    await expect(page.locator('[id="result"]')).toHaveText('You entered: ');
  }
)

 await page.locator('[onclick="jsPrompt()"]').click()
  

 
  await page.close();
})




test('frames',async({page})=>{
 await page.goto('https://the-internet.herokuapp.com/nested_frames');
  
  // to test alert you have to put the alert code before doing the click that trigger the alert

  let frameCount = page.frames().length
  console.log(frameCount)

 const  frameTop= page.frameLocator('[src="/frame_top"]').frameLocator('[src="/frame_left"]')
 .locator('//body[contains(text(),"LEFT")]')


 // alternative way to access frame
 const frameTop1= page.frame('frame-top')
 const middleFrame = frameTop1?.childFrames()[1]
 // .locator('//body[contains(text(),"LEFT")]')
})


test('tabs', async ({ page }) => {
  // 1) Navigate to a page that has a "open new window" link
  await page.goto('https://the-internet.herokuapp.com/windows');

  // 2) Prepare to capture the popup event (new tab) at the exact moment the click triggers it.
  //    Promise.all ensures we start waiting for the 'popup' BEFORE clicking the link that opens it.
  const [browserTabs] = await Promise.all([
    page.waitForEvent('popup'),
    // NOTE: this click should NOT be awaited separately; include it as a promise in Promise.all (as shown).
    page.locator('[href="/windows/new"]').click(),
  ]);

  // 3) Wait until the new tab has finished loading.
  await browserTabs.waitForLoadState();

  // 4) Get all pages (tabs) in the current browser context.
  const pages = browserTabs.context().pages();

  // 5) The first page in the context array is usually the original tab.
  const defaultTab = pages[0];

  // 6) Assert the original tab still shows the expected heading.
  await expect(defaultTab.locator('//h3')).toHaveText('Opening a new window');

  // 7) The last page in the array is the newest tab.
  const latest = pages[pages.length - 1];

  // 8) Assert the new tab shows the expected heading.
  await expect(latest.locator('//h3')).toHaveText('New Window');
});





test('DranAndDrop', async ({ page }) => {
  // 1) Navigate to a page that has a "open new window" link
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

  const DragA= page.locator('[id="column-a"]');
  const DragB= page.locator('[id="column-b"]');
  

  await DragA.hover();
  await page.mouse.down();
  await DragB.hover();
  await page.mouse.up();

await page.waitForTimeout(2000);

await DragB.dragTo(DragA);

await page.waitForTimeout(2000);
page.close();
});











test('Download', async ({ page }) => {
  // 1) Navigate to a page that has a "open new window" link
  await page.goto('https://the-internet.herokuapp.com/download');

  // 2) Prepare to capture the popup event (new tab) at the exact moment the click triggers it.
  //    Promise.all ensures we start waiting for the 'popup' BEFORE clicking the link that opens it.
  const download = await Promise.all([
    page.waitForEvent('download'),
    // NOTE: this click should NOT be awaited separately; include it as a promise in Promise.all (as shown).
    page.locator('[href="download/random_data.txt"]').click(),
  ]);

const DownloadedFile= download[0];
const DownloadedFilePath = await DownloadedFile.path();
const DownloadedFileName =  DownloadedFile.suggestedFilename();

await DownloadedFile.saveAs(DownloadedFileName);

console.log(`the downloaded file path is ${DownloadedFilePath}`);
page.close();
});




test('Upload', async ({ page }) => {
  // 1) Navigate to a page that has a "open new window" link
  await page.goto('https://the-internet.herokuapp.com/upload');

  // 2) Prepare to capture the popup event (new tab) at the exact moment the click triggers it.
  //    Promise.all ensures we start waiting for the 'popup' BEFORE clicking the link that opens it.
  const fileUpload = await Promise.all([
    page.waitForEvent('filechooser'),
    // NOTE: this click should NOT be awaited separately; include it as a promise in Promise.all (as shown).
    page.locator('[id="random_data.txt"]').click(),
  ]);

const UploadedFile= fileUpload[0];

UploadedFile.setFiles('./PlaywrightScript.txt')
page.close();
});



const BaseURL = 'https://api.restful-api.dev/';
const ObjectPath = 'objects';
const fullPath = BaseURL + ObjectPath;

let objectID: string | null = null;
let fullPathWithObjectID: string;

test.describe.serial('API tests', () => {
  test('API Get', async ({ request }) => {
    const response = await request.get(`${BaseURL}${ObjectPath}`);
    const responseBody = await response.json();
    const responseHeaders = response.headers();

    console.log(responseBody);
    console.log(responseHeaders);

    expect(response.status()).toBe(200);
    // Be careful: response shape may change; this assumes first element has id "1"
    expect(responseBody[0].id).toBe('1');

    const raw = await response.body(); // ArrayBuffer
    expect(raw.byteLength).toBeLessThan(2000);
  });

  test('API Post', async ({ request }) => {
    const payload = {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    };

    const response = await request.post(fullPath, { data: payload });
    expect(response.status()).toBe(200); // restful-api.dev usually returns 200 for successful POST

    const responseBody = await response.json();
    objectID = responseBody.id;
    fullPathWithObjectID = `${fullPath}/${objectID}`;

    console.log('Created id:', objectID);
    console.log(responseBody);

    expect(responseBody.name).toContain(payload.name);
  });

  test('API Put', async ({ request }) => {
    const payload = {
      name: 'Apple MacBook Pro 11',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    };

    // Ensure objectID exists
    expect(objectID, 'objectID should be set by POST').toBeTruthy();

    const response = await request.put(fullPathWithObjectID, { data: payload });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.name).toContain(payload.name);
  });

  test('API Patch', async ({ request }) => {
    const payload = {
      name: 'Apple MacBook Pro 111',
    };

    expect(objectID, 'objectID should be set by POST').toBeTruthy();

    // PATCH is more appropriate for partial update
    const response = await request.patch(fullPathWithObjectID, { data: payload });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.name).toContain(payload.name);
  });

  test('API Delete', async ({ request }) => {
    expect(objectID, 'objectID should be set by POST').toBeTruthy();

    const response = await request.delete(fullPathWithObjectID);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    // The delete message includes the ID that was actually created.
    // Don't hardcode a different id; assert it contains your objectID.
    expect(responseBody.message).toContain(`Object with id = ${objectID} has been deleted.`);
  });
});























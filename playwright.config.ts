
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
 // globalSetup: './src/helper/global-setup.ts',
  testDir: './src/TC',
 // globalSetup: './src/tests/login.setup.ts',
   timeout: 60_000,          // overall test timeout
  expect: { timeout: 10_000 }, // for expect() conditions
  /* Run tests in files in random order. */
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
reporter: [
  ['html'],                                        // console
  ['allure-playwright'],
    ['list']
    // ['json', { outputFile: 'test-results/report.json' }], // JSON file
    // ['html', { outputFolder: 'playwright-report', open: 'never' }], // HTML report
  ],  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: false,
    ignoreHTTPSErrors: true,
    baseURL: 'https://deploy-server.iskraemeco.com.eg:4400',
    storageState: 'storageState.json',
    trace: 'on',
    screenshot:'only-on-failure',
    video:'on'
  },
  // grep:[RegExp('@smoke')],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
            headless:false //headless mode false means browser is visible 
       },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'],
    //         headless:false //headless mode false means browser is visible
    //    },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'],
    //         headless:true //headless mode true means browser is not visible
    //    },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

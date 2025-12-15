
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  globalSetup: './src/tests/login.setup.ts',
  fullyParallel: false,
  reporter: 'html',
  use: {
    headless: false,
    ignoreHTTPSErrors: true,
    baseURL: 'https://deploy-server.iskraemeco.com.eg:4400',
    storageState: 'storageState.json',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        headless: false,
        baseURL: 'https://deploy-server.iskraemeco.com.eg:4400',
        storageState: 'storageState.json',
        ignoreHTTPSErrors: true,
      },
    },
  ],
});

import { defineConfig } from '@playwright/test'

// Uses the Chrome installed on the machine (no browser download) and the dev server.
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  workers: 4,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5180',
    channel: 'chrome',
    viewport: { width: 1440, height: 1000 },
    locale: 'fr-FR',
    timezoneId: 'Europe/London',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5180',
    reuseExistingServer: true,
  },
})

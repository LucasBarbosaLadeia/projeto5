import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  // ⬇️ ADICIONE AQUI O TIMEOUT GLOBAL DE TESTE (60 segundos)
  timeout: 60000,

  // ⬇️ Adicione aqui o timeout dos "expect" (esperas individuais)
  expect: {
    timeout: 20000,
  },

  use: {
    ignoreHTTPSErrors: true,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});

import { test, expect } from "@playwright/test";

test("User login", async ({ page }) => {
    await page.goto("https://cinebook.local:/")
    const title = await page.getByText("Login")

    expect(title).toBeTruthy()
    await page.getByPlaceholder("Email").fill("emal@gmail.com")
    await page.getByPlaceholder("Senha").fill("12345")
    await page.getByRole("button", { name: "Entrar" }).click()
    await expect(page).toHaveURL("https://cinebook.local:/")

    await page.getByPlaceholder("Email").fill("email@gmail.com")
    await page.getByPlaceholder("Senha").fill("12345678")
    await page.getByRole("button", { name: "Entrar" }).click()
    await expect(page).toHaveURL("https://cinebook.local:/home")

   
})
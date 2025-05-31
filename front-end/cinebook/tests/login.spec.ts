import { test, expect } from "@playwright/test";

test("User login", async ({ page }) => {
    await page.goto("http://localhost:5173/")
    const title = await page.getByText("Login")

    expect(title).toBeTruthy()

    await page.getByPlaceholder("Email").fill("emalis@gmail.com")
await page.getByPlaceholder("Senha").fill("12345678")

    await page.getByRole("button", { name: "Entrar" }).click()
   
    await expect(page).toHaveURL("http://localhost:5173/home")

   
})

import { test, expect } from "@playwright/test";

test("Cadastro de usuario", async ({ page }) => {
    await page.goto("http://localhost:5173/")
    const title = await page.getByText("Login")



    expect(title).toBeTruthy()

    await page.getByRole("link", { name: "cadastre-se" }).click()
   
    await expect(page).toHaveURL("http://localhost:5173/signup")

    await page.getByPlaceholder("nome").fill("nome")
    await page.getByPlaceholder("E-mail").fill("kkkkkk@gmail.com")
    await page.getByPlaceholder("CPF").fill("11770764976")
    await page.getByPlaceholder("Senha").fill("12345678")
    await page.getByPlaceholder("Confirme").fill("12345678")

    await page.getByRole("button", { name: "criar conta" }).click()

    await expect(page).toHaveURL("http://localhost:5173/");
    
   
})
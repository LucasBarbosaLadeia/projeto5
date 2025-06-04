import { test, expect } from "@playwright/test";

test("Cadastro de usuario", async ({ page }) => {
    await page.goto("http://localhost:/")
    const title = await page.getByText("Login")



    expect(title).toBeTruthy()

    await page.getByRole("link", { name: "cadastre-se" }).click()
   
    await expect(page).toHaveURL("http://localhost:/signup")

    await page.getByPlaceholder("nome").fill("nome")
    await page.getByPlaceholder("E-mail").fill("kfsssssyjddk@gmail.com")
    await page.getByPlaceholder("CPF").fill("11770764976")
    await page.getByPlaceholder("Senha").fill("12345678")
    await page.getByPlaceholder("Confirme").fill("12345678")

    await page.getByRole("button", { name: "criar conta" }).click()

    await expect(page).toHaveURL("http://localhost:/signup");
    await page.waitForTimeout(1000); // só para testar se redireciona com atraso
console.log("URL atual:", page.url());
   
})
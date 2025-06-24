import { test, expect } from "@playwright/test";

test("Cadastro de usuario", async ({ page }) => {
    await page.goto("https://cinebook.local:/")
    const title = await page.getByText("Login")



    expect(title).toBeTruthy()

    await page.getByRole("link", { name: "cadastre-se" }).click()
   
    await expect(page).toHaveURL("https://cinebook.local:/signup")
    const random = Math.floor(Math.random() * 100000);
const email = `user${random}@test.com`;

    await page.getByPlaceholder("nome").fill("nome")
    await page.getByPlaceholder("E-mail").fill(email)
    await page.getByPlaceholder("CPF").fill("94999548054")
    await page.getByPlaceholder("Senha").fill("12345678")
    await page.getByPlaceholder("Confirme").fill("12345678")

    await page.getByRole("button", { name: "criar conta" }).click()
     await page.waitForTimeout(3000); 
    await expect(page).toHaveURL("https://cinebook.local:/");
    await page.waitForTimeout(1000);
console.log("URL atual:", page.url());
   expect(title).toBeTruthy()

    await page.getByPlaceholder("Email").fill(email)
await page.getByPlaceholder("Senha").fill("12345678")

    await page.getByRole("button", { name: "Entrar" }).click()
   
    await expect(page).toHaveURL("https://cinebook.local:/home")

    await expect(page.getByRole("link", { name: "Usuario" })).toBeVisible();
    await page.getByRole("link", { name: "Usuario" }).click()
    await page.getByRole("button", { name: "Deletar Perfil" }).waitFor();
    await page.getByRole("button", { name: "Deletar Perfil" }).click()
      await page.waitForTimeout(3000); 
})
import { test, expect } from "@playwright/test";

test("crud de actors", async ({ page }) => {
    await page.goto("http://localhost/")
    const title = await page.getByText("Login")

    expect(title).toBeTruthy()

    await page.getByPlaceholder("Email").fill("email@gmail.com")
    await page.getByPlaceholder("Senha").fill("12345678")

    await page.getByRole("button", { name: "Entrar" }).click()
   
    await expect(page).toHaveURL("http://localhost/home")
    await expect(page.getByRole("link", { name: "createActors" })).toBeVisible();
    await page.getByRole("link", { name: "createActors" }).click()
//listagem
    await expect(page.getByText('ID')).toBeVisible
//falha de listagem
    const falha = page.getByText('matt');
    await expect(falha).not.toBeVisible();

//criação do filme
    const random = Math.floor(Math.random() * 100000);
    const nome = `${random}`;
    await page.getByRole("button",{name: "Novo ator"}).click()
   await page.getByLabel("Nome").fill(nome);
    await page.getByLabel("Idade").fill("30");
    await page.getByLabel("Nacionality").fill("brasileiro");
    await page.getByRole("button",{name: "salvar"}).click()
    await page.waitForTimeout(1000);
    const testefilme = page.getByText(nome);
    await expect(await testefilme.count()).toBeGreaterThan(0);

//falha de criação
    await page.getByRole("button",{name: "Novo ator"}).click()
    await page.getByLabel("Nome").fill("erro");
    await page.getByLabel("idade").fill("cinquenta");
    await page.getByLabel("Nacionality").fill("brasileiro");
    await page.getByRole("button",{name: "salvar"}).click()
    
    await page.getByRole("button",{name: "Cancelar"}).click()

    const testefilmefalha = page.getByText('erro');
    await expect(await testefilmefalha.count()).toBeLessThan(1)
//delete
 await page.getByTestId(`delete-film-${nome}`).click();
  await expect(page.locator('div', { hasText: nome })).toHaveCount(0);
//delete falha
    const card = page.locator('div', { hasText: 'Homem Aranha' });

    const deleteButtonfalha = card.getByRole('button', { name: 'deletar' });
    await expect(deleteButtonfalha).not.toBeVisible();
//edição
    await page.locator("button", { hasText: "editar" }).first().click();
    await page.getByPlaceholder("Nome").fill("Novoatorios");
    await page.getByPlaceholder("Idade").fill("30");
    await page.getByPlaceholder("Nacionality").fill("brasileiro");
    await page.getByRole("button",{name: "salvar alterações"}).click()
    await expect(page.getByText("Novoatorios")).toBeVisible();
//edição falha
    await page.locator("button", { hasText: "editar" }).first().click();
    await page.getByPlaceholder("Nome").fill("Novo ator");
    await page.getByPlaceholder("Idade").fill("quarenta");
    await page.getByPlaceholder("Nacionality").fill("brasileiro");
    await page.getByRole("button",{name: "salvar alterações"}).click()

    await expect(page.getByRole('button', { name:'Salvar Alterações'})).toBeVisible();
    await page.getByRole("button",{name: "Cancelar"}).click()

    
})
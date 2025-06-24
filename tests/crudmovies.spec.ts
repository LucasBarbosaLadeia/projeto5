import { test, expect } from "@playwright/test";

test("crud de movies", async ({ page }) => {
    await page.goto("https://cinebook.local/")
    const title = await page.getByText("Login")

    expect(title).toBeTruthy()

    await page.getByPlaceholder("Email").fill("email@gmail.com")
    await page.getByPlaceholder("Senha").fill("12345678")

    await page.getByRole("button", { name: "Entrar" }).click()
   
    await expect(page).toHaveURL("https://cinebook.local/home")
    await expect(page.getByRole("link", { name: "create Movies" })).toBeVisible();
    await page.getByRole("link", { name: "create Movies" }).click()
//listagem
    await expect(page.getByText('ID')).toBeVisible
//falha de listagem
    const falha = page.getByText('homem aranha');
    await expect(falha).not.toBeVisible();

   

//outra listagem 
    await expect(page.getByText('Novo Nome do Filme')).toBeVisible
//criação do filme
    const random = Math.floor(Math.random() * 100000);
    const nome = `${random}`;
    await page.getByRole("button",{name: "Novo filme"}).click()
    await page.getByLabel("Nome").fill(nome);
    await page.getByLabel("Descrição").fill("Descrição");
    await page.getByLabel("Imagens").fill("https://br.web.img3.acsta.net/pictures/15/10/15/22/24/429658.jpg");
    await page.getByLabel("Data de Lançamento").fill("2024-04-04T00:00:00.000Z");
        await page.waitForTimeout(1000);
await page.selectOption('select[name="actors"]', '1');
    await page.getByRole("button",{name: "salvar"}).click()
    await page.waitForTimeout(1000);
    const testefilme = page.getByText(nome);
    await expect(await testefilme.count()).toBeGreaterThan(0);

//falha de criação
    await page.getByRole("button",{name: "Novo filme"}).click()
    await page.waitForSelector('input[id="field-name"]');
    await page.getByLabel("Nome").fill("cachorro");
    await page.getByLabel("Descrição").fill("Descrição");
    await page.getByLabel("Imagens").fill("https://br.web.img3.acsta.net/pictures/15/10/15/22/24/429658.jpg");
    await page.getByLabel("Data de Lançamento").fill("wifggvcldgc");
await page.selectOption('select[name="actors"]', '1');
    await page.getByRole("button",{name: "salvar"}).click()
    
    await page.getByRole("button",{name: "Cancelar"}).click()

    const testefilmefalha = page.getByText('cachorro');
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
    await page.getByLabel("Nome").fill("editado");
    await page.getByLabel("Descrição").fill("Descriç atualizada");
    await page.getByLabel("Data de Lançamento").fill("2025-04-04T00:00:00.000Z");
    await page.getByRole("button",{name: "salvar alterações"}).click()
     await page.waitForTimeout(1000);
     await expect(page.getByText("editado")).toBeVisible();
    await page.locator("button", { hasText: "editar" }).first().click();
    await page.getByLabel("Nome").fill("Novo Filme");
    await page.getByLabel("Descrição").fill("Descriç atualizada");
    await page.getByLabel("Data de Lançamento").fill("fjnvsobgdb");
    await page.getByRole("button",{name: "salvar alterações"}).click()

    await expect(page.getByRole('button', { name:'Salvar Alterações'})).toBeVisible();
    await page.getByRole("button",{name: "Cancelar"}).click()

    
})
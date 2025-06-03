import { test, expect } from "@playwright/test";

test("Listing movies", async ({ page }) => {
    await page.goto("http://localhost/")
    const title = await page.getByText("Login")

    expect(title).toBeTruthy()

    await page.getByPlaceholder("Email").fill("email@gmail.com")
    await page.getByPlaceholder("Senha").fill("12345678")

    await page.getByRole("button", { name: "Entrar" }).click()
   
    await expect(page).toHaveURL("http://localhost/home")
    await expect(page.getByRole("link", { name: "createMovies" })).toBeVisible();
    await page.getByRole("link", { name: "createMovies" }).click()
    await expect(page.getByText('ID')).toBeVisible

    await page.getByRole("button",{name: "editar - $1"}).click()
    await page.getByLabel("Nome").fill("Novo Nome do Filme");
    await page.getByLabel("Descrição").fill("Descrição atualizada");
    await page.getByLabel("Data de Lançamento").fill("2024-04-04T00:00:00.000Z");
    await page.getByRole("button",{name: "salvar alterações"}).click()

    await expect(page.getByText('Novo Nome do Filme')).toBeVisible

    await page.getByRole("button",{name: "Novo filme"}).click()
    await page.getByLabel("Nome").fill("dinosaro");
    await page.getByLabel("Descrição").fill("Descrição");
    await page.getByLabel("Imagens").fill("https://br.web.img3.acsta.net/pictures/15/10/15/22/24/429658.jpg");
    await page.getByLabel("Data de Lançamento").fill("2024-04-04T00:00:00.000Z");
    await page.getByLabel("IDs dos Atores (separados por vírgula)").fill("1");
    await page.getByRole("button",{name: "salvar"}).click()

    await page.getByRole("button",{name: "deletar"}).click()
    
    

})

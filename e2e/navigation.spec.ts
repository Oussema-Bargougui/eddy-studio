import { expect, test } from '@playwright/test'

test('Ctrl+K finds a scenario and opens it', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.keyboard.press('Control+k')
  const bar = page.getByRole('dialog', { name: 'Barre de commande' })
  await expect(bar).toBeVisible()
  await bar.getByRole('combobox').fill('absent')
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'e2e/shots/5-command.png' })
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/scenario\/absent-teacher$/)
  await expect(page.getByRole('heading', { name: 'Qui est absent, et quand ?' })).toBeVisible()
})

test('Explorer: classes below the threshold, every class one click away', async ({ page }) => {
  await page.goto('/explorer/presence')
  await expect(page.getByText(/2 classes sous le seuil/)).toBeVisible()
  await page.getByRole('button', { name: 'Voir les 24 classes' }).click()
  await expect(page.getByRole('link', { name: /^7ème B/ })).toBeVisible()
  await expect(page.locator('a[href*="classe="]')).toHaveCount(24)

  await page.getByRole('link', { name: /^7ème B/ }).click()
  await expect(page).toHaveURL(/classe=7B/)
  const file = page.getByRole('complementary', { name: 'Fiche de la 7ème B' })
  await expect(file.getByText('Yassine T.')).toBeVisible()
  await page.getByRole('button', { name: 'Réduire' }).click()
  await page.waitForTimeout(1500)
  await page.screenshot({ path: 'e2e/shots/2-explorer.png', fullPage: true })

  await file.getByRole('link', { name: 'Fermer' }).click()
  await expect(file).toBeHidden()
})

test('Unknown theme falls back to Présence', async ({ page }) => {
  await page.goto('/explorer/nimporte-quoi')
  await expect(page).toHaveURL(/\/explorer\/presence$/)
})

test('Catalogue: three rhythms, ten scenarios, search narrows', async ({ page }) => {
  await page.goto('/scenarios')
  await expect(page.getByRole('heading', { name: 'Au quotidien' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Commencer →/ })).toHaveCount(10)
  await page.waitForTimeout(1200)
  await page.screenshot({ path: 'e2e/shots/7-catalogue.png', fullPage: true })

  await page.getByLabel('Décrire la situation').fill('bulletins')
  await expect(page.getByRole('link', { name: /Commencer →/ })).toHaveCount(1)

  await page.getByRole('button', { name: /Opérations simples/ }).click()
  await expect(page.getByRole('button', { name: 'Ajouter un élève' })).toBeVisible()
})

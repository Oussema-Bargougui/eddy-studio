import { expect, test } from '@playwright/test'

test('Un enseignant est absent: from the form to "Valider"', async ({ page }) => {
  test.setTimeout(60_000)
  await page.goto('/scenario/absent-teacher')

  // Step 1 — pre-filled from the briefing; Eddy shows the lessons it found.
  await expect(page.getByRole('heading', { name: 'Qui est absent, et quand ?' })).toBeVisible()
  await expect(page.getByLabel('Enseignant')).toHaveValue('t-bernard')
  await expect(page.getByText('4 cours de M. Bernard jeudi 26, dans 4 classes.')).toBeVisible()
  await page.waitForTimeout(900)
  await page.screenshot({ path: 'e2e/shots/8-scenario-form.png' })

  // Enter in a field never submits: the form has no submit button at all.
  await page.getByLabel('Du').press('Enter')
  await page.waitForTimeout(500)
  await expect(page.getByRole('heading', { name: 'Qui est absent, et quand ?' })).toBeVisible()

  // Dates are checked before moving on.
  await page.getByLabel('Au').fill('2026-11-20')
  await page.getByRole('button', { name: /Continuer : ses cours/ }).click()
  await expect(page.getByText('La fin doit être après le début.')).toBeVisible()
  await page.getByLabel('Au').fill('2026-11-26')
  await page.getByRole('button', { name: /Continuer : ses cours/ }).click()

  // Step 2 — every lesson ticked by default.
  await expect(page.getByRole('heading', { name: 'Quels cours sont touchés ?' })).toBeVisible()
  await expect(page.getByRole('checkbox', { checked: true })).toHaveCount(4)
  await page.getByRole('button', { name: /Continuer : les remplaçants/ }).click()

  // Step 3 — Eddy's suggestions picked, the uncovered lesson flagged.
  await expect(page.getByRole('heading', { name: 'Qui remplace M. Bernard jeudi ?' })).toBeVisible()
  await expect(page.getByText('3 trouvés, 1 à décider')).toBeVisible()
  const preview = page.getByRole('complementary', { name: 'Ce qui sera écrit dans EduCap' })
  await expect(preview.getByText(/3 remplacements créés/)).toBeVisible()
  await page.waitForTimeout(700)
  await page.screenshot({ path: 'e2e/shots/4-scenario-substitutes.png' })
  await page.getByRole('combobox').last().selectOption('study')
  await expect(preview.getByText(/1 en étude/)).toBeVisible()
  await page.getByRole('button', { name: /Continuer : prévenir les familles/ }).click()

  // Step 4 — at least one channel is required.
  await page.getByLabel(/Notification dans l'application/).uncheck()
  await page.getByRole('button', { name: /Continuer : vérifier/ }).click()
  await expect(page.getByText('Choisissez au moins un canal.')).toBeVisible()
  await page.getByLabel('SMS').check()
  await page.getByRole('button', { name: /Continuer : vérifier/ }).click()

  // Step 5 — review. Nothing is written until "Valider": not on arrival, not with Enter.
  await expect(page.getByRole('heading', { name: 'Tout est prêt' })).toBeVisible()
  await page.waitForTimeout(1500)
  await expect(page.getByRole('heading', { name: 'Tout est prêt' })).toBeVisible()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(1500)
  await expect(page.getByRole('heading', { name: 'Tout est prêt' })).toBeVisible()
  await page.getByRole('button', { name: 'Valider et écrire dans EduCap' }).click()
  await expect(page.getByRole('heading', { name: "C'est fait. Jeudi est couvert." })).toBeVisible({ timeout: 5000 })
  await expect(page.getByText(/Familles de 4 classes prévenues \(SMS\)/)).toBeVisible()
})

test('A scenario not built yet says so honestly', async ({ page }) => {
  await page.goto('/scenario/plan-exams')
  await expect(page.getByText('Ce scénario est en préparation.')).toBeVisible()
})

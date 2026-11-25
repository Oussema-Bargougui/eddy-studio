import { expect, test } from '@playwright/test'

test.describe('Briefing', () => {
  test('tells the morning with real figures, notes and priorities', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Bonjour Leila')
    // School time zone (Tunis), although the browser runs in London.
    await expect(page.getByText(/mercredi 25 novembre · 10:40/i)).toBeVisible()

    // Counters end on the real values.
    const figures = page.getByRole('region', { name: 'Chiffres du jour' })
    await expect(figures.getByLabel('612')).toBeVisible()
    await expect(figures.getByLabel('94,2')).toBeVisible()

    // Handwritten notes and the four priorities appear after the figures.
    await expect(page.getByText('à surveiller')).toBeVisible()
    await expect(page.getByText('7ème B et 9ème A')).toBeVisible()
    await expect(page.getByRole('link', { name: /Un enseignant est absent/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /→$/ })).toHaveCount(5)

    await page.waitForTimeout(2600)
    await page.screenshot({ path: 'e2e/shots/1-briefing.png', fullPage: true })
  })

  test('"Pourquoi ?" opens Eddy with the question asked, Escape closes it', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Pourquoi ?' }).first().click()
    const eddy = page.getByRole('dialog', { name: 'Eddy' })
    await expect(eddy).toBeVisible()
    await expect(eddy.getByText('Pourquoi la présence a-t-elle baissé cette semaine ?')).toBeVisible()
    await expect(eddy.getByText(/La présence baisse de 0,8 point/)).toBeVisible({ timeout: 5000 })

    // A follow-up suggestion asks a second question in the same conversation.
    await eddy.getByRole('button', { name: 'Pourquoi la 7ème B décroche ?' }).click()
    await expect(eddy.getByText(/presque tout se joue le vendredi après-midi/)).toBeVisible({ timeout: 5000 })
    await page.waitForTimeout(900)
    await page.screenshot({ path: 'e2e/shots/3-eddy.png' })

    await page.keyboard.press('Escape')
    await expect(eddy).toBeHidden()
  })
})

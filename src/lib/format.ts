/** Number formatting in the school's language. Figures never get rounded twice. */

export type Locale = 'fr' | 'en'

const tags: Record<Locale, string> = { fr: 'fr-FR', en: 'en-GB' }

export function formatNumber(value: number, digits = 0, locale: Locale = 'fr'): string {
  return value.toLocaleString(tags[locale], {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

/** Narrow no-break space: French puts one before "%", and the two never split across lines. */
export const NNBSP = ' '

/** "94,2 %" in French, "94.2%" in English. */
export function formatPercent(value: number, digits = 1, locale: Locale = 'fr'): string {
  const n = formatNumber(value, digits, locale)
  return locale === 'fr' ? `${n}${NNBSP}%` : `${n}%`
}

/** Signed difference in points: "+0,4 pt", "−5,7 pts". */
export function formatDelta(value: number, digits = 1, locale: Locale = 'fr'): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  const unit = Math.abs(value) >= 2 ? 'pts' : 'pt'
  return `${sign}${formatNumber(Math.abs(value), digits, locale)} ${unit}`
}

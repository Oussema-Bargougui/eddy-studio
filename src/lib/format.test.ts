import { formatDelta, formatNumber, formatPercent } from './format'

// Intl uses narrow no-break spaces in French; compare on normal spaces.
const plain = (s: string) => s.replace(/[  ]/g, ' ')

describe('format', () => {
  it('formats French numbers with a comma and thousands separator', () => {
    expect(plain(formatNumber(1234.5, 1))).toBe('1 234,5')
  })

  it('formats percentages per locale', () => {
    expect(plain(formatPercent(94.2))).toBe('94,2 %')
    expect(formatPercent(94.2, 1, 'en')).toBe('94.2%')
  })

  it('signs deltas and pluralises points', () => {
    expect(formatDelta(-5.7)).toBe('−5,7 pts')
    expect(formatDelta(0.4)).toBe('+0,4 pt')
    expect(formatDelta(0)).toBe('0,0 pt')
  })
})

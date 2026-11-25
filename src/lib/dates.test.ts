import { dateLine, minutesBetween } from './dates'

describe('dates', () => {
  it('shows the school time, not the machine time', () => {
    expect(dateLine('2026-11-25T09:40:00Z', 'fr', 'Africa/Tunis')).toBe('mercredi 25 novembre · 10:40')
    expect(dateLine('2026-11-25T09:40:00Z', 'fr', 'Europe/London')).toBe('mercredi 25 novembre · 09:40')
  })

  it('counts minutes since the last read', () => {
    expect(minutesBetween('2026-11-25T10:38:00+01:00', '2026-11-25T10:40:00+01:00')).toBe(2)
    expect(minutesBetween('2026-11-25T10:41:00+01:00', '2026-11-25T10:40:00+01:00')).toBe(0)
  })
})

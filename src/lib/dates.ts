/** "mercredi 25 novembre · 10:40", in the school's time zone whatever the browser's. */
export function dateLine(iso: string, locale: string, timeZone: string): string {
  const d = new Date(iso)
  const day = d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', timeZone })
  const time = d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', timeZone })
  return `${day} · ${time}`
}

/** Whole minutes between two ISO instants, never negative. */
export function minutesBetween(fromIso: string, toIso: string): number {
  return Math.max(0, Math.round((Date.parse(toIso) - Date.parse(fromIso)) / 60000))
}

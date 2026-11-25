/** The themes of Explorer; only "presence" has its wall so far. */
export const themes = [
  { id: 'presence', label: 'Présence', ready: true },
  { id: 'eleves', label: 'Élèves', ready: false },
  { id: 'emploi-du-temps', label: 'Emploi du temps', ready: false },
  { id: 'resultats', label: 'Résultats', ready: false },
  { id: 'finances', label: 'Finances', ready: false },
  { id: 'vie-scolaire', label: 'Vie scolaire', ready: false },
] as const

export type ThemeId = (typeof themes)[number]['id']

export const isThemeId = (value: string): value is ThemeId => themes.some((t) => t.id === value)

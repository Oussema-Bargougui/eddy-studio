/**
 * Messages exchanged with EduCap when Eddy Studio runs inside its page
 * (see educap-front-sag: routes/SalComponents/EddyStudio/bridge.js).
 */
export const MESSAGE = {
  ready: 'eddy-studio:ready',
  session: 'eddy-studio:session',
  navigate: 'eddy-studio:navigate',
} as const

export interface EduCapSession {
  token: string
  locale: string
  user: { firstName?: string; lastName?: string; roleId?: number }
  school: { name?: string }
}

/**
 * EduCap addresses allowed to embed Eddy Studio and send it a session.
 * Order of precedence: the container's runtime config (window.__EDDY_CONFIG__),
 * then the build-time variable, then the local defaults.
 * Separated by commas and/or spaces.
 */
export function allowedOrigins(raw: string | undefined = configuredOrigins()): string[] {
  const list = (raw ?? 'http://localhost:3002,http://localhost:3001')
    .split(/[\s,]+/)
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter(Boolean)
  return [...new Set(list)]
}

function configuredOrigins(): string | undefined {
  const runtime = typeof window !== 'undefined' ? window.__EDDY_CONFIG__?.educapOrigins : undefined
  return runtime || import.meta.env.VITE_EDUCAP_ORIGINS
}

/** Validates an incoming session message; anything else is ignored. */
export function readSession(data: unknown): EduCapSession | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (d.type !== MESSAGE.session || typeof d.token !== 'string' || !d.token) return null
  return {
    token: d.token,
    locale: typeof d.locale === 'string' ? d.locale : 'fr',
    user: (d.user as EduCapSession['user']) ?? {},
    school: (d.school as EduCapSession['school']) ?? {},
  }
}

/** EduCap speaks fr, en, ar, de, es; Eddy Studio has fr and en for now. */
export function studioLanguage(locale: string): 'fr' | 'en' {
  return locale.toLowerCase().startsWith('en') ? 'en' : 'fr'
}

/** The path reported to EduCap: without the technical `embedded` flag. */
export function reportablePath(pathname: string, search: string): string {
  const params = new URLSearchParams(search)
  params.delete('embedded')
  const query = params.toString()
  return `${pathname}${query ? `?${query}` : ''}`
}

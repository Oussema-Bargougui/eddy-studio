import 'i18next'
import type { fr } from './fr'

// Typed keys: t('nav.briefing') is checked at compile time.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: { translation: typeof fr }
  }
}

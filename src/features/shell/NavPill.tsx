import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const base = 'rounded-full px-[18px] py-[9px] text-sm font-medium text-ink no-underline transition-colors hover:bg-sand'
const active = 'bg-ink !text-cream font-semibold hover:bg-ink'

/** The floating navigation pill that replaces a sidebar. */
export function NavPill() {
  const { t } = useTranslation()
  return (
    <nav
      aria-label={t('nav.label')}
      className="flex gap-1 rounded-full border border-line bg-paper p-[5px] shadow-[0_6px_20px_-12px_rgb(27_35_64/0.25)]"
    >
      <Link to="/" className={base} activeProps={{ className: active }} activeOptions={{ exact: true }}>
        {t('nav.briefing')}
      </Link>
      <Link to="/explorer/$theme" params={{ theme: 'presence' }} className={base} activeProps={{ className: active }}>
        {t('nav.explorer')}
      </Link>
      <Link to="/scenarios" className={base} activeProps={{ className: active }}>
        {t('nav.scenarios')}
      </Link>
      <Link to="/journal" className={base} activeProps={{ className: active }}>
        {t('nav.journal')}
      </Link>
    </nav>
  )
}

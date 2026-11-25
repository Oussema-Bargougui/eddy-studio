import { useTranslation } from 'react-i18next'
import { useBriefing } from '@/api/queries'
import { useDataSource } from '@/api/useDataSource'
import { SearchIcon } from '@/ui/icons'
import { useEmbed } from '../embed/session'
import { Brand } from './Brand'
import { NavPill } from './NavPill'
import { ui } from './uiStore'

/**
 * Standalone: brand, navigation, command bar, profile.
 * Inside EduCap: EduCap already shows the logo, school and profile, so only
 * the navigation and the command bar stay.
 */
export function TopBar() {
  const { t } = useTranslation()
  const embedded = useEmbed((s) => s.embedded)
  const demo = useDataSource().kind === 'demo'
  const context = useBriefing().data?.context

  return (
    <header className="flex flex-wrap items-center justify-between gap-3.5">
      {embedded ? (
        <span className="font-display text-xl font-semibold tracking-[-0.01em]">Eddy Studio</span>
      ) : (
        <Brand school={context?.schoolName} year={context?.schoolYear} />
      )}
      <NavPill />
      <div className="flex items-center gap-2.5">
        {demo && (
          <span
            title="Les chiffres affichés viennent d'une école fictive, pas d'EduCap."
            className="rounded-full bg-warn-soft px-3 py-1.5 text-xs font-bold text-[#7A4A00]"
          >
            Données de démo
          </span>
        )}
        <button
          type="button"
          onClick={() => ui.setCommandOpen(true)}
          className="flex min-w-[240px] items-center gap-2.5 rounded-[14px] border border-line bg-paper px-3.5 py-2.5 text-left text-sm text-ink-soft hover:border-line-strong"
        >
          <SearchIcon size={16} />
          <span className="flex-1">{t('shell.command')}</span>
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-sans text-xs font-semibold">Ctrl K</kbd>
        </button>
        {context && !embedded && (
          <button
            type="button"
            aria-label={t('shell.profile', { name: context.userName })}
            className="grid h-11 w-11 place-items-center rounded-full bg-brand-tint text-sm font-bold text-brand-deep"
          >
            {context.userInitials}
          </button>
        )}
      </div>
    </header>
  )
}

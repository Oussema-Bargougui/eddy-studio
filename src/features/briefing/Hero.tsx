import { useTranslation } from 'react-i18next'
import type { Briefing } from '@/api/types'
import { dateLine, minutesBetween } from '@/lib/dates'
import { HandNote } from '@/ui/HandNote'
import { InkPath } from '@/ui/InkPath'

interface Props {
  briefing: Briefing
  onReplay: () => void
}


/** "Bonjour Leila. L'école tient bon ce matin — deux classes…" */
export function Hero({ briefing, onReplay }: Props) {
  const { t, i18n } = useTranslation()
  const { context, headline } = briefing
  const minutes = minutesBetween(context.readAt, context.now)

  return (
    <section className="relative flex flex-col gap-[18px]">
      <div className="flex flex-wrap items-center gap-3.5 text-[13px] text-ink-soft">
        <span className="font-semibold tracking-[0.12em] uppercase">{dateLine(context.now, i18n.language, context.timeZone)}</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-ok" />
          {t('shell.readAt', { minutes })}
        </span>
        <button
          type="button"
          onClick={onReplay}
          className="ml-auto rounded-full border border-line px-3 py-1.5 text-xs text-ink hover:border-line-strong"
        >
          {t('shell.replay')}
        </button>
      </div>
      <h1 className="m-0 max-w-[980px] font-display text-[clamp(36px,4.6vw,62px)] leading-[1.06] font-normal tracking-[-0.02em]">
        Bonjour {context.userFirstName}. {headline.before}
        <span className="font-semibold text-brand">{headline.highlight}</span>
        {headline.after}
      </h1>
      <div className="pointer-events-none absolute top-[158px] left-[min(470px,40%)] flex items-start gap-1 max-md:hidden">
        <svg width="70" height="44" viewBox="0 0 70 44" aria-hidden="true">
          <InkPath d="M66 40 C 50 34, 30 30, 10 6 M10 6 l 2 11 M10 6 l 10 3" />
        </svg>
        <HandNote className="mt-[22px]">{headline.note}</HandNote>
      </div>
    </section>
  )
}

import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { buttonClass } from '@/ui/button'

interface Props {
  title: string
  step: number
  total: number
  saves?: string
}

/** Focus-mode header: way out, where we are, how far along. */
export function ScenarioHeader({ title, step, total, saves }: Props) {
  const { t } = useTranslation()
  const pct = Math.round((step / total) * 100)
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-[clamp(16px,3vw,40px)] py-[18px]">
      <Link to="/scenarios" className={buttonClass('outline', 'md', 'w-[150px] justify-start')}>
        {step === 1 ? t('scenarios.catalogue') : t('scenarios.quit')}
      </Link>
      <div className="text-center">
        <div className="text-xs tracking-[0.12em] text-ink-soft uppercase">{t('scenarios.stepOf', { step, total })}</div>
        <div className="font-display text-2xl">{title}</div>
      </div>
      <div className="flex w-[150px] flex-col items-end gap-1.5">
        <progress
          aria-label="Progression"
          value={pct}
          max={100}
          className="h-2 w-full appearance-none overflow-hidden rounded-full [&::-moz-progress-bar]:bg-brand [&::-webkit-progress-bar]:bg-line [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-brand [&::-webkit-progress-value]:transition-[width]"
        />
        {saves && <span className="text-xs font-bold text-ok">≈ {saves} gagnées</span>}
      </div>
    </header>
  )
}

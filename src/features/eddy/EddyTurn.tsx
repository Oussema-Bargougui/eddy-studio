import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { BarChart } from '@/charts/BarChart'
import { formatNumber } from '@/lib/format'
import { buttonClass } from '@/ui/button'
import { CheckIcon } from '@/ui/icons'
import { ui } from '../shell/uiStore'
import { RichText } from './RichText'
import type { Turn } from './useConversation'

const rise = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }

/** One question and Eddy's answer: steps, sentence, chart, sources, what to do next. */
export function EddyTurn({ turn, onAsk }: { turn: Turn; onAsk: (q: string) => void }) {
  const { t } = useTranslation()
  const a = turn.answer

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="max-w-[80%] self-end rounded-[18px_18px_4px_18px] bg-ink px-4 py-3 text-[15px] text-cream">{turn.question}</div>

      {turn.status === 'thinking' && (
        <p aria-live="polite" className="m-0 animate-pulse text-sm text-ink-soft">
          {t('eddy.thinking')}
        </p>
      )}
      {turn.status === 'failed' && (
        <p role="alert" className="m-0 text-sm font-semibold text-bad-deep">
          {t('common.error')}
        </p>
      )}

      {a && (
        <>
          <motion.div {...rise} className="flex flex-wrap gap-2 text-xs font-semibold text-ok">
            {a.steps.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full bg-ok-soft px-2.5 py-1">
                <CheckIcon size={12} /> {s}
              </span>
            ))}
          </motion.div>
          <motion.div {...rise} transition={{ delay: 0.15 }} className="text-[15px] leading-relaxed">
            <p className="m-0 mb-2.5 font-display text-[22px] leading-snug">{a.headline}</p>
            <p className="m-0">
              <RichText text={a.body} />
            </p>
          </motion.div>
          {a.chart && (
            <motion.figure {...rise} transition={{ delay: 0.3 }} className="m-0 rounded-[18px] border border-sand px-[18px] py-4">
              <figcaption className="mb-2 text-[13px] font-semibold text-ink-soft">{a.chart.title}</figcaption>
              <BarChart bars={a.chart.bars} height={150} ariaLabel={a.chart.title} formatHighlight={(v) => formatNumber(v, Number.isInteger(v) ? 0 : 1)} />
            </motion.figure>
          )}
          {a.sources.length > 0 && (
            <div className="flex flex-wrap gap-1.5 text-xs text-ink-soft">
              <span>{t('eddy.sources')}</span>
              {a.sources.map((s, i) => (
                <span key={s}>
                  <span className="underline">{s}</span>
                  {i < a.sources.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          )}
          {a.scenario && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-brand-soft px-4 py-3.5">
              <div className="text-sm">
                <span className="text-xs font-bold tracking-[0.08em] text-brand uppercase">{t('eddy.toAct')}</span>
                <br />
                Scénario « {a.scenario.title} »
              </div>
              <Link to="/scenarios" onClick={() => ui.closeEddy()} className={buttonClass('brand', 'md')}>
                {t('eddy.openScenarios')}
              </Link>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {a.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onAsk(s)}
                className="rounded-full border border-line-strong px-3 py-2 text-[13px] text-ink hover:border-brand hover:text-brand"
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

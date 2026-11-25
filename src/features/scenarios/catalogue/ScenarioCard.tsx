import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import type { ScenarioSummary, Tone } from '@/api/types'
import { cn } from '@/lib/cn'

const badgeTone: Record<Tone, string> = {
  bad: 'bg-bad-soft text-bad-deep',
  warn: 'bg-warn-soft text-[#7A4A00]',
  ok: 'bg-ok-soft text-ok',
  neutral: 'bg-[#EDE6D8] text-ink',
}

/** One situation to sort out. The featured one (most urgent) is dark. */
export function ScenarioCard({ scenario, index }: { scenario: ScenarioSummary; index: number }) {
  const { t } = useTranslation()
  const dark = scenario.featured
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.4 }}
      whileHover={{ y: -3 }}
    >
      <Link
        to="/scenario/$scenarioId"
        params={{ scenarioId: scenario.id }}
        className={cn(
          'flex min-h-[180px] flex-col gap-3 rounded-[22px] p-5 no-underline shadow-[0_1px_0_var(--color-line),0_14px_30px_-24px_rgb(27_35_64/0.45)]',
          dark ? 'bg-night text-on-night' : 'bg-paper text-ink',
        )}
      >
        <div className="flex items-start justify-between gap-2.5">
          <span
            className={cn(
              'grid h-11 w-11 place-items-center rounded-[14px] font-display text-xl',
              dark ? 'bg-brand text-white' : 'bg-brand-soft text-brand',
            )}
          >
            {scenario.icon}
          </span>
          {scenario.badge && (
            <span
              className={cn(
                'rounded-full px-2.5 py-1 text-xs font-bold',
                dark ? 'bg-clay text-white' : badgeTone[scenario.badge.tone],
              )}
            >
              {scenario.badge.label}
            </span>
          )}
        </div>
        <span className="text-lg leading-tight font-semibold">{scenario.title}</span>
        <span className="text-sm leading-[1.45] opacity-80">{scenario.desc}</span>
        <span className="mt-auto flex items-center justify-between text-[13px] font-semibold">
          <span className="opacity-80">{t('scenarios.steps', { count: scenario.steps, saves: scenario.saves })}</span>
          <span>{t('common.start')}</span>
        </span>
      </Link>
    </motion.div>
  )
}

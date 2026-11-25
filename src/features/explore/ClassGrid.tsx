import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import type { AttendanceTheme } from '@/api/types'
import { Sparkline } from '@/charts/Sparkline'
import { cn } from '@/lib/cn'
import { formatDelta, formatPercent } from '@/lib/format'

type Order = 'worst' | 'name'

/** Every class as a small card, weakest first; unfolds in place. */
export function ClassGrid({ open, theme }: { open: boolean; theme: AttendanceTheme }) {
  const [order, setOrder] = useState<Order>('worst')
  const list = [...theme.classes].sort((a, b) =>
    order === 'worst' ? a.rate - b.rate : a.className.localeCompare(b.className, 'fr', { numeric: true }),
  )
  const below = theme.classes.filter((c) => c.rate < theme.threshold).length

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="my-3.5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[13px]">
              {theme.classes.length - below} classes au-dessus du seuil · {below} à surveiller
            </span>
            <fieldset className="m-0 flex gap-1 rounded-[10px] border border-line bg-cream p-[3px]">
              <legend className="sr-only">Trier</legend>
              {(['worst', 'name'] as const).map((o) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={order === o}
                  onClick={() => setOrder(o)}
                  className={cn('rounded-[7px] px-2.5 py-1 text-xs font-semibold text-ink-soft', order === o && 'bg-paper text-ink shadow-sm')}
                >
                  {o === 'worst' ? "Plus faible d'abord" : 'Par nom'}
                </button>
              ))}
            </fieldset>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 pb-1.5">
            {list.map((c) => {
              const bad = c.rate < theme.threshold
              const delta = c.rate - (c.series[0] ?? c.rate)
              return (
                <Link
                  key={c.classId}
                  to="."
                  search={{ classe: c.classId }}
                  className={cn(
                    'flex flex-col rounded-[14px] border px-3.5 pt-3 pb-2 text-ink no-underline transition-transform hover:-translate-y-0.5',
                    bad ? 'border-bad/45 bg-bad-soft/45' : 'border-line bg-paper hover:border-brand',
                  )}
                >
                  <span className="flex justify-between text-sm">
                    <strong>{c.className}</strong>
                    <span className={cn('font-bold tabular', bad && 'text-bad')}>{formatPercent(c.rate)}</span>
                  </span>
                  <span className={cn('text-xs', delta <= -1 ? 'font-semibold text-bad' : 'text-ink-soft')}>
                    {Math.abs(delta) < 1 ? 'Stable sur 5 semaines' : `${formatDelta(delta)} en 5 semaines`}
                  </span>
                  <Sparkline values={c.series} domain={[86, 99]} color={bad ? 'var(--color-bad)' : 'var(--color-brand)'} />
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

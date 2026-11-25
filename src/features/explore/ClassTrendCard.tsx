import { motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { AttendanceTheme } from '@/api/types'
import { LineChart, type LineSeries } from '@/charts/LineChart'
import { formatDelta, formatNumber } from '@/lib/format'
import { buttonClass } from '@/ui/button'
import { Card, CardHeadline, CardTitle } from '@/ui/Card'
import { ChevronDownIcon } from '@/ui/icons'
import { WhyButton } from '../eddy/WhyButton'
import { ClassGrid } from './ClassGrid'

const dropColors = ['var(--color-bad)', '#C2410C', '#9F1239']

/** Only the classes under the threshold, against the school; every class one click away. */
export function ClassTrendCard({ theme }: { theme: AttendanceTheme }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const below = theme.classes.filter((c) => c.rate < theme.threshold).sort((a, b) => a.rate - b.rate)
  const worst = below[0]
  const lastSchool = theme.school.at(-1) ?? 0

  const series: LineSeries[] = [
    { id: 'school', name: 'École', values: theme.school, color: 'var(--color-ink-faint)', dashed: true, endLabel: `École ${formatNumber(lastSchool, 1)}`, endLabelColor: 'var(--color-ink-soft)' },
    ...below.map((c, i) => ({
      id: c.classId,
      name: c.className,
      values: c.series,
      color: dropColors[i % dropColors.length]!,
      endLabel: `${c.className} ${formatNumber(c.rate, 1)}`,
    })),
  ]
  const headline = below.length
    ? `${below.length} classe${below.length > 1 ? 's' : ''} sous le seuil — les ${theme.classes.length - below.length} autres au-dessus de ${theme.threshold} %`
    : `Toutes les classes sont au-dessus de ${theme.threshold} %`

  return (
    <Card className="col-span-full gap-3 px-[26px] py-6">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <CardTitle>Présence par classe</CardTitle>
          <CardHeadline className={below.length ? 'mt-1.5 text-bad-deep' : 'mt-1.5'}>{headline}</CardHeadline>
        </div>
        <WhyButton question={worst ? `Pourquoi la ${worst.className} décroche ?` : 'Quelles classes vont bien ?'} />
      </div>
      <LineChart
        labels={theme.weekLabels}
        domain={[88, 97]}
        ticks={[]}
        height={250}
        danger={{ below: theme.threshold, label: `sous le seuil d'alerte (${theme.threshold} %, réglable)` }}
        series={series}
        ariaLabel={`Classes sous ${theme.threshold} % sur 5 semaines`}
        overlay={({ x, y }) =>
          worst ? (
            // Sits in the empty bottom of the red zone, under the curves.
            <motion.text
              x={x(2) + 12}
              y={y(88.7)}
              className="font-hand"
              fontSize={24}
              fontWeight={700}
              fill="var(--color-clay)"
              transform={`rotate(-3 ${x(2) + 12} ${y(88.7)})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              {formatDelta(worst.rate - (worst.series[0] ?? worst.rate))} en 5 semaines
            </motion.text>
          ) : null
        }
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-line pt-3 text-[13px] text-ink-soft">
        <span>{t('common.source', { source: theme.source })}</span>
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={buttonClass('soft', 'sm')}>
          {open ? t('explore.collapse') : t('explore.seeAll', { count: theme.classes.length })}
          <ChevronDownIcon size={16} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
        </button>
      </div>
      <ClassGrid open={open} theme={theme} />
    </Card>
  )
}

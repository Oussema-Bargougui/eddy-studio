import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import type { Briefing } from '@/api/types'
import { LineChart } from '@/charts/LineChart'
import { Card, CardHeadline, CardTitle } from '@/ui/Card'
import { InkPath } from '@/ui/InkPath'
import { WhyButton } from '../eddy/WhyButton'

/** School attendance week by week, against last year, with Eddy's margin note. */
export function AttendanceCard({ attendance, year }: { attendance: Briefing['attendance']; year: string }) {
  const { t } = useTranslation()
  const { weeks, band } = attendance
  const lastYearLabel = year.replace(/(\d{4})-(\d{4})/, (_, a: string, b: string) => `${+a - 1}-${+b - 1}`)

  return (
    <Card className="min-w-0 flex-[999_1_640px] gap-3.5 px-7 pt-[26px] pb-5">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <CardTitle>{attendance.title}</CardTitle>
          <CardHeadline className="mt-1.5 text-[28px]">{attendance.headline}</CardHeadline>
        </div>
        <WhyButton question="Pourquoi la présence a-t-elle baissé cette semaine ?" />
      </div>
      <LineChart
        labels={weeks.map((w) => w.label)}
        domain={[93, 97]}
        ticks={[93, 94, 95, 96, 97]}
        band={{ from: band[0], to: band[1], label: `zone normale ${band[0]}–${band[1]} %` }}
        markLast
        ariaLabel={`Présence par semaine, de ${weeks[0]?.rate} à ${weeks.at(-1)?.rate} %`}
        series={[
          { id: 'now', name: year, values: weeks.map((w) => w.rate), color: 'var(--color-brand)', area: true },
          { id: 'last', name: lastYearLabel, values: weeks.map((w) => w.lastYear), color: 'var(--color-ink-faint)', dashed: true },
        ]}
        overlay={({ x, y }) => {
          const lx = x(weeks.length - 1)
          const ly = y(weeks.at(-1)?.rate ?? 94)
          return (
            <g>
              <InkPath d={`M${lx - 60} ${ly + 48} C ${lx - 34} ${ly + 46}, ${lx - 16} ${ly + 36}, ${lx - 8} ${ly + 16} M${lx - 8} ${ly + 16} l -9 6 M${lx - 8} ${ly + 16} l 2 11`} />
              <motion.text
                x={lx - 300}
                y={ly + 56}
                className="font-hand"
                fontSize={24}
                fontWeight={700}
                fill="var(--color-clay)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                {attendance.note}
              </motion.text>
            </g>
          )
        }}
      />
      <div className="flex flex-wrap justify-between gap-2.5 border-t border-dashed border-line pt-3 text-[13px] text-ink-soft">
        <span className="inline-flex gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-[3px] w-4 rounded-sm bg-brand" />
            {year}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-4 border-t-2 border-dashed border-ink-faint" />
            {lastYearLabel}
          </span>
        </span>
        <span>{t('common.source', { source: attendance.source })}</span>
      </div>
    </Card>
  )
}

import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import type { Briefing } from '@/api/types'
import { LineChart } from '@/charts/LineChart'
import { Sparkline } from '@/charts/Sparkline'
import { formatPercent } from '@/lib/format'
import { Card, CardHeadline, CardTitle } from '@/ui/Card'

export function DropsCard({ briefing }: { briefing: Briefing }) {
  const { t } = useTranslation()
  return (
    <Card className="gap-3.5 px-6 py-[22px]">
      <CardTitle>{t('briefing.dropsTitle')}</CardTitle>
      {briefing.drops.map((c) => (
        <div key={c.classId} className="grid grid-cols-[80px_minmax(0,1fr)_70px] items-center gap-3">
          <span className="font-semibold">{c.className}</span>
          <Sparkline values={c.series} />
          <span className="text-right font-bold text-bad tabular">{formatPercent(c.rate)}</span>
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-dashed border-line pt-3 text-[13px]">
        <span className="font-semibold text-ok">{t('briefing.stableClasses', { count: briefing.stableCount })}</span>
        <Link to="/explorer/$theme" params={{ theme: 'presence' }} className="font-semibold text-brand no-underline">
          {t('briefing.seeAllClasses', { count: briefing.classCount })}
        </Link>
      </div>
    </Card>
  )
}

export function CollectionCard({ collection }: { collection: Briefing['collection'] }) {
  const { t } = useTranslation()
  const { points } = collection
  return (
    <Card className="gap-2.5 px-6 py-[22px]">
      <CardTitle>
        {t('briefing.collectionTitle')} ({collection.currency})
      </CardTitle>
      <CardHeadline className="text-2xl">{collection.headline}</CardHeadline>
      <LineChart
        height={140}
        labels={points.map((p) => p.label)}
        domain={[30, 100]}
        ticks={[]}
        ariaLabel={`Encaissement cumulé : ${points.map((p) => `${p.label} ${p.thisYear} %`).join(', ')}`}
        series={[
          { id: 'now', name: 'Cette année', values: points.map((p) => p.thisYear), color: 'var(--color-brand)' },
          { id: 'last', name: "L'an dernier", values: points.map((p) => p.lastYear), color: 'var(--color-ink-faint)', dashed: true },
        ]}
        markLast
      />
      <span className="text-xs text-ink-soft">{collection.note}</span>
    </Card>
  )
}

export function TodayCard({ items }: { items: Briefing['today'] }) {
  const { t } = useTranslation()
  return (
    <Card tone="night" className="gap-3.5 px-6 py-[22px]">
      <CardTitle className="text-on-night-soft">{t('briefing.todayTitle')}</CardTitle>
      {items.map((e) => (
        <div key={e.time + e.text} className="flex items-baseline gap-3.5">
          <span className="w-16 shrink-0 font-display text-[22px] tabular">{e.time}</span>
          <span className="text-sm leading-[1.45] text-[#e6e2d8]">{e.text}</span>
        </div>
      ))}
    </Card>
  )
}

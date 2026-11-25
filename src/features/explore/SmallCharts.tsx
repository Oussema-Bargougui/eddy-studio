import type { AttendanceTheme } from '@/api/types'
import { BarChart } from '@/charts/BarChart'
import { StackedBars } from '@/charts/StackedBars'
import { formatPercent } from '@/lib/format'
import { Card, CardHeadline, CardTitle } from '@/ui/Card'

/** Absence rate per weekday; the worst day is highlighted and named. */
export function WeekdayCard({ theme }: { theme: AttendanceTheme }) {
  const worst = [...theme.weekdays].sort((a, b) => b.rate - a.rate)[0]
  const others = theme.weekdays.filter((d) => d !== worst)
  const mean = others.reduce((s, d) => s + d.rate, 0) / Math.max(1, others.length)
  const ratio = worst ? worst.rate / mean : 1
  return (
    <Card className="gap-2.5 px-6 py-[22px]">
      <CardTitle>Absences par jour de la semaine</CardTitle>
      <CardHeadline className="text-[22px]">
        {worst && ratio >= 1.6 ? `Le ${dayName(worst.day)} pèse ${ratio >= 1.9 ? 'deux fois' : 'nettement'} plus` : 'Les jours se ressemblent'}
      </CardHeadline>
      <BarChart
        ariaLabel={`Taux d'absence par jour : ${theme.weekdays.map((d) => `${d.day} ${d.rate} %`).join(', ')}`}
        bars={theme.weekdays.map((d) => ({ label: d.day, value: d.rate, highlight: d === worst }))}
        formatHighlight={(v) => formatPercent(v)}
      />
    </Card>
  )
}

/** Justified versus unjustified absences, month by month. */
export function JustifiedCard({ theme }: { theme: AttendanceTheme }) {
  const last = theme.justified.at(-1)
  const share = last ? Math.round((last.unjustified / (last.justified + last.unjustified)) * 100) : 0
  return (
    <Card className="gap-2.5 px-6 py-[22px]">
      <CardTitle>Justifiées ou non, par mois</CardTitle>
      <CardHeadline className="text-[22px]">
        Les non justifiées montent : {share} % en {last?.month.replace('.', '') ?? ''}
      </CardHeadline>
      <StackedBars
        ariaLabel={`Absences justifiées et non justifiées : ${theme.justified.map((m) => `${m.month} ${m.justified} et ${m.unjustified}`).join(', ')}`}
        stacks={theme.justified.map((m) => ({ label: m.month, base: m.justified, top: m.unjustified }))}
      />
      <div className="flex gap-4 text-xs text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-clay" />
          Non justifiées
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-line-strong" />
          Justifiées
        </span>
      </div>
    </Card>
  )
}

const days: Record<string, string> = { Lun: 'lundi', Mar: 'mardi', Mer: 'mercredi', Jeu: 'jeudi', Ven: 'vendredi', Sam: 'samedi' }
const dayName = (short: string) => days[short] ?? short

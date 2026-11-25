import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScenarioCatalogue } from '@/api/queries'
import type { ScenarioGroup, ScenarioSummary } from '@/api/types'
import { HandNote } from '@/ui/HandNote'
import { QueryBoundary } from '@/ui/QueryBoundary'
import { ScenarioCard } from './ScenarioCard'
import { SimpleOperations } from './SimpleOperations'

const groups: { id: ScenarioGroup; title: string; sub: string }[] = [
  { id: 'daily', title: 'Au quotidien', sub: 'les imprévus de la journée' },
  { id: 'regular', title: 'Régulièrement', sub: 'chaque semaine ou chaque mois' },
  { id: 'period', title: 'Par période', sub: "les grands moments de l'année" },
]

const matches = (s: ScenarioSummary, q: string) =>
  !q || `${s.title} ${s.desc}`.toLowerCase().includes(q.toLowerCase())

/** "Que voulez-vous régler aujourd'hui ?": scenarios by rhythm, simple operations folded below. */
export function CataloguePage() {
  const { t } = useTranslation()
  const query = useScenarioCatalogue()
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-[760px]">
          <h1 className="m-0 font-display text-[clamp(36px,4.4vw,58px)] leading-[1.04] font-normal tracking-[-0.02em]">
            {t('scenarios.title')}
          </h1>
          <p className="mt-3 mb-0 text-base leading-normal text-ink-soft">{t('scenarios.lead')}</p>
          <HandNote className="mt-2.5" rotate={-2} delay={0.8}>
            le plus urgent ce matin : le premier, en sombre ↓
          </HandNote>
        </div>
        <label className="flex flex-[0_1_420px] flex-col gap-1.5 text-[13px] text-ink-soft">
          {t('scenarios.describe')}
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('scenarios.describePlaceholder')}
            className="rounded-2xl border border-line-strong bg-paper px-4 py-3.5 text-[15px] text-ink outline-none focus:border-brand"
          />
        </label>
      </div>

      <QueryBoundary query={query} skeletonHeight={620}>
        {({ scenarios, simpleOperations }) => (
          <>
            {groups.map((g) => {
              const items = scenarios.filter((s) => s.group === g.id && matches(s, search))
              if (!items.length) return null
              return (
                <section key={g.id} aria-labelledby={`group-${g.id}`} className="flex flex-col gap-3.5">
                  <div className="flex items-baseline gap-3.5 border-b border-line-strong pb-2.5">
                    <h2 id={`group-${g.id}`} className="m-0 font-display text-[28px] font-normal">
                      {g.title}
                    </h2>
                    <span className="text-sm text-ink-soft">{g.sub}</span>
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                    {items.map((s, i) => (
                      <ScenarioCard key={s.id} scenario={s} index={i} />
                    ))}
                  </div>
                </section>
              )
            })}
            <SimpleOperations operations={simpleOperations} />
          </>
        )}
      </QueryBoundary>
    </div>
  )
}

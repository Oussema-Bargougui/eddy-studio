import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useScenarioCatalogue } from '@/api/queries'
import { buttonClass } from '@/ui/button'
import { QueryBoundary } from '@/ui/QueryBoundary'
import { AbsentTeacherScenario } from './absent-teacher/AbsentTeacherScenario'

/** A scenario in focus mode: full screen, no navigation, one step at a time. */
export function ScenarioPage({ scenarioId }: { scenarioId: string }) {
  const { t } = useTranslation()
  const query = useScenarioCatalogue()

  return (
    <div className="flex min-h-dvh flex-col bg-cream text-ink">
      <QueryBoundary query={query} skeletonHeight={600} className="m-10">
        {({ scenarios }) => {
          const scenario = scenarios.find((s) => s.id === scenarioId)
          if (scenario?.id === 'absent-teacher') return <AbsentTeacherScenario scenario={scenario} />
          return (
            <div className="mx-auto flex max-w-[720px] flex-col items-start gap-5 px-6 py-20">
              <h1 className="m-0 font-display text-[44px] font-normal">{scenario?.title ?? 'Scénario introuvable'}</h1>
              <p className="m-0 text-base text-ink-soft">{scenario ? t('scenarios.soon') : "Ce scénario n'existe pas."}</p>
              <Link to="/scenarios" className={buttonClass('ink', 'lg')}>
                {t('scenarios.catalogue')}
              </Link>
            </div>
          )
        }}
      </QueryBoundary>
    </div>
  )
}

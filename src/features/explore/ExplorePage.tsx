import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useAttendanceTheme } from '@/api/queries'
import { cn } from '@/lib/cn'
import { QueryBoundary } from '@/ui/QueryBoundary'
import { ClassDrawer } from './ClassDrawer'
import { ClassTrendCard } from './ClassTrendCard'
import { JustifiedCard, WeekdayCard } from './SmallCharts'
import { themes, type ThemeId } from './themes'

const select = 'rounded-xl border border-line-strong bg-paper px-3 py-2.5 text-sm text-ink'

export function ExplorePage({ theme, classId }: { theme: ThemeId; classId?: string }) {
  const { t } = useTranslation()
  const query = useAttendanceTheme()
  const current = themes.find((th) => th.id === theme)!

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <nav aria-label="Thèmes" className="mb-3.5 flex flex-wrap gap-2">
            {themes.map((th) => (
              <Link
                key={th.id}
                to="/explorer/$theme"
                params={{ theme: th.id }}
                className={cn(
                  'rounded-full px-3.5 py-[7px] text-[13px] no-underline',
                  th.id === theme ? 'bg-brand-tint font-semibold text-brand-deep' : 'border border-line-strong text-ink hover:bg-paper',
                )}
              >
                {th.label}
              </Link>
            ))}
          </nav>
          <h1 className="m-0 font-display text-[clamp(34px,4vw,54px)] leading-[1.05] font-normal tracking-[-0.02em]">
            {current.label}
            {current.ready && <span className="text-ink-soft"> · 5 dernières semaines</span>}
          </h1>
        </div>
        {current.ready && (
          <div className="flex flex-wrap gap-2">
            <label className="flex flex-col gap-1 text-xs text-ink-soft">
              {t('explore.period')}
              <select className={select} defaultValue="5w">
                <option value="5w">5 semaines</option>
                <option value="term">Ce trimestre</option>
                <option value="year">L'année</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs text-ink-soft">
              {t('explore.level')}
              <select className={select} defaultValue="all">
                <option value="all">{t('explore.allLevels')}</option>
                <option value="college">Collège</option>
              </select>
            </label>
          </div>
        )}
      </div>

      {!current.ready ? (
        <p className="m-0 rounded-[var(--radius-card)] bg-paper p-10 font-display text-2xl text-ink-soft">{t('explore.themeSoon')}</p>
      ) : (
        <QueryBoundary query={query} skeletonHeight={560}>
          {(data) => (
            <div className="flex flex-wrap items-start gap-6">
              {/* 560px keeps the class file beside the charts even inside EduCap's content area. */}
              <div className="grid min-w-0 flex-[999_1_560px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
                <ClassTrendCard theme={data} />
                <WeekdayCard theme={data} />
                <JustifiedCard theme={data} />
              </div>
              {classId && <ClassDrawer key={classId} classId={classId} />}
            </div>
          )}
        </QueryBoundary>
      )}
    </div>
  )
}

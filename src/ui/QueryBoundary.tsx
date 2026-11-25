import type { UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { buttonClass } from './button'

interface Props<T> {
  query: UseQueryResult<T>
  children: (data: T) => ReactNode
  /** Height of the placeholder while EduCap answers. */
  skeletonHeight?: number
  className?: string
}

/** Loading, error and success for one query — never a made-up figure while waiting. */
export function QueryBoundary<T>({ query, children, skeletonHeight = 240, className }: Props<T>) {
  const { t } = useTranslation()
  if (query.isPending) {
    return (
      <div
        aria-busy="true"
        aria-label={t('common.loading')}
        className={cn('animate-pulse rounded-[var(--radius-card)] bg-sand', className)}
        style={{ height: skeletonHeight }}
      />
    )
  }
  if (query.isError) {
    return (
      <div role="alert" className={cn('flex flex-col items-start gap-3 rounded-[var(--radius-card)] bg-bad-soft p-6', className)}>
        <p className="m-0 text-sm font-semibold text-bad-deep">{t('common.error')}</p>
        <button type="button" className={buttonClass('outline', 'sm')} onClick={() => void query.refetch()}>
          {t('common.retry')}
        </button>
      </div>
    )
  }
  return <>{children(query.data)}</>
}

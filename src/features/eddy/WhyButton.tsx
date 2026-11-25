import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { SparkIcon } from '@/ui/icons'
import { ui } from '../shell/uiStore'

interface Props {
  /** The question Eddy will answer, phrased for the chart it sits on. */
  question: string
  className?: string
}

/** "Pourquoi ?": opens Eddy with the question already asked. AI runs only here. */
export function WhyButton({ question, className }: Props) {
  const { t } = useTranslation()
  return (
    <button
      type="button"
      onClick={() => ui.openEddy(question)}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-px',
        className,
      )}
    >
      <SparkIcon size={15} className="text-gold" />
      {t('common.why')}
    </button>
  )
}

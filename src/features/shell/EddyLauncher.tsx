import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { SparkIcon } from '@/ui/icons'
import { useEmbed } from '../embed/session'
import { ui, useUi } from './uiStore'

/**
 * The floating "Demander à Eddy" button, bottom right. Hidden while Eddy is open.
 * Inside EduCap it sits clear of EduCap's chat bubble on the right edge.
 */
export function EddyLauncher() {
  const { t } = useTranslation()
  const open = useUi((s) => s.eddyOpen)
  const embedded = useEmbed((s) => s.embedded)
  if (open) return null
  return (
    <button
      type="button"
      onClick={() => ui.openEddy()}
      className={cn(
        'fixed bottom-7 z-30 flex items-center gap-2.5 rounded-full bg-brand py-3 pr-5 pl-3 text-[15px] font-semibold text-white shadow-[0_18px_40px_-14px_rgb(91_19_180/0.6)] transition-transform hover:-translate-y-0.5',
        embedded ? 'right-[88px]' : 'right-7',
      )}
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-gold">
        <SparkIcon size={18} />
      </span>
      {t('shell.askEddy')}
    </button>
  )
}

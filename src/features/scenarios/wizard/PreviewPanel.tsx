import { useTranslation } from 'react-i18next'
import { HandNote } from '@/ui/HandNote'

export interface PreviewLine {
  label: string
  state: 'ready' | 'pending'
}

/** The dark panel that always shows what will be written to EduCap, before "Valider". */
export function PreviewPanel({ lines, note }: { lines: PreviewLine[]; note?: string }) {
  const { t } = useTranslation()
  return (
    <aside
      aria-label={t('scenarios.preview')}
      className="flex max-w-[420px] flex-[1_1_320px] flex-col gap-4 bg-night px-[clamp(16px,2vw,32px)] py-8 text-on-night"
    >
      <span className="text-xs tracking-[0.12em] text-on-night-soft uppercase">{t('scenarios.preview')}</span>
      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {lines.map((l) => (
          <li key={l.label} className="flex items-start gap-3 text-sm leading-normal">
            <span
              className={
                l.state === 'ready'
                  ? 'mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border-[1.5px] border-[#7FD1A0] text-xs text-[#7FD1A0]'
                  : 'mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border-[1.5px] border-on-night-soft text-xs text-on-night-soft'
              }
            >
              {l.state === 'ready' ? '✓' : '…'}
            </span>
            <span className={l.state === 'ready' ? '' : 'text-on-night-soft'}>{l.label}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2 rounded-2xl bg-night-soft p-3.5 text-[13px] leading-relaxed text-[#E6E2D8]">
        <b className="text-gold">Annulable.</b> {t('scenarios.undoable')}
      </div>
      {note && (
        <HandNote tone="gold" size="sm" rotate={-2} delay={0.4} className="mt-auto">
          {note}
        </HandNote>
      )}
    </aside>
  )
}

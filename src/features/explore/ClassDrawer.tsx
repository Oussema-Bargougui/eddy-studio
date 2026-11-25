import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useClassFile } from '@/api/queries'
import { formatDelta, formatNumber } from '@/lib/format'
import { buttonClass } from '@/ui/button'
import { HandNote } from '@/ui/HandNote'
import { CloseIcon } from '@/ui/icons'
import { ui } from '../shell/uiStore'

/** A class file that opens in place, beside the charts, as a dark panel. */
export function ClassDrawer({ classId }: { classId: string }) {
  const { t } = useTranslation()
  const file = useClassFile(classId).data

  return (
    <motion.aside
      aria-label={file ? `Fiche de la ${file.className}` : 'Fiche de classe'}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex min-w-0 flex-[1_1_360px] flex-col gap-[18px] self-start rounded-[var(--radius-panel)] bg-night p-[26px] text-on-night shadow-[0_30px_60px_-30px_rgb(27_35_64/0.7)]"
    >
      {!file ? (
        <div aria-busy="true" className="h-[420px] animate-pulse rounded-2xl bg-night-soft" />
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs tracking-[0.1em] text-on-night-soft uppercase">{file.levelLabel}</span>
              <h2 className="m-0 mt-1 font-display text-[40px] font-normal">{file.className}</h2>
            </div>
            <Link to="." search={{}} aria-label={t('common.close')} className="grid h-10 w-10 place-items-center rounded-full border border-night-line text-on-night">
              <CloseIcon size={16} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <span className="font-display text-5xl">
                {formatNumber(file.rate, 1)}
                <span className="text-2xl"> %</span>
              </span>
              <br />
              <span className="text-[13px] font-semibold text-[#F4A28C]">
                {file.delta < 0 ? '▼' : '▲'} {formatDelta(Math.abs(file.delta)).replace('+', '')} en 5 semaines
              </span>
            </div>
            <div className="text-[13px] leading-[1.7] text-[#e6e2d8]">
              {file.pupils} élèves · {file.headTeacher}, prof principal
              <br />
              {file.hoursAbsent} h d'absence ce trimestre
              <br />
              dont {file.hoursUnjustified} h non justifiées
            </div>
          </div>
          {file.mostAbsent.length > 0 && (
            <div className="flex flex-col gap-2.5 border-t border-night-line pt-3.5">
              <span className="text-xs tracking-[0.1em] text-on-night-soft uppercase">Les plus absents</span>
              {file.mostAbsent.map((p) => (
                <div key={p.name} className="flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className={p.unjustified ? 'text-[#F4A28C]' : 'text-[#e6e2d8]'}>
                    {p.hours} h · {p.unjustified ? `${p.unjustified} non justif.` : 'justifiées'}
                  </span>
                </div>
              ))}
            </div>
          )}
          {file.note && (
            <HandNote tone="gold" size="sm" rotate={-2} delay={0.6}>
              {file.note}
            </HandNote>
          )}
          <span className="text-xs text-[#A9AECB]">{t('common.source', { source: file.source })}</span>
          <div className="flex flex-col gap-2">
            <button type="button" onClick={() => ui.openEddy(`Pourquoi la ${file.className} décroche ?`)} className={buttonClass('cream', 'md')}>
              Pourquoi cette baisse ?
            </button>
            <Link to="/scenarios" className={buttonClass('night-outline', 'md')}>
              Scénario : suivre les absences →
            </Link>
          </div>
        </>
      )}
    </motion.aside>
  )
}

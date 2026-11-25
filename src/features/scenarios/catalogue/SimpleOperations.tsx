import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from '@/ui/icons'

/** One-step actions, folded by default so the situations stay in front. */
export function SimpleOperations({ operations }: { operations: string[] }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const total = 24

  return (
    <section className="flex flex-col gap-3.5 rounded-[22px] bg-paper px-[22px] py-[18px] shadow-[0_1px_0_var(--color-line)]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between text-left text-ink"
      >
        <span>
          <span className="text-base font-bold">{t('scenarios.simpleTitle')}</span>
          <br />
          <span className="text-[13px] text-ink-soft">{t('scenarios.simpleLead', { count: total })}</span>
        </span>
        <ChevronDownIcon size={22} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-2 overflow-hidden"
          >
            {operations.map((o) => (
              <button key={o} type="button" className="rounded-full border border-line-strong px-3.5 py-2 text-[13px] text-ink hover:border-brand hover:text-brand">
                {o}
              </button>
            ))}
            <span className="px-2 py-2 text-[13px] text-ink-soft">+ {total - operations.length} autres</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

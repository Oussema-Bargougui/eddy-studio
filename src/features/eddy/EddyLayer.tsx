import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CloseIcon, HistoryIcon, SparkIcon } from '@/ui/icons'
import { ui, useUi } from '../shell/uiStore'
import { EddyComposer } from './EddyComposer'
import { EddyTurn } from './EddyTurn'
import { useConversation } from './useConversation'

/** Eddy slides in over the page, which steps back and blurs; then it leaves. */
export function EddyLayer() {
  const { t } = useTranslation()
  const open = useUi((s) => s.eddyOpen)
  const pending = useUi((s) => s.eddyQuestion)
  const { turns, ask, busy } = useConversation()
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && pending) {
      ui.consumeQuestion()
      void ask(pending)
    }
  }, [open, pending, ask])

  // Follow the conversation: a new question, or an answer arriving.
  const progress = turns.map((turn) => turn.status).join()
  useEffect(() => {
    if (!progress) return
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [progress])

  return (
    <Dialog.Root open={open} onOpenChange={(o) => (o ? ui.openEddy() : ui.closeEddy())}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-40 bg-cream/55 backdrop-blur-[3px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.section
                className="fixed top-6 right-6 bottom-6 z-50 flex w-[min(620px,calc(100vw-48px))] flex-col overflow-hidden rounded-[30px] bg-paper shadow-[var(--shadow-float),0_0_0_1px_var(--color-line)]"
                initial={{ x: 48, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 48, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              >
                <header className="flex items-center justify-between border-b border-sand px-[22px] py-[18px]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-[38px] w-[38px] place-items-center rounded-xl bg-brand text-gold">
                      <SparkIcon size={18} />
                    </span>
                    <div>
                      <Dialog.Title className="m-0 text-base font-bold">{t('eddy.title')}</Dialog.Title>
                      <div className="text-xs text-ink-soft">{t('eddy.subtitle')}</div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button type="button" aria-label={t('eddy.history')} className="grid h-10 w-10 place-items-center rounded-xl border border-line">
                      <HistoryIcon size={16} />
                    </button>
                    <Dialog.Close aria-label={t('common.close')} className="grid h-10 w-10 place-items-center rounded-xl border border-line">
                      <CloseIcon size={16} />
                    </Dialog.Close>
                  </div>
                </header>
                <div ref={bodyRef} className="flex flex-1 flex-col gap-8 overflow-y-auto p-[22px]">
                  {turns.map((turn) => (
                    <EddyTurn key={turn.id} turn={turn} onAsk={(q) => void ask(q)} />
                  ))}
                </div>
                <EddyComposer onAsk={(q) => void ask(q)} disabled={busy} />
              </motion.section>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRightIcon } from '@/ui/icons'

/** The question field at the bottom of Eddy's panel. */
export function EddyComposer({ onAsk, disabled }: { onAsk: (q: string) => void; disabled: boolean }) {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim() || disabled) return
    onAsk(text)
    setText('')
  }

  return (
    <form onSubmit={submit} className="m-0 flex gap-2.5 border-t border-sand px-[18px] pt-3.5 pb-[18px]">
      <label htmlFor="eddy-question" className="sr-only">
        {t('eddy.placeholder')}
      </label>
      <input
        id="eddy-question"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('eddy.placeholder')}
        autoComplete="off"
        className="flex-1 rounded-[14px] border border-line-strong bg-cream px-4 py-3 text-[15px] text-ink outline-none focus:border-brand"
      />
      <button
        type="submit"
        aria-label={t('eddy.send')}
        disabled={disabled || !text.trim()}
        className="grid w-12 place-items-center rounded-[14px] bg-ink text-cream disabled:opacity-40"
      >
        <ArrowRightIcon size={18} />
      </button>
    </form>
  )
}

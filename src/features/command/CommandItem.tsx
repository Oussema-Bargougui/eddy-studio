import { Command } from 'cmdk'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const tones = {
  brand: 'bg-brand-tint text-brand',
  night: 'bg-ink text-gold',
  sand: 'bg-sand text-ink',
}

interface Props {
  value: string
  icon: ReactNode
  tone: keyof typeof tones
  label: string
  hint: string
  onSelect: () => void
  forceMount?: boolean
}

/** A row of the command bar; the highlighted row gets the brand tint. */
export function CommandItem({ value, icon, tone, label, hint, onSelect, forceMount }: Props) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      forceMount={forceMount}
      className="flex cursor-pointer items-center gap-3.5 rounded-[14px] px-3.5 py-3 text-ink data-[selected=true]:bg-brand-soft"
    >
      <span className={cn('grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[10px] text-sm font-bold', tones[tone])}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold">{label}</span>
        <span className="block text-[13px] text-ink-soft">{hint}</span>
      </span>
    </Command.Item>
  )
}

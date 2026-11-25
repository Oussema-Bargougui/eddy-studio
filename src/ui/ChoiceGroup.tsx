import type { UseFormRegisterReturn } from 'react-hook-form'
import { cn } from '@/lib/cn'

interface Props {
  legend: string
  options: { value: string; label: string }[]
  value: string
  register: UseFormRegisterReturn
  /** "pill" for short choices in a row, "block" for two equal halves. */
  shape?: 'pill' | 'block'
}

/** Radio buttons that look like choices: no free typing, keyboard friendly. */
export function ChoiceGroup({ legend, options, value, register, shape = 'block' }: Props) {
  return (
    <fieldset className="m-0 border-none p-0">
      <legend className="mb-2.5 text-sm font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = o.value === value
          return (
            <label
              key={o.value}
              className={cn(
                'flex cursor-pointer items-center gap-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand',
                shape === 'pill' ? 'rounded-full px-4 py-2.5' : 'flex-1 justify-center rounded-[14px] p-[11px]',
                checked
                  ? shape === 'pill'
                    ? 'bg-ink font-semibold text-cream'
                    : 'border-2 border-brand bg-brand-soft font-semibold'
                  : 'border border-line-strong hover:border-ink',
              )}
            >
              <input type="radio" value={o.value} className="accent-brand" {...register} />
              {o.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

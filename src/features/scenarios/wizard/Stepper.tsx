import { cn } from '@/lib/cn'
import { CheckIcon } from '@/ui/icons'

export interface StepInfo {
  title: string
  detail: string
}

/** The steps on the left: done (green tick), current (purple), next (grey). */
export function Stepper({ steps, current }: { steps: StepInfo[]; current: number }) {
  return (
    <nav aria-label="Étapes" className="flex max-w-[320px] flex-[1_1_280px] flex-col gap-1.5 border-r border-line px-[clamp(16px,2vw,32px)] py-8">
      <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
        {steps.map((s, i) => {
          const n = i + 1
          const state = n < current ? 'done' : n === current ? 'now' : 'next'
          return (
            <li
              key={s.title}
              aria-current={state === 'now' ? 'step' : undefined}
              className={cn('flex gap-3.5 rounded-2xl p-3', state === 'now' && 'bg-paper')}
            >
              <span
                className={cn(
                  'grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full text-[13px] font-bold',
                  state === 'done' && 'bg-ok text-white',
                  state === 'now' && 'bg-brand text-white',
                  state === 'next' && 'bg-line text-ink-soft',
                )}
              >
                {state === 'done' ? <CheckIcon size={14} /> : n}
              </span>
              <div>
                <div className={cn('text-[15px] font-semibold', state === 'next' ? 'text-ink-soft' : 'text-ink')}>{s.title}</div>
                <div className="text-[13px] text-ink-soft">{s.detail}</div>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

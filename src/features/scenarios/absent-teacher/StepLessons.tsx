import { useFormContext, useWatch } from 'react-hook-form'
import type { Lesson } from '@/api/types'
import { cn } from '@/lib/cn'
import type { AbsenceForm } from './schema'

/** Step 2 — the lessons affected; all ticked by default, untick the ones that still happen. */
export function StepLessons({ lessons }: { lessons: Lesson[] }) {
  const { register, control, formState } = useFormContext<AbsenceForm>()
  const v = useWatch({ control }) as AbsenceForm
  const chosen = v.lessonIds

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="m-0 font-display text-[clamp(30px,3.2vw,44px)] font-normal tracking-[-0.02em]">Quels cours sont touchés ?</h1>
        <p className="mt-2 mb-0 max-w-[640px] text-[15px] text-ink-soft">
          D'après l'emploi du temps. Décochez un cours s'il est maintenu (sortie, devoir déjà prévu…).
        </p>
      </div>
      <fieldset className="m-0 flex flex-col gap-3 border-none p-0">
        <legend className="sr-only">Cours</legend>
        {lessons.map((l) => {
          const on = chosen.includes(l.id)
          return (
            <label
              key={l.id}
              className={cn(
                'flex cursor-pointer flex-wrap items-center gap-4 rounded-[20px] bg-paper px-[18px] py-4 shadow-[0_1px_0_var(--color-line)]',
                on ? 'outline-2 outline-brand' : 'opacity-70',
              )}
            >
              <input type="checkbox" value={l.id} {...register('lessonIds')} className="h-5 w-5 accent-brand" />
              <div className="w-24">
                <div className="font-display text-[22px]">{l.time}</div>
                <div className="text-xs text-ink-soft">jeudi 26</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">
                  {l.className} · {l.subject}
                </div>
                <div className="text-[13px] text-ink-soft">{l.room}</div>
              </div>
            </label>
          )
        })}
      </fieldset>
      {formState.errors.lessonIds && <p className="m-0 text-[13px] font-semibold text-bad">{formState.errors.lessonIds.message}</p>}
    </div>
  )
}

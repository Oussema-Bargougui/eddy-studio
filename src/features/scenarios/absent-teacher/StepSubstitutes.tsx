import { useFormContext, useWatch } from 'react-hook-form'
import type { Lesson, SubstituteChoice } from '@/api/types'
import { HandNote } from '@/ui/HandNote'
import type { AbsenceForm } from './schema'

interface Props {
  lessons: Lesson[]
  choices: SubstituteChoice[]
}

/** Step 3 — one substitute per lesson, among teachers free at that hour. */
export function StepSubstitutes({ lessons, choices }: Props) {
  const { register, control } = useFormContext<AbsenceForm>()
  const v = useWatch({ control }) as AbsenceForm
  const picked = v.substitutes
  const found = choices.filter((c) => c.suggestedId).length
  const missing = choices.length - found

  return (
    <div className="relative flex flex-col gap-[22px]">
      <div>
        <h1 className="m-0 font-display text-[clamp(30px,3.2vw,44px)] font-normal tracking-[-0.02em]">Qui remplace M. Bernard jeudi ?</h1>
        <p className="mt-2 mb-0 max-w-[640px] text-[15px] text-ink-soft">
          Eddy a cherché, pour chaque cours, les enseignants libres à cette heure d'après l'emploi du temps. Vous choisissez.
        </p>
      </div>
      <HandNote rotate={-2} delay={0.4} className="-mt-3 self-end">
        {found} trouvé{found > 1 ? 's' : ''}
        {missing ? `, ${missing} à décider` : ''}
      </HandNote>
      {lessons.map((l) => {
        const choice = choices.find((c) => c.lessonId === l.id)
        const none = !choice?.options.length
        const value = picked[l.id]
        return (
          <div key={l.id} className="flex flex-wrap items-center gap-4 rounded-[20px] bg-paper px-[18px] py-4 shadow-[0_1px_0_var(--color-line)]">
            <div className="w-24">
              <div className="font-display text-[22px]">{l.time}</div>
              <div className="text-xs text-ink-soft">jeudi 26</div>
            </div>
            <div className="min-w-[160px] flex-1">
              <div className="font-semibold">
                {l.className} · {l.subject}
              </div>
              <div className="text-[13px] text-ink-soft">{l.room}</div>
            </div>
            <label className="flex flex-[1_1_260px] flex-col gap-1 text-xs text-ink-soft">
              Remplaçant
              <select
                {...register(`substitutes.${l.id}` as const)}
                className={`rounded-xl border bg-cream px-3 py-2.5 text-sm text-ink ${none && value !== 'study' ? 'border-clay' : 'border-line-strong'}`}
              >
                {choice?.options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
                {none && <option value="none">Aucun prof de maths libre</option>}
                <option value="study">Étude surveillée</option>
                {!none && <option value="none">Laisser sans remplaçant</option>}
              </select>
            </label>
          </div>
        )
      })}
    </div>
  )
}

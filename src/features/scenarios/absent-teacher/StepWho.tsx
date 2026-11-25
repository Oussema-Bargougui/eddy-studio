import { useFormContext, useWatch } from 'react-hook-form'
import { useTeachers } from '@/api/queries'
import { ChoiceGroup } from '@/ui/ChoiceGroup'
import { HandNote } from '@/ui/HandNote'
import type { AbsenceForm } from './schema'

const input = 'rounded-[14px] border border-line-strong bg-paper px-3.5 py-3 text-[15px] text-ink outline-none focus:border-brand'
const err = 'm-0 text-[13px] font-semibold text-bad'

/** Step 1 — who is absent, and when. Everything is chosen from lists. */
export function StepWho() {
  const { register, control, formState } = useFormContext<AbsenceForm>()
  const v = useWatch({ control }) as AbsenceForm
  const teachers = useTeachers().data ?? []
  const chosen = teachers.find((t) => t.id === v.teacherId)
  const errors = formState.errors

  return (
    <div className="relative flex flex-col gap-[26px]">
      <div>
        <h1 className="m-0 font-display text-[clamp(30px,3.2vw,44px)] font-normal tracking-[-0.02em]">Qui est absent, et quand ?</h1>
        <p className="mt-2 mb-0 text-[15px] text-ink-soft">Choisissez dans les listes, aucune saisie libre pour les données EduCap.</p>
      </div>
      <HandNote rotate={5} delay={0.5} size="md" className="absolute top-[92px] right-0 max-md:hidden">
        pré-rempli depuis le briefing
      </HandNote>

      <div className="flex flex-col gap-2">
        <label htmlFor="teacher" className="text-sm font-semibold">
          Enseignant
        </label>
        <div className="flex items-center gap-3 rounded-2xl border-2 border-brand bg-paper px-3.5 py-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-tint text-[13px] font-bold text-brand-deep">
            {chosen?.initials ?? '?'}
          </span>
          <select id="teacher" {...register('teacherId')} className="flex-1 bg-transparent py-1 text-[15px] font-medium text-ink outline-none">
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} · {t.subject} · {t.weeklyHours} h/semaine
              </option>
            ))}
          </select>
        </div>
        {errors.teacherId && <p className={err}>{errors.teacherId.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Du
          <input type="date" {...register('from')} className={input} />
          {errors.from && <span className={err}>{errors.from.message}</span>}
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Au
          <input type="date" {...register('to')} className={input} />
          {errors.to && <span className={err}>{errors.to.message}</span>}
        </label>
      </div>

      <ChoiceGroup
        legend="Moment"
        shape="pill"
        value={v.moment}
        register={register('moment')}
        options={[
          { value: 'day', label: 'Journée entière' },
          { value: 'morning', label: 'Matin' },
          { value: 'afternoon', label: 'Après-midi' },
        ]}
      />

      <div className="grid grid-cols-2 gap-4">
        <ChoiceGroup
          legend="Motif"
          value={v.reason}
          register={register('reason')}
          options={[
            { value: 'Maladie', label: 'Maladie' },
            { value: 'Congé', label: 'Congé' },
          ]}
        />
        <ChoiceGroup
          legend="Justifiée"
          value={v.justified}
          register={register('justified')}
          options={[
            { value: 'yes', label: 'Oui' },
            { value: 'no', label: 'Non' },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">
          Justificatif <span className="font-normal text-ink-soft">(facultatif)</span>
        </span>
        <label className="cursor-pointer rounded-2xl border-[1.5px] border-dashed border-[#C9BDA4] bg-parchment p-[18px] text-center text-ink-soft">
          Glissez le certificat ici, ou <span className="font-semibold text-brand underline">choisissez un fichier</span>
          <input type="file" accept=".pdf,image/*" className="sr-only" />
        </label>
      </div>
    </div>
  )
}

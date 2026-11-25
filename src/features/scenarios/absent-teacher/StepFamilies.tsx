import { useFormContext, useWatch } from 'react-hook-form'
import { cn } from '@/lib/cn'
import type { AbsenceForm } from './schema'

const channels = [
  { key: 'app', label: "Notification dans l'application", hint: 'gratuit, immédiat' },
  { key: 'sms', label: 'SMS', hint: 'compte dans le forfait SMS' },
  { key: 'email', label: 'E-mail', hint: 'aux adresses des parents' },
] as const

/** Step 4 — how families of the classes concerned are told. */
export function StepFamilies({ classNames }: { classNames: string[] }) {
  const { register, control, formState } = useFormContext<AbsenceForm>()
  const v = useWatch({ control }) as AbsenceForm
  const notify = v.notify
  const errors = formState.errors

  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="m-0 font-display text-[clamp(30px,3.2vw,44px)] font-normal tracking-[-0.02em]">Prévenir les familles</h1>
        <p className="mt-2 mb-0 max-w-[640px] text-[15px] text-ink-soft">
          Élèves et parents de {classNames.join(', ')} recevront ce message pour chaque cours concerné.
        </p>
      </div>
      <fieldset className="m-0 flex flex-col gap-2.5 border-none p-0">
        <legend className="mb-2.5 text-sm font-semibold">Canaux</legend>
        {channels.map((c) => (
          <label
            key={c.key}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-2xl border bg-paper px-4 py-3',
              notify[c.key] ? 'border-2 border-brand' : 'border-line-strong',
            )}
          >
            <input type="checkbox" {...register(`notify.${c.key}`)} className="h-5 w-5 accent-brand" />
            <span className="font-semibold">{c.label}</span>
            <span className="text-[13px] text-ink-soft">{c.hint}</span>
          </label>
        ))}
      </fieldset>
      {errors.notify && <p className="m-0 text-[13px] font-semibold text-bad">{errors.notify.message ?? errors.notify.root?.message}</p>}
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Message
        <textarea
          rows={4}
          {...register('message')}
          className="rounded-2xl border border-line-strong bg-paper p-4 text-[15px] leading-relaxed font-normal text-ink outline-none focus:border-brand"
        />
        {errors.message && <span className="text-[13px] text-bad">{errors.message.message}</span>}
      </label>
    </div>
  )
}

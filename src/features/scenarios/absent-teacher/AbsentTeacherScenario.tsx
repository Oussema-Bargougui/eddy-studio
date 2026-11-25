import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useDataSource } from '@/api/useDataSource'
import { useSubstitutes, useTeacherLessons, useTeachers } from '@/api/queries'
import type { Lesson, ScenarioSummary, SubstituteChoice, Teacher } from '@/api/types'
import { PreviewPanel } from '../wizard/PreviewPanel'
import { ScenarioHeader } from '../wizard/ScenarioHeader'
import { Stepper } from '../wizard/Stepper'
import { WizardFooter } from '../wizard/WizardFooter'
import { Done } from './Done'
import { FoundPanel } from './FoundPanel'
import { buildPreview } from './preview'
import { absenceDefaults, absenceSchema, stepFields, type AbsenceForm } from './schema'
import { StepFamilies } from './StepFamilies'
import { StepLessons } from './StepLessons'
import { StepReview } from './StepReview'
import { StepSubstitutes } from './StepSubstitutes'
import { StepWho } from './StepWho'

const TOTAL = 5
// Stable empty lists: a fresh `[]` each render would re-run the pre-fill effects.
const NO_TEACHERS: Teacher[] = []
const NO_LESSONS: Lesson[] = []
const NO_CHOICES: SubstituteChoice[] = []

/** "Un enseignant est absent": record the absence, cover the lessons, tell the families. */
export function AbsentTeacherScenario({ scenario }: { scenario: ScenarioSummary }) {
  const source = useDataSource()
  const form = useForm<AbsenceForm>({ resolver: zodResolver(absenceSchema), defaultValues: absenceDefaults, mode: 'onTouched' })
  const [step, setStep] = useState(1)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const v = useWatch({ control: form.control }) as AbsenceForm

  const teachers = useTeachers().data ?? NO_TEACHERS
  const lessonsQuery = useTeacherLessons(v.teacherId, v.from, v.to)
  const lessons = lessonsQuery.data ?? NO_LESSONS
  const choices = useSubstitutes(lessons.map((l) => l.id)).data ?? NO_CHOICES
  const teacher = teachers.find((t) => t.id === v.teacherId)
  const chosenLessons = lessons.filter((l) => v.lessonIds.includes(l.id))

  // Pre-fill: every lesson ticked, Eddy's suggestion picked, until the user changes them.
  useEffect(() => {
    if (lessons.length && !form.getValues('lessonIds').length) form.setValue('lessonIds', lessons.map((l) => l.id))
  }, [lessons, form])
  useEffect(() => {
    const current = form.getValues('substitutes')
    choices.forEach((c) => {
      if (!current[c.lessonId]) form.setValue(`substitutes.${c.lessonId}`, c.suggestedId ?? 'none')
    })
  }, [choices, form])

  const preview = buildPreview(v, step, teacher, lessons, teachers)
  const next = async () => {
    if (await form.trigger(stepFields[step])) setStep((s) => Math.min(TOTAL, s + 1))
  }
  const submit = form.handleSubmit(async (values) => {
    setSending(true)
    try {
      await source.runScenario(scenario.id, values)
      setDone(true)
    } finally {
      setSending(false)
    }
  })

  const found = choices.filter((c) => c.suggestedId).length
  const steps = [
    { title: "L'enseignant", detail: `${teacher?.name ?? '—'} · ${v.reason.toLowerCase()}` },
    { title: 'Ses cours', detail: `Jeudi 26 · ${chosenLessons.length} cours` },
    { title: 'Les remplaçants', detail: `${found} sur ${choices.length} trouvés` },
    { title: 'Prévenir les familles', detail: 'App, SMS ou e-mail' },
    { title: 'Vérifier et valider', detail: 'Rien avant votre accord' },
  ]
  const nextLabels = ['', 'Continuer : ses cours →', 'Continuer : les remplaçants →', 'Continuer : prévenir les familles →', 'Continuer : vérifier →']

  if (done) return <Done lines={preview} />

  return (
    <FormProvider {...form}>
      <ScenarioHeader title={scenario.title} step={step} total={TOTAL} saves={step > 1 ? scenario.saves : undefined} />
      {/* Enter (or any form submission) only moves forward; writing needs the "Valider" click. */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (step < TOTAL) void next()
        }}
        className="flex flex-1 flex-wrap"
      >
        {step > 1 && <Stepper steps={steps} current={step} />}
        <main className="flex max-w-[900px] min-w-0 flex-[999_1_520px] flex-col gap-6 px-[clamp(16px,4vw,64px)] py-10">
          {step === 1 && <StepWho />}
          {step === 2 && <StepLessons lessons={lessons} />}
          {step === 3 && <StepSubstitutes lessons={chosenLessons} choices={choices.filter((c) => v.lessonIds.includes(c.lessonId))} />}
          {step === 4 && <StepFamilies classNames={chosenLessons.map((l) => l.className)} />}
          {step === 5 && <StepReview lines={preview} />}
          <WizardFooter
            step={step}
            onBack={() => setStep((s) => Math.max(1, s - 1))}
            onNext={() => void next()}
            onConfirm={() => void submit()}
            nextLabel={nextLabels[step]}
            isLast={step === TOTAL}
            sending={sending}
          />
        </main>
        {step === 1 ? (
          <FoundPanel teacherName={teacher ? `M. ${teacher.name.split(' ').at(-1)}` : undefined} lessons={lessons} loading={lessonsQuery.isPending} />
        ) : (
          <PreviewPanel lines={preview} note="vous gardez la main jusqu'au bout" />
        )}
      </form>
    </FormProvider>
  )
}

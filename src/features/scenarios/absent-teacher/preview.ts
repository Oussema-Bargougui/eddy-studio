import type { Lesson, Teacher } from '@/api/types'
import type { PreviewLine } from '../wizard/PreviewPanel'
import type { AbsenceForm } from './schema'

/** Turns the form into the plain list of what will be written to EduCap. */
export function buildPreview(v: AbsenceForm, step: number, teacher: Teacher | undefined, lessons: Lesson[], teachers: Teacher[]): PreviewLine[] {
  const chosen = lessons.filter((l) => v.lessonIds.includes(l.id))
  const replaced = chosen.filter((l) => (v.substitutes[l.id] ?? 'none') !== 'none' && v.substitutes[l.id] !== 'study')
  const study = chosen.filter((l) => v.substitutes[l.id] === 'study').length
  const names = replaced.map((l) => teachers.find((t) => t.id === v.substitutes[l.id])?.name.split(' ').at(-1) ?? '?')
  const byName = [...new Set(names)].map((n) => `${n}${names.filter((x) => x === n).length > 1 ? ' ×' + names.filter((x) => x === n).length : ''}`)
  const classes = new Set(chosen.map((l) => l.className)).size
  const channels = [v.notify.app && 'app', v.notify.sms && 'SMS', v.notify.email && 'e-mail'].filter(Boolean).join(' + ')

  return [
    {
      label: `Absence de ${teacher?.name ?? '—'} enregistrée (${v.reason.toLowerCase()}, ${v.justified === 'yes' ? 'justifiée' : 'non justifiée'})`,
      state: 'ready',
    },
    { label: `${chosen.length} cours marqués « enseignant absent »`, state: step >= 2 ? 'ready' : 'pending' },
    {
      label: `${replaced.length} remplacement${replaced.length > 1 ? 's' : ''} créé${replaced.length > 1 ? 's' : ''}${byName.length ? ` (${byName.join(', ')})` : ''}${study ? ` · ${study} en étude` : ''}`,
      state: step >= 3 ? 'ready' : 'pending',
    },
    {
      label: step >= 4 ? `Familles de ${classes} classes prévenues (${channels || 'aucun canal'})` : `Familles de ${classes} classes prévenues — étape suivante`,
      state: step >= 4 ? 'ready' : 'pending',
    },
  ]
}

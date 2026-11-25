import { z } from 'zod'

/**
 * What the scenario collects. Values mirror EduCap: the absence record takes
 * type "Maladie" | "Congé" and "Justifié" | "Non justifié"; replacements are
 * per lesson occurrence; families are told through the planning notification.
 */
export const absenceSchema = z
  .object({
    teacherId: z.string().min(1, 'Choisissez un enseignant.'),
    from: z.string().min(1, 'Indiquez la date de début.'),
    to: z.string().min(1, 'Indiquez la date de fin.'),
    moment: z.enum(['day', 'morning', 'afternoon']),
    reason: z.enum(['Maladie', 'Congé']),
    justified: z.enum(['yes', 'no']),
    lessonIds: z.array(z.string()).min(1, 'Choisissez au moins un cours.'),
    /** lessonId → substitute teacher id, "study" (supervised study) or "none". */
    substitutes: z.record(z.string(), z.string()),
    notify: z.object({ app: z.boolean(), sms: z.boolean(), email: z.boolean() }),
    message: z.string().min(10, 'Le message est trop court.'),
  })
  .refine((v) => !v.from || !v.to || v.to >= v.from, { path: ['to'], message: 'La fin doit être après le début.' })
  .refine((v) => v.notify.app || v.notify.sms || v.notify.email, {
    path: ['notify'],
    message: 'Choisissez au moins un canal.',
  })

export type AbsenceForm = z.infer<typeof absenceSchema>

/** Fields checked before leaving each step. */
export const stepFields: Record<number, (keyof AbsenceForm)[]> = {
  1: ['teacherId', 'from', 'to', 'moment', 'reason', 'justified'],
  2: ['lessonIds'],
  3: ['substitutes'],
  4: ['notify', 'message'],
  5: [],
}

export const defaultMessage =
  "Bonjour, l'enseignant de mathématiques sera absent jeudi 26 novembre. Les cours sont assurés par un remplaçant ou en étude surveillée. Merci de votre compréhension."

/** Pre-filled from the briefing item "M. Bernard absent jeudi". */
export const absenceDefaults: AbsenceForm = {
  teacherId: 't-bernard',
  from: '2026-11-26',
  to: '2026-11-26',
  moment: 'day',
  reason: 'Maladie',
  justified: 'yes',
  lessonIds: [],
  substitutes: {},
  notify: { app: true, sms: false, email: false },
  message: defaultMessage,
}

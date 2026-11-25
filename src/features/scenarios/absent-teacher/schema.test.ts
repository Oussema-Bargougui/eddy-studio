import { absenceDefaults, absenceSchema } from './schema'

const valid = { ...absenceDefaults, lessonIds: ['l-1'] }

describe('absence schema', () => {
  it('accepts the pre-filled briefing case once a lesson is chosen', () => {
    expect(absenceSchema.safeParse(valid).success).toBe(true)
  })

  it('refuses an end date before the start date', () => {
    const r = absenceSchema.safeParse({ ...valid, to: '2026-11-25' })
    expect(r.success).toBe(false)
    expect(r.error?.issues[0]?.path).toEqual(['to'])
  })

  it('needs at least one lesson and one channel', () => {
    expect(absenceSchema.safeParse({ ...valid, lessonIds: [] }).success).toBe(false)
    const silent = absenceSchema.safeParse({ ...valid, notify: { app: false, sms: false, email: false } })
    expect(silent.error?.issues.map((i) => i.path.join('.'))).toContain('notify')
  })

  it('only allows the reasons EduCap knows', () => {
    expect(absenceSchema.safeParse({ ...valid, reason: 'Formation' }).success).toBe(false)
  })
})

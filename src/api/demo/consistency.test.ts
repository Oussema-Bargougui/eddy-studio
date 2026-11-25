import { demoAttendance, demoClassFiles } from './attendance'
import { demoBriefing } from './briefing'

// The same figure must read the same on every screen.
describe('demo data consistency', () => {
  it('class files agree with their 5-week curves', () => {
    for (const file of Object.values(demoClassFiles)) {
      const trend = demoAttendance.classes.find((c) => c.classId === file.classId)!
      expect(trend.rate).toBe(file.rate)
      const delta = Math.round((trend.rate - trend.series[0]!) * 10) / 10
      expect(delta).toBe(file.delta)
    }
  })

  it('briefing "classes qui décrochent" match the Explorer curves', () => {
    for (const drop of demoBriefing.drops) {
      const trend = demoAttendance.classes.find((c) => c.classId === drop.classId)!
      expect(drop.series).toEqual(trend.series)
      expect(drop.rate).toBe(trend.rate)
    }
  })

  it('counts on the briefing match the class list', () => {
    const below = demoAttendance.classes.filter((c) => c.rate < demoAttendance.threshold)
    expect(demoBriefing.classCount).toBe(demoAttendance.classes.length)
    expect(demoBriefing.stableCount).toBe(demoAttendance.classes.length - below.length)
    expect(demoBriefing.drops.map((d) => d.classId).sort()).toEqual(below.map((c) => c.classId).sort())
  })

  it('every series ends on the current rate', () => {
    for (const c of demoAttendance.classes) expect(c.series.at(-1)).toBe(c.rate)
  })
})

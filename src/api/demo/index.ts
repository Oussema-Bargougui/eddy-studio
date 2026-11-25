import type { DataSource } from '../source'
import { classFileFor, demoAttendance } from './attendance'
import { demoBriefing } from './briefing'
import { demoAnswer } from './eddy'
import { demoLessons, demoScenarios, demoSimpleOperations, demoSubstitutes, demoTeachers } from './scenarios'

/** Simulates network time so loading states are exercised like the real thing. */
const wait = <T>(value: T, ms: number): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), ms))

export function createDemoSource(latency = 350): DataSource {
  return {
    kind: 'demo',
    getBriefing: () => wait(demoBriefing, latency),
    getAttendanceTheme: () => wait(demoAttendance, latency),
    getClassFile: (classId) => wait(classFileFor(classId), latency / 2),
    getScenarioCatalogue: () => wait({ scenarios: demoScenarios, simpleOperations: demoSimpleOperations }, latency),
    getTeachers: () => wait(demoTeachers, latency / 2),
    getTeacherLessons: () => wait(demoLessons, latency),
    getSubstitutes: (ids) => wait(demoSubstitutes.filter((s) => ids.includes(s.lessonId)), latency),
    askEddy: (question) => wait(demoAnswer(question), latency * 4),
    runScenario: () => wait({ ok: true as const }, latency * 3),
  }
}

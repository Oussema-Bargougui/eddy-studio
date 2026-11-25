import type {
  AttendanceTheme,
  Briefing,
  ClassFile,
  EddyAnswer,
  Lesson,
  ScenarioSummary,
  SubstituteChoice,
  Teacher,
} from './types'

/**
 * Everything Eddy Studio reads. The demo source answers from a fictional
 * school; the EduCap source will implement the same contract over the API.
 */
export interface DataSource {
  /** "demo" data is fictional and is labelled as such on screen. */
  readonly kind: 'demo' | 'educap'
  getBriefing(): Promise<Briefing>
  getAttendanceTheme(): Promise<AttendanceTheme>
  getClassFile(classId: string): Promise<ClassFile>
  getScenarioCatalogue(): Promise<{ scenarios: ScenarioSummary[]; simpleOperations: string[] }>
  getTeachers(): Promise<Teacher[]>
  getTeacherLessons(teacherId: string, from: string, to: string): Promise<Lesson[]>
  getSubstitutes(lessonIds: string[]): Promise<SubstituteChoice[]>
  askEddy(question: string): Promise<EddyAnswer>
  /** Writes a validated scenario to EduCap; resolves when every write was read back. */
  runScenario(scenarioId: string, payload: unknown): Promise<{ ok: true }>
}
